const { expect } = require('chai');
const sinon = require('sinon');
const AWS = require('aws-sdk');
const mongoUnit = require('mongo-unit');
const mockData = require('../../mock-data/standingsData.json');
const loadConfig = require('../../../../loadConfig.js');

let Match;
let Team;
let ParsedReplay;
let parser;
let reportMatch;
let app;
let s3Proto;

const awsOk = (value) => ({ promise: () => Promise.resolve(value) });
const awsFail = () => ({ promise: () => Promise.reject(new Error('s3 failure')) });

async function waitFor(fn, ms = 4000) {
    const end = Date.now() + ms;
    while (Date.now() < end) {
        const v = await fn();
        if (v) return v;
        await new Promise(r => setTimeout(r, 50));
    }
    return null;
}

describe('report-match', function () {
    this.timeout(20000);

    before(async function () {
        s3Proto = Object.getPrototypeOf(new AWS.S3()); // versioned S3 class that holds the API methods
        await loadConfig();
        await mongoUnit.start();
        process.env.mongoURI = mongoUnit.getUrl();
        app = require('../../../../server');
        Match = require('../../../models/match-model');
        Team = require('../../../models/team-models');
        ParsedReplay = require('../../../models/replay-parsed-models');
        parser = require('hots-parser');
        reportMatch = require('../../../methods/matches/report-match');
    });

    after(async function () {
        app.server.close();
    });

    let teamA;
    let teamB;

    beforeEach(async function () {
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData);
        [teamA, teamB] = await Team.find({}).limit(2);
        await new Match({
            matchId: 'rm-1',
            home: { id: teamA._id, teamName: teamA.teamName },
            away: { id: teamB._id, teamName: teamB.teamName },
            scheduledTime: { startTime: String(Date.UTC(2026, 0, 15, 12)) }
        }).save();
    });

    afterEach(function () {
        sinon.restore();
    });

    it('rejects when the match does not exist', async function () {
        let err;
        try {
            await reportMatch('test', { matchId: 'nope' }, 'someone', true);
        } catch (e) {
            err = e;
        }
        expect(err).to.equal('Error reporting match result');
    });

    it('rejects as Unauthorized when the requester is not a captain', async function () {
        let err;
        try {
            await reportMatch('test', { matchId: 'rm-1', homeTeamScore: 2, awayTeamScore: 0 }, 'nobody#0000', false);
        } catch (e) {
            err = e;
        }
        expect(err).to.equal('Unauthorized');
    });

    it('accepts a report from the home captain and applies scores, dominance, other details and bans', async function () {
        await reportMatch('test', {
            matchId: 'rm-1',
            homeTeamScore: 2,
            awayTeamScore: 0,
            otherDetails: { note: 'hello' },
            mapBans: { home: 'x' }
        }, teamA.captain, false);

        const m = await Match.findOne({ matchId: 'rm-1' });
        expect(m.reported).to.equal(true);
        expect(m.home.score).to.equal(2);
        expect(m.home.dominator).to.equal(true);
        expect(m.other.note).to.equal('hello');
        expect(m.mapBans).to.deep.equal({ home: 'x' });
    });

    it('marks the away team dominant on a 0-2 report', async function () {
        await reportMatch('test', { matchId: 'rm-1', homeTeamScore: 0, awayTeamScore: 2 }, 'x', true);
        const m = await Match.findOne({ matchId: 'rm-1' });
        expect(m.away.dominator).to.equal(true);
        expect(m.away.score).to.equal(2);
    });

    it('accepts an assistant captain of the away team', async function () {
        await Team.updateOne({ _id: teamB._id }, { assistantCaptain: ['asst#1'] });
        await reportMatch('test', { matchId: 'rm-1', homeTeamScore: 1, awayTeamScore: 1 }, 'asst#1', false);
        const m = await Match.findOne({ matchId: 'rm-1' });
        expect(m.reported).to.equal(true);
    });

    describe('with fileTracking (temp replays)', function () {
        const report = () => ({
            matchId: 'rm-1',
            homeTeamScore: 2,
            awayTeamScore: 0,
            fileTracking: { 1: { filename: 'temp-1.StormReplay' }, 2: { filename: 'temp-2.StormReplay' } }
        });

        const parsedFor = () => ({
            status: 1,
            match: {
                map: "Blackheart's Bay",
                teams: {
                    0: { names: teamA.teamMembers.map(m => m.displayName.split('#')[0]) },
                    1: { names: teamB.teamMembers.map(m => m.displayName.split('#')[0]) }
                }
            },
            players: { x: {} }
        });

        const stubS3 = () => {
            sinon.stub(s3Proto, 'getObject').callsFake(() => awsOk({ Body: Buffer.from('replay') }));
            sinon.stub(s3Proto, 'putObject').callsFake(() => awsOk({}));
            sinon.stub(s3Proto, 'deleteObject').callsFake((p, cb) => cb(null, {}));
            return sinon.stub(s3Proto, 'copyObject').callsFake(() => awsOk({ ok: true }));
        };

        const waitForUrl = () => waitFor(async () => {
            const found = await Match.findOne({ matchId: 'rm-1' });
            return found.replays && found.replays['1'] && found.replays['1'].url ? found : null;
        });

        it('moves, parses and stores replays, and records the final urls', async function () {
            const copy = stubS3();
            const parse = sinon.stub(parser, 'processReplay');
            parse.onFirstCall().returns(parsedFor());
            parse.onSecondCall().returns({ status: 0 });

            await reportMatch('test', report(), 'x', true);

            const m = await waitForUrl();
            expect(m, 'replay url saved').to.not.be.null;
            expect(m.replays['1'].url).to.match(/^ngs_1-15-2026_.*_vs_.*Blackheart.*\.stormReplay$/);
            expect(m.replays['1'].data).to.be.a('string');
            expect(m.replays['2'].url).to.match(/unknown_map/);
            expect(copy.callCount).to.equal(2);

            const stored = await waitFor(async () => (await ParsedReplay.collection.countDocuments({})) > 0);
            expect(stored).to.equal(true);
        });

        it('treats a parser exception as a failed parse', async function () {
            stubS3();
            sinon.stub(parser, 'processReplay').throws(new Error('bad replay'));

            await reportMatch('test', report(), 'x', true);

            const m = await waitForUrl();
            expect(m).to.not.be.null;
            expect(m.replays['1'].url).to.match(/unknown_map/);
        });

        it('leaves the temp url in place when the S3 copy fails', async function () {
            const copy = stubS3();
            copy.callsFake(() => awsFail());
            sinon.stub(parser, 'processReplay').returns({ status: 0 });

            await reportMatch('test', report(), 'x', true);
            await waitFor(async () => copy.callCount >= 2);
            await new Promise(r => setTimeout(r, 500));

            const m = await Match.findOne({ matchId: 'rm-1' });
            expect(m.replays['1'].tempUrl).to.equal('temp-1.StormReplay');
            expect(m.replays['1'].url).to.be.undefined;
        });

        it('skips files that cannot be fetched from S3', async function () {
            sinon.stub(s3Proto, 'getObject').callsFake(() => awsFail());
            const parse = sinon.stub(parser, 'processReplay');

            await reportMatch('test', report(), 'x', true);
            await new Promise(r => setTimeout(r, 1000));

            expect(parse.called).to.equal(false);
        });
    });
});
