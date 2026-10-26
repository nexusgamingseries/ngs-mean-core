const { expect } = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const mongoUnit = require('mongo-unit');
const mockData = require('../mock-data/standingsData.json');

let TeamSubs;
let Team;
let User;
let Match;
let mmrMethods;
let playerRankMethods;

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function waitFor(fn, ms = 3000) {
    const end = Date.now() + ms;
    while (Date.now() < end) {
        const v = await fn();
        if (v) return v;
        await sleep(50);
    }
    return null;
}

describe('team-subs', function () {
    this.timeout(20000);

    before(async function () {
        await mongoUnit.start();
        process.env.mongoURI = mongoUnit.getUrl();
        await mongoose.connect(mongoUnit.getUrl(), { useNewUrlParser: true, useUnifiedTopology: true });
        TeamSubs = require('../../subroutines/team-subs');
        Team = require('../../models/team-models');
        User = require('../../models/user-models');
        Match = require('../../models/match-model');
        mmrMethods = require('../../methods/mmrMethods');
        playerRankMethods = require('../../methods/player-ranks/playerRankMethods');
    });

    after(async function () {
        await mongoose.disconnect();
    });

    beforeEach(async function () {
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData);
        sinon.stub(playerRankMethods, 'getTeamAvgFromMembers').resolves(1234);
    });

    afterEach(function () {
        sinon.restore();
    });

    describe('returnTeamMMR (top member average)', function () {
        const seed = async (rows) => {
            await User.deleteMany({});
            for (const r of rows) {
                await new User(Object.assign({ displayName: r.name }, r.f)).save();
            }
        };

        it('averages only the top four non-zero values for each MMR type', async function () {
            await seed([
                { name: 'a#1', f: { averageMmr: 3000, heroesProfileMmr: 2000, ngsMmr: 1000 } },
                { name: 'b#1', f: { averageMmr: 2000, heroesProfileMmr: 2100, ngsMmr: 1100 } },
                { name: 'c#1', f: { averageMmr: 1000, heroesProfileMmr: 2200, ngsMmr: 1200 } },
                { name: 'd#1', f: { averageMmr: 4000, heroesProfileMmr: 2300, ngsMmr: 1300 } },
                { name: 'e#1', f: { averageMmr: 100, heroesProfileMmr: 100, ngsMmr: 100 } },
                { name: 'z#1', f: { averageMmr: 0, heroesProfileMmr: 0, ngsMmr: 0 } }
            ]);

            const res = await TeamSubs.returnTeamMMR(['a#1', 'b#1', 'c#1', 'd#1', 'e#1', 'z#1']);

            expect(res.averageMmr).to.equal(Math.round((4000 + 3000 + 2000 + 1000) / 4));
            expect(res.heroesProfileAvgMmr).to.equal(Math.round((2300 + 2200 + 2100 + 2000) / 4));
            expect(res.ngsAvgMmr).to.equal(Math.round((1300 + 1200 + 1100 + 1000) / 4));
            expect(res.stormRankAvg).to.equal(1234);
        });

        it('averages fewer than four members and ignores low-replay heroes profile values', async function () {
            await seed([
                { name: 'a#1', f: { averageMmr: 3000, heroesProfileMmr: 2000, lowReplays: true } },
                { name: 'b#1', f: { averageMmr: 2000, heroesProfileMmr: 2400 } }
            ]);

            const res = await TeamSubs.returnTeamMMR(['a#1', 'b#1']);

            expect(res.averageMmr).to.equal(2500);
            expect(res.heroesProfileAvgMmr).to.equal(2400);
            expect(res.ngsAvgMmr).to.equal(null);
        });

        it('returns empty averages when no users are found', async function () {
            const res = await TeamSubs.returnTeamMMR(['nobody#0']);
            expect(res.averageMmr).to.equal(null);
            expect(res.stormRankAvg).to.equal(null);
        });

        it('rethrows unexpected errors', async function () {
            playerRankMethods.getTeamAvgFromMembers.rejects(new Error('rank boom'));
            await seed([{ name: 'a#1', f: { averageMmr: 3000 } }]);
            let err;
            try {
                await TeamSubs.returnTeamMMR(['a#1']);
            } catch (e) {
                err = e;
            }
            expect(err.message).to.equal('rank boom');
        });
    });

    describe('resultantMMR', function () {
        it('includes the new player and returns the rounded average with the rank average', async function () {
            await User.deleteMany({});
            await new User({ displayName: 'a#1', heroesProfileMmr: 2000 }).save();
            await new User({ displayName: 'b#1', heroesProfileMmr: 3000 }).save();
            await new User({ displayName: 'new#1', heroesProfileMmr: 9999 }).save();

            const res = await TeamSubs.resultantMMR(2500, ['a#1', 'b#1'], 'new#1');

            expect(res.resultantMmr).to.equal(Math.round((3000 + 2500 + 2000) / 3));
            expect(res.stormRankAvg).to.equal(1234);
        });

        it('returns null when the new player is the only mmr', async function () {
            await User.deleteMany({});
            await new User({ displayName: 'new#1' }).save();
            const res = await TeamSubs.resultantMMR(2500, [], 'new#1');
            expect(res).to.equal(null);
        });

        it('returns an empty object when no users are found', async function () {
            await User.deleteMany({});
            const res = await TeamSubs.resultantMMR(2500, ['x#1'], 'y#1');
            expect(res).to.deep.equal({});
        });
    });

    describe('updateTeamMmrAsynch / updateTeamMmr', function () {
        const mmr = () => ({ heroesProfile: 2400, ngsMmr: 1500, hotsLogs: { mmr: 2300, playerId: 77 } });

        it('refreshes each member and saves the team averages (team name string)', async function () {
            sinon.stub(mmrMethods, 'comboMmr').resolves(mmr());

            const updated = await TeamSubs.updateTeamMmrAsynch("Mongoose's Team");

            expect(updated.teamMMRAvg).to.equal(2300);
            expect(updated.hpMmrAvg).to.equal(2400);
            expect(updated.ngsMmrAvg).to.equal(1500);
            const member = await User.findOne({ displayName: 'Mongoose#11247' });
            expect(member.heroesProfileMmr).to.equal(2400);
            expect(member.ngsMmr).to.equal(1500);
            expect(String(member.hotsLogsPlayerID)).to.equal('77');
        });

        it('flips negative heroes profile values to positive', async function () {
            sinon.stub(mmrMethods, 'comboMmr').resolves({ heroesProfile: -1800, ngsMmr: 1000 });

            await TeamSubs.updateTeamMmr({ teamName_lower: "mongoose's team" });

            const member = await User.findOne({ displayName: 'Mongoose#11247' });
            expect(member.heroesProfileMmr).to.equal(1800);
        });

        it('returns undefined when the average cannot be calculated', async function () {
            sinon.stub(mmrMethods, 'comboMmr').resolves(mmr());
            await Team.updateOne({ teamName_lower: "mongoose's team" }, { teamMembers: [] });

            const updated = await TeamSubs.updateTeamMmrAsynch("Mongoose's Team");

            expect(updated).to.be.undefined;
        });
    });

    describe('upsertTeamsDivision', function () {
        it('updates a team division by object and by name', async function () {
            const teams = await Team.find({}).limit(2).lean();
            const division = { displayName: 'Div X', divisionConcat: 'div-x' };

            TeamSubs.upsertTeamsDivision([teams[0]], division);
            TeamSubs.upsertTeamsDivision([teams[1].teamName], division);

            const ok = await waitFor(async () => {
                const a = await Team.findById(teams[0]._id);
                const b = await Team.findById(teams[1]._id);
                return a.divisionConcat === 'div-x' && b.divisionConcat === 'div-x';
            });
            expect(ok).to.equal(true);
        });

        it('does nothing when the team does not exist', async function () {
            TeamSubs.upsertTeamsDivision(['no such team'], { displayName: 'D', divisionConcat: 'd' });
            await sleep(200);
            expect(await Team.countDocuments({ divisionConcat: 'd' })).to.equal(0);
        });
    });

    describe('removeUser', function () {
        it('removes a member from the team', async function () {
            await TeamSubs.removeUser("Mongoose's Team", 'TEST ogre#8807');
            const ok = await waitFor(async () => {
                const t = await Team.findOne({ teamName_lower: "mongoose's team" });
                return !t.teamMembers.some(m => m.displayName === 'TEST ogre#8807');
            });
            expect(ok).to.equal(true);
        });

        it('removes the first member in the list too', async function () {
            const before = await Team.findOne({ teamName_lower: "mongoose's team" });
            const first = before.teamMembers[0].displayName;
            await TeamSubs.removeUser("Mongoose's Team", first);
            const ok = await waitFor(async () => {
                const t = await Team.findOne({ teamName_lower: "mongoose's team" });
                return !t.teamMembers.some(m => m.displayName === first);
            });
            expect(ok).to.equal(true);
        });

        it('makes no change when the user is not on the team', async function () {
            const before = await Team.findOne({ teamName_lower: "mongoose's team" });
            await TeamSubs.removeUser("Mongoose's Team", 'ghost#1');
            await sleep(200);
            const after = await Team.findOne({ teamName_lower: "mongoose's team" });
            expect(after.teamMembers.length).to.equal(before.teamMembers.length);
        });
    });

    describe('scrubUserFromTeams', function () {
        it('removes the user from teamMembers', async function () {
            TeamSubs.scrubUserFromTeams('TEST ogre#8807');

            const ok = await waitFor(async () => {
                const t = await Team.findOne({ teamName_lower: "mongoose's team" });
                return !t.teamMembers.some(m => m.displayName === 'TEST ogre#8807');
            });
            expect(ok).to.equal(true);
        });

        it('removes the user from pendingMembers', async function () {
            await Team.updateOne(
                { teamName_lower: "mongoose's team" },
                { $push: { pendingMembers: { displayName: 'pending#1' } } }
            );

            TeamSubs.scrubUserFromTeams('pending#1');

            const ok = await waitFor(async () => {
                const t = await Team.findOne({ teamName_lower: "mongoose's team" });
                return t.pendingMembers.length === 0;
            });
            expect(ok).to.equal(true);
        });
    });

    describe('updateTeamDivHistory', function () {
        it('adds a division history entry to the teams', async function () {
            const team = await Team.findOne({ teamName_lower: "mongoose's team" });
            TeamSubs.updateTeamDivHistory([team.teamName], 'Div Y');

            const found = await waitFor(async () => {
                const t = await Team.findById(team._id);
                return t.history && t.history.some(h => h.target === 'Div Y') ? t : null;
            });
            expect(found).to.not.be.null;
            const entry = found.history.find(h => h.target === 'Div Y');
            expect(entry.action).to.equal('Added to division');
            expect(entry.season).to.be.a('number');
        });

        it('appends when the team already has history', async function () {
            const team = await Team.findOne({ teamName_lower: "mongoose's team" });
            await Team.updateOne({ _id: team._id }, { history: [{ action: 'old', target: 'x', timestamp: 1 }] });

            TeamSubs.updateTeamDivHistory([team.teamName], 'Div Z');

            const found = await waitFor(async () => {
                const t = await Team.findById(team._id);
                return t.history.length === 2 ? t : null;
            });
            expect(found).to.not.be.null;
        });
    });

    describe('markTeamWithdrawnInMatches', function () {
        it('renames the team on its current-season matches', async function () {
            const team = await Team.findOne({ teamName_lower: "mongoose's team" });
            const SeasonInfoCommon = require('../../methods/seasonInfoMethods');
            const season = (await SeasonInfoCommon.getSeasonInfo()).value;
            await new Match({
                matchId: 'wd-1',
                season,
                home: { id: team._id, teamName: team.teamName },
                away: { id: new mongoose.Types.ObjectId(), teamName: 'Other' }
            }).save();

            await TeamSubs.markTeamWithdrawnInMatches(team.toObject());

            const m = await waitFor(async () => {
                const found = await Match.findOne({ matchId: 'wd-1' });
                return /withdrawn/.test(found.home.teamName) ? found : null;
            });
            expect(m).to.not.be.null;
            expect(m.home.teamName).to.equal("Mongoose's Team (withdrawn)");
            expect(m.away.teamName).to.equal('Other');
        });
    });
});
