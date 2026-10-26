const { expect } = require('chai');
const { median } = require('../../summarizeData/math');
const summarizePlayerData = require('../../summarizeData/summarize-player-data');
const summarizeTeamData = require('../../summarizeData/summarize-team-data');
const summarizeTalentData = require('../../summarizeData/summarize-talent-data');
const PerMapStatList = require('../../summarizeData/map-stats');
const DetailStatList = require('../../summarizeData/detail-stat-list');

describe('summarizeData', function () {
    describe('math.median', function () {
        it('returns the middle of an odd-length array', function () {
            expect(median([5, 1, 3])).to.equal(3);
        });

        it('averages the two middle values of an even-length array', function () {
            expect(median([4, 1, 3, 2])).to.equal(2.5);
        });
    });

    describe('static stat lists', function () {
        it('expose the expected stat names', function () {
            expect(DetailStatList).to.include('Takedowns');
            expect(PerMapStatList['Dragon Shire']).to.include('DragonShrinesCaptured');
        });
    });

    describe('summarizePlayerData', function () {
        const taunts = () => ({ bsteps: [], dances: [], sprays: [], taunts: [], voiceLines: [] });

        const playerMatch = (toon, overrides) => ({
            players: {
                [toon]: Object.assign({
                    name: 'Alpha',
                    map: 'Dragon Shire',
                    hero: 'Zarya',
                    length: 600,
                    votes: 1,
                    win: true,
                    mode: 50071,
                    gameStats: {
                        Takedowns: 10,
                        Deaths: 2,
                        HighestKillStreak: 4,
                        TimeSpentDead: 60,
                        DragonShrinesCaptured: 3,
                        awards: ['EndOfMatchAwardMVPBoolean', 'EndOfMatchAwardGivenToNonwinner']
                    }
                }, taunts(), overrides)
            }
        });

        it('aggregates stats, awards, taunts and derived values per player', function () {
            const toon = '1-Hero-1-1';
            const docs = [
                playerMatch(toon, { dances: [{ kills: 1, deaths: 0 }], bsteps: [{ kills: 0, deaths: 1, duration: 5 }] }),
                playerMatch(toon, {
                    hero: 'Muradin',
                    win: false,
                    length: 300,
                    votes: 0,
                    gameStats: { Takedowns: 4, Deaths: 4, HighestKillStreak: 2, TimeSpentDead: 30 }
                })
            ];

            const out = summarizePlayerData(docs, toon)[toon];

            expect(out.games).to.equal(2);
            expect(out.wins).to.equal(1);
            expect(out.totalTime).to.equal(900);
            expect(out.votes).to.equal(1);
            expect(out.heroes).to.deep.equal({ Zarya: 1, Muradin: 1 });
            expect(out.stats.Takedowns).to.equal(14);
            expect(out.max.Takedowns).to.equal(10);
            expect(out.min.Takedowns).to.equal(4);
            expect(out.averages.Takedowns).to.equal(7);
            expect(out.median.Takedowns).to.equal(7);
            expect(out.highestStreak).to.equal(4);
            expect(out.totalKDA).to.be.closeTo(14 / 6, 1e-9);
            expect(out.totalTD).to.equal(14);
            expect(out.totalDeaths).to.equal(6);
            expect(out.totalMatchLength).to.equal(900);
            expect(out.totalTimeDead).to.equal(90);
            expect(out.stats.timeDeadPct).to.be.closeTo(0.2, 1e-9);
            expect(out.max.timeDeadPct).to.be.closeTo(0.1, 1e-9);
            expect(out.min.timeDeadPct).to.be.closeTo(0.1, 1e-9);
            expect(out.awards.EndOfMatchAwardMVPBoolean).to.equal(1);
            expect(out.totalAwards).to.equal(2);
            expect(out.totalMVP).to.equal(1);
            expect(out.stats.MVPPct).to.equal(0.5);
            expect(out.stats.AwardPct).to.equal(1);
            expect(out.taunts.dances).to.deep.equal({ count: 1, takedowns: 1, deaths: 0 });
            expect(out.taunts.bsteps).to.deep.equal({ count: 1, duration: 5, takedowns: 0, deaths: 1 });
        });

        it('skips awards for custom games and reports 0 MVP pct without an MVP', function () {
            const toon = 'custom-toon';
            const out = summarizePlayerData([playerMatch(toon, { mode: -1 })], toon)[toon];

            expect(out.totalAwards).to.equal(0);
            expect(out.awards).to.deep.equal({});
            expect(out.stats.MVPPct).to.equal(0);
        });

        it('ignores stats missing from older replays', function () {
            const toon = 'old-toon';
            const docs = [playerMatch(toon, { gameStats: { TimeSpentDead: 0, HighestKillStreak: 0 } })];

            const out = summarizePlayerData(docs, toon)[toon];

            expect(out.stats).to.not.have.property('Takedowns');
        });

        it('returns an empty object when there are no matches', function () {
            expect(summarizePlayerData([], 'x')).to.deep.equal({});
        });
    });

    describe('summarizeTalentData', function () {
        const Heroes = { getRenamedTalent: (t) => t.toUpperCase() };

        it('counts talent picks and builds per hero', function () {
            const docs = [
                { hero: 'Zarya', talents: { 1: 'a', 4: 'b' }, win: true, matchID: 'm1' },
                { hero: 'Zarya', talents: { 1: 'a', 4: 'c' }, win: false, matchID: 'm2' },
                { hero: 'Zarya', talents: { 1: 'a', 4: 'b' }, win: false, matchID: 'm3' }
            ];

            const { talentStats, buildStats } = summarizeTalentData(docs, Heroes);

            expect(talentStats.Zarya[1].A).to.deep.equal({ games: 3, wins: 1 });
            expect(talentStats.Zarya[4].B).to.deep.equal({ games: 2, wins: 1 });
            expect(buildStats.Zarya.AB.games).to.equal(2);
            expect(buildStats.Zarya.AB.wins).to.equal(1);
            expect(buildStats.Zarya.AB.matches).to.deep.equal(['m1', 'm3']);
            expect(buildStats.Zarya.AC.games).to.equal(1);
        });
    });

    describe('summarizeTeamData', function () {
        const levelTimes = {
            1: { time: 0 }, 4: { time: 100 }, 7: { time: 220 }, 10: { time: 400 }, 13: { time: 600 }
        };

        const makeMatch = (overrides) => ({
            match: Object.assign({
                winner: 0,
                map: 'Dragon Shire',
                length: 900,
                teams: [
                    {
                        teamId: 'team-a',
                        level: 20,
                        takedowns: 25,
                        heroes: ['Zarya', 'Muradin', 'a1', 'a2', 'a3'],
                        stats: {
                            timeTo10: 400,
                            timeTo20: 800,
                            uptime: 'ignored',
                            totals: { Takedowns: 25, Deaths: 10 },
                            uptimeHistogram: [10, 20, 30, 40, 50],
                            structures: { Fort: { destroyed: 1, lost: 0, first: 1 }, Keep: { destroyed: 0, lost: 1, first: 0 } },
                            other: 7
                        }
                    },
                    {
                        teamId: 'team-b',
                        level: 15,
                        takedowns: 10,
                        heroes: ['Jaina', 'Li Li', 'b1', 'b2', 'b3'],
                        stats: { timeTo10: 500, totals: { Takedowns: 10, Deaths: 25 }, other: 3 }
                    }
                ],
                picks: { first: 0, 0: ['Zarya', 'Muradin', 'a1', 'a2', 'a3'], 1: ['Jaina', 'Li Li', 'b1', 'b2', 'b3'] },
                bans: {
                    0: [{ hero: 'Abathur', order: 1 }, { hero: '', order: 2 }, { hero: 'Tassadar', order: 2 }],
                    1: [{ hero: 'Illidan', order: 1 }, { hero: '' }]
                },
                levelTimes: [levelTimes, levelTimes]
            }, overrides)
        });

        it('summarizes a winning first-pick game for team-a', function () {
            const out = summarizeTeamData('team-a', [makeMatch()]);

            expect(out.totalMatches).to.equal(1);
            expect(out.wins).to.equal(1);
            expect(out.maps['Dragon Shire']).to.deep.equal({ games: 1, wins: 1 });
            expect(out.firstPicks).to.equal(1);
            expect(out.firstPickWins).to.equal(1);
            expect(out.heroes.Zarya.picks.round1).to.deep.equal({ count: 1, wins: 1 });
            expect(out.heroes.a3.picks.postMid).to.deep.equal({ count: 1, wins: 1 });
            expect(out.heroes.Zarya.with.Muradin.games).to.equal(1);
            expect(out.heroes.Zarya.against.Jaina.wins).to.equal(1);
            expect(out.heroes.Jaina.gamesAgainst).to.equal(1);
            expect(out.heroes.Jaina.defeated).to.equal(1);
            expect(out.heroes.Abathur.bans).to.equal(1);
            expect(out.heroes.Abathur.first).to.equal(1);
            expect(out.heroes.Tassadar.second).to.equal(1);
            expect(out.heroes.Illidan.banAgainst).to.equal(1);
            expect(out.totalBans).to.equal(2);
            expect(out.takedowns.total).to.equal(25);
            expect(out.deaths.total).to.equal(10);
            expect(out.matchLength.average).to.equal(900);
            expect(out.endOfGameLevels.combined.average).to.equal(5);
            expect(out.endOfGameLevels.win.total).to.equal(5);
            expect(out.structures.Fort).to.deep.equal({ destroyed: 1, first: 1, lost: 0, gamesWithFirst: 1 });
            expect(out.structures.Keep.lost).to.equal(1);
            expect(out.stats.total.Takedowns).to.equal(25);
            expect(out.stats.total.pctWith0HeroesAlive).to.be.closeTo(10 / 900, 1e-9);
            expect(out.stats.total.pctWith5HeroesAlive).to.equal(0);
            expect(out.stats.total.other).to.equal(7);
            expect(out.stats.average.timeTo10).to.equal(400);
            expect(out.stats.average.timeTo20).to.equal(800);
            expect(out.level10Games).to.equal(1);
            expect(out.level20Games).to.equal(1);
            expect(out.tierTimes.T1.total).to.equal(100);
            expect(out.tierTimes.T4.total).to.equal(200);
            // levels 13 -> 16 has no end entry so the tier runs to the end of the game
            expect(out.tierTimes.T5.total).to.equal(300);
            expect(out.tierTimes.T6.count).to.equal(0);
            expect(out.heroesPlayed).to.be.greaterThan(0);
        });

        it('inverts level differential and records a loss when the team is the second team', function () {
            const out = summarizeTeamData('team-b', [makeMatch({ winner: 0 })]);

            expect(out.wins).to.equal(0);
            expect(out.endOfGameLevels.loss.total).to.equal(-5);
            expect(out.takedowns.total).to.equal(10);
            expect(out.deaths.total).to.equal(25);
            expect(out.heroes.Jaina.wins).to.equal(0);
            expect(out.firstPicks).to.equal(0);
            expect(out.heroes.Jaina.picks.round1.count).to.equal(1);
            expect(out.heroes.Illidan.bans).to.equal(1);
        });

        it('records second-pick wins', function () {
            const out = summarizeTeamData('team-b', [makeMatch({ winner: 1 })]);

            expect(out.wins).to.equal(1);
            expect(out.heroes.Jaina.picks.round1).to.deep.equal({ count: 1, wins: 1 });
            expect(out.heroes.b3.picks.round3).to.deep.equal({ count: 1, wins: 1 });
        });

        it('tolerates matches without picks or bans', function () {
            const m = makeMatch();
            delete m.match.picks;
            delete m.match.bans;
            const out = summarizeTeamData('team-a', [m]);

            expect(out.firstPicks).to.equal(0);
            expect(out.totalBans).to.equal(0);
            expect(out.wins).to.equal(1);
        });

        it('skips pick stats when fewer than five picks were recorded', function () {
            const m = makeMatch();
            m.match.picks = { first: 0, 0: ['Zarya'], 1: ['Jaina'] };
            const out = summarizeTeamData('team-a', [m]);

            expect(out.firstPicks).to.equal(0);
        });
    });
});
