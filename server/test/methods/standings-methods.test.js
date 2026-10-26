const { expect } = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const mongoUnit = require('mongo-unit');
const mockData = require('../mock-data/standingsData.json');

let Standings;
let Team;
let Match;
let Division;
let System;

const DIV = 'unit-div';
const SEASON = 13;

const sleep = ms => new Promise(r => setTimeout(r, ms));

describe('standings-methods', function () {
    this.timeout(20000);

    let t = {};

    const makeTeam = async (name, logo) => {
        const team = await new Team({ teamName: name, teamName_lower: name.toLowerCase(), logo }).save();
        return team;
    };

    let counter = 0;
    const addMatch = async (home, away, hs, as, extra) => {
        counter += 1;
        // returnBoolByPath treats any boolean (even false) as present, so unreported matches must omit the flag
        return new Match(Object.assign({
            matchId: `sm-${counter}`,
            ...(hs !== null ? { reported: true } : {}),
            divisionConcat: DIV,
            season: SEASON,
            home: { id: home._id.toString(), score: hs },
            away: { id: away._id.toString(), score: as }
        }, extra)).save();
    };

    const byName = (standings) => {
        const o = {};
        standings.forEach(s => { o[s.teamName] = s; });
        return o;
    };

    before(async function () {
        await mongoUnit.start();
        process.env.mongoURI = mongoUnit.getUrl();
        await mongoose.connect(mongoUnit.getUrl(), { useNewUrlParser: true, useUnifiedTopology: true });
        Standings = require('../../methods/standings-methods');
        Team = require('../../models/team-models');
        Match = require('../../models/match-model');
        Division = require('../../models/division-models');
        System = require('../../models/system-models').system;
    });

    after(async function () {
        await mongoose.disconnect();
    });

    beforeEach(async function () {
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData);
        await Team.deleteMany({});
        await Match.deleteMany({});
        await Division.deleteMany({});
        await new Division({ divisionConcat: DIV, displayName: 'Unit Div' }).save();
        t.a = await makeTeam('Alpha', 'alpha.png');
        t.b = await makeTeam('Bravo');
        t.c = await makeTeam('Charlie');
        t.d = await makeTeam('Delta');
    });

    afterEach(function () {
        sinon.restore();
    });

    describe('calculateStandings', function () {
        it('returns undefined for an unknown division', async function () {
            const res = await Standings.calculateStandings('no-such-div', SEASON, false, true);
            expect(res).to.be.undefined;
        });

        it('returns an empty list when nothing has been reported', async function () {
            await addMatch(t.a, t.b, null, null);
            const res = await Standings.calculateStandings(DIV, SEASON, false, true);
            expect(res).to.deep.equal([]);
        });

        it('returns an empty list when the division has no matches', async function () {
            const res = await Standings.calculateStandings(DIV, SEASON, false, true);
            expect(res).to.deep.equal([]);
        });

        it('scores a standard division with the post season 16 point rules', async function () {
            const S = 17;
            await addMatch(t.a, t.b, 2, 0, { season: S }); // A dominates B
            await addMatch(t.c, t.a, 2, 1, { season: S }); // C beats A
            await addMatch(t.b, t.c, null, null, { season: S }); // unreported

            const res = await Standings.calculateStandings(DIV, S, false, true);
            const s = byName(res);

            expect(s.Alpha).to.include({ wins: 3, losses: 2, matchesPlayed: 2, dominations: 1 });
            // match 1: 2 + 2 domination bonus; match 2: 1 map point
            expect(s.Alpha.points).to.equal(5);
            expect(s.Alpha.logo).to.equal('alpha.png');
            expect(s.Charlie.points).to.equal(2 + 1);
            expect(s.Bravo).to.include({ wins: 0, losses: 2, points: 0, matchesPlayed: 1 });
            expect(s.Alpha.standing).to.equal(1);
            expect(res.map(r => r.teamName)).to.deep.equal(['Alpha', 'Charlie', 'Bravo']);
            expect(res.map(r => r.standing)).to.deep.equal([1, 2, 3]);
        });

        it('uses the older domination bonus for seasons 16 and earlier', async function () {
            await Match.updateMany({}, { season: 10 });
            await addMatch(t.a, t.b, 2, 0, { season: 10 });
            await addMatch(t.b, t.c, 2, 1, { season: 10 });

            const res = await Standings.calculateStandings(DIV, 10, false, true);
            const s = byName(res);

            expect(s.Alpha.points).to.equal(2 + 1);
            expect(s.Bravo.points).to.equal(2);
        });

        it('breaks a points tie on head to head', async function () {
            // A and B tie on points; A beat B head to head
            await addMatch(t.a, t.b, 2, 1);
            await addMatch(t.a, t.c, 0, 2);
            await addMatch(t.b, t.c, 2, 0);
            await addMatch(t.b, t.d, 2, 0);

            const res = await Standings.calculateStandings(DIV, SEASON, false, true);

            const a = res.find(r => r.teamName === 'Alpha');
            const b = res.find(r => r.teamName === 'Bravo');
            expect(b.points).to.be.at.least(a.points);
            expect(res.every(r => typeof r.standing === 'number')).to.equal(true);
            expect(res.map(r => r.standing)).to.deep.equal([1, 2, 3, 4]);
        });

        it('falls back to map differential and then lists still-tied teams alphabetically', async function () {
            await addMatch(t.a, t.b, 1, 1);
            await addMatch(t.c, t.d, 1, 1);

            const res = await Standings.calculateStandings(DIV, SEASON, false, true);

            expect(res.map(r => r.teamName)).to.deep.equal(['Alpha', 'Bravo', 'Charlie', 'Delta']);
            expect(res.every(r => r.standing === 1)).to.equal(true);
            expect(res[0].tiebreakMethod).to.equal('still tied, goes to KDA');
        });

        it('uses wins minus losses to separate teams tied on points and head to head', async function () {
            // A: 2-1 over C (points 3); B: 2-1 over D (points 3); they never met.
            await addMatch(t.a, t.c, 2, 1);
            await addMatch(t.b, t.d, 2, 1);
            await addMatch(t.a, t.d, 1, 2);
            await addMatch(t.b, t.c, 0, 2);

            const res = await Standings.calculateStandings(DIV, SEASON, false, true);
            expect(res).to.have.length(4);
            expect(res.every(r => typeof r.standing === 'number')).to.equal(true);
        });

        it('adds the change indicator when stored standings exist', async function () {
            await addMatch(t.a, t.b, 2, 0);
            await addMatch(t.c, t.d, 2, 1);
            await new System({
                dataName: DIV,
                data: {
                    season: SEASON,
                    standings: [
                        { id: t.a._id.toString(), standing: 3 },
                        { id: t.b._id.toString(), standing: 4 },
                        { id: t.c._id.toString(), standing: 1 },
                        { id: t.d._id.toString(), standing: 1 }
                    ]
                }
            }).save();

            const res = await Standings.calculateStandings(DIV, SEASON, false, false);
            const s = byName(res);

            expect(s.Alpha.change).to.equal('up');
            expect(s.Charlie.change).to.equal('down');
            expect(s.Delta.change).to.equal('down');
            expect(s.Bravo.change).to.equal('none');
        });

        it('marks unchanged standings as none', async function () {
            await addMatch(t.a, t.b, 2, 0);
            await new System({
                dataName: DIV,
                data: { season: SEASON, standings: [{ id: t.a._id.toString(), standing: 1 }] }
            }).save();

            const res = await Standings.calculateStandings(DIV, SEASON, false, false);
            expect(byName(res).Alpha.change).to.equal('none');
        });

        it('uses archived team info for past seasons', async function () {
            const Archive = require('../../models/system-models').archive;
            await addMatch(t.a, t.b, 2, 0);
            await new Archive({
                season: SEASON,
                type: 'team',
                object: { teamId: t.a._id.toString(), teamName: 'Alpha Archived', logo: 'old.png' }
            }).save();
            await new Archive({
                season: SEASON,
                type: 'team',
                object: { teamId: t.b._id.toString(), teamName: 'Bravo Archived' }
            }).save();

            const res = await Standings.calculateStandings(DIV, SEASON, true, true);

            expect(res.map(r => r.teamName)).to.have.members(['Alpha Archived', 'Bravo Archived']);
        });

        it('ignores tournament matches', async function () {
            await addMatch(t.a, t.b, 2, 0, { type: 'tournament' });
            await addMatch(t.c, t.d, 2, 0);

            const res = await Standings.calculateStandings(DIV, SEASON, false, true);
            expect(res.map(r => r.teamName)).to.have.members(['Charlie', 'Delta']);
        });

        it('scores the storm division as best of X and orders by points then name', async function () {
            await Division.deleteMany({});
            await new Division({ divisionConcat: 'storm', displayName: 'Storm' }).save();
            await addMatch(t.a, t.b, 2, 1, { divisionConcat: 'storm', boX: 3 });
            await addMatch(t.c, t.a, 2, 0, { divisionConcat: 'storm', boX: 3 });
            await addMatch(t.d, t.b, null, null, { divisionConcat: 'storm', boX: 3, reported: true });
            await addMatch(t.c, t.d, null, null, { divisionConcat: 'storm', boX: 3 });

            const res = await Standings.calculateStandings('storm', SEASON, false, true);
            const s = byName(res);

            expect(s.Alpha).to.include({ wins: 2, losses: 3, points: 1, matchesPlayed: 2 });
            expect(s.Charlie.points).to.equal(1);
            expect(s.Alpha.logo).to.equal('alpha.png');
            expect(res.map(r => r.standing)).to.deep.equal([1, 2, 3, 4]);
            expect(res[0].teamName).to.equal('Alpha');
        });

        it('treats reported:false matches as unreported', async function () {
            await addMatch(t.a, t.b, 2, 0);
            await addMatch(t.c, t.d, 2, 0, { reported: false });

            const res = await Standings.calculateStandings(DIV, SEASON, false, true);
            expect(res.map(r => r.teamName)).to.have.members(['Alpha', 'Bravo', 'Charlie', 'Delta']);
            expect(byName(res).Charlie).to.include({ matchesPlayed: 0, points: 0 });
        });

        it('returns an empty list for a cup division without tournaments', async function () {
            await Division.deleteMany({});
            await new Division({ divisionConcat: 'cup-div', cupDiv: true }).save();

            const res = await Standings.calculateStandings('cup-div', SEASON, false, true);

            expect(res).to.deep.equal([]);
        });
    });
});
