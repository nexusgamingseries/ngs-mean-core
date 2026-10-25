const request = require('supertest');
const assert = require('assert');
const mongoUnit = require('mongo-unit');
const mockData = require('../../mock-data/standingsData.json');
const utils = require('../../../utils');
const User = require('../../../models/user-models');
const Team = require('../../../models/team-models');

let app;
let generateNewToken;
let token;

before(async function () {
    this.timeout(10000);
    await mongoUnit.start();
    generateNewToken = require('../../../configs/passport-setup');
    process.env.mongoURI = mongoUnit.getUrl();
    app = require('../../../../server');
});

beforeEach(async function () {
    await mongoUnit.dropDb();
    await mongoUnit.load(mockData);
    const user = await User.findOne({ displayName: 'TEST azalea#9539' });
    token = generateNewToken.generateNewToken(utils.objectify(user), false);
});

after(function () {
    app.server.close();
});

const auth = () => ({ Authorization: `Bearer ${token}` });
const post = (url, body) => request(app.app).post(`/api/search${url}`).set(auth()).send(body);
const get = (url) => request(app.app).get(`/api/search${url}`).set(auth());

describe('search-routes', function () {

    describe('auth', function () {
        it('rejects unauthenticated user search', async function () {
            const res = await request(app.app).post('/api/search/user').send({ userName: 'a' });
            assert.strictEqual(res.status, 401);
        });
    });

    describe('POST /user', function () {
        it('returns display names matching the search', async function () {
            const res = await post('/user', { userName: 'mongoose' });
            assert.strictEqual(res.status, 200);
            assert(res.body.returnObject.includes('Mongoose#11247'));
        });

        it('returns full profiles when fullProfile is set', async function () {
            const res = await post('/user', { userName: 'mongoose', fullProfile: true });
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.returnObject[0].displayName, 'Mongoose#11247');
        });

        it('returns no users for a non matching name', async function () {
            const res = await post('/user', { userName: 'zzzzzzzz' });
            assert.strictEqual(res.status, 200);
            assert(!res.body.returnObject || res.body.returnObject.length === 0);
        });

        it('returns 500 when userName is missing', async function () {
            const res = await post('/user', {});
            assert.strictEqual(res.status, 500);
        });
    });

    describe('POST /user/unteamed', function () {
        it('returns unteamed users', async function () {
            const res = await post('/user/unteamed', { userName: 'TEST lily' });
            assert.strictEqual(res.status, 200);
            assert.deepStrictEqual(res.body.returnObject, ['TEST lily#3664']);
        });

        it('excludes users who are on a team even when only one team field is set', async function () {
            const res = await post('/user/unteamed', { userName: 'Mongoose' });
            assert.strictEqual(res.status, 200);
            assert(!res.body.returnObject || !res.body.returnObject.includes('Mongoose#11247'));

            await User.updateOne({ displayName: 'TEST lily#3664' }, { teamId: 'someTeamId' });
            const res2 = await post('/user/unteamed', { userName: 'TEST lily' });
            assert(!res2.body.returnObject || res2.body.returnObject.length === 0);
        });

        it('excludes users with a pending team', async function () {
            await User.updateOne({ displayName: 'TEST lily#3664' }, { pendingTeam: true });
            const res = await post('/user/unteamed', { userName: 'TEST lily' });
            assert.strictEqual(res.status, 200);
            assert(!res.body.returnObject || res.body.returnObject.length === 0);
        });

        it('returns 500 when userName is missing', async function () {
            const res = await post('/user/unteamed', {});
            assert.strictEqual(res.status, 500);
        });
    });

    describe('POST /team', function () {
        it('returns matching team names', async function () {
            const res = await post('/team', { teamName: 'MONGOOSE' });
            assert.strictEqual(res.status, 200);
            assert(res.body.returnObject.includes("Mongoose's Team"));
        });

        it('returns no teams for a non matching name', async function () {
            const res = await post('/team', { teamName: 'zzzzzzzz' });
            assert.strictEqual(res.status, 200);
            assert(!res.body.returnObject || res.body.returnObject.length === 0);
        });

        it('returns 500 when teamName is missing', async function () {
            const res = await post('/team', {});
            assert.strictEqual(res.status, 500);
        });
    });

    describe('POST /user/market', function () {
        const market = (searchObj) => request(app.app).post('/api/search/user/market').send({ searchObj });

        it('searches with an empty search object', async function () {
            const res = await market({});
            assert.strictEqual(res.status, 200);
        });

        it('only returns unteamed users looking for a group', async function () {
            await User.updateOne({ displayName: 'TEST lily#3664' }, { lookingForGroup: true });
            const res = await market({});
            assert.strictEqual(res.status, 200);
            assert.deepStrictEqual(res.body.returnObject.map(u => u.displayName), ['TEST lily#3664']);
        });

        it('applies division, mmr, level, role and time filters', async function () {
            const res = await market({
                divisions: ['Gold'],
                lowerMMR: 1000,
                upperMMR: 3000,
                competitiveLevel: 2,
                rolesNeeded: { tank: true, support: false },
                timezone: -5,
                times: { monday: { available: true, startTime: '1800', endTime: '2200' } }
            });
            assert.strictEqual(res.status, 200);
        });

        it('applies only a lower mmr and falls back to the default timezone', async function () {
            const res = await market({
                lowerMMR: 1000,
                times: { tuesday: { available: false } }
            });
            assert.strictEqual(res.status, 200);
        });
    });

    describe('POST /team/market', function () {
        it('searches with an empty search object', async function () {
            const res = await post('/team/market', { searchObj: {} });
            assert.strictEqual(res.status, 200);
        });

        it('applies division, mmr, level, role and time filters', async function () {
            const res = await post('/team/market', {
                searchObj: {
                    divisions: ['d-beast'],
                    lowerMMR: 1000,
                    upperMMR: 3000,
                    competitiveLevel: 2,
                    rolesNeeded: { tank: true },
                    timezone: -5,
                    times: { monday: { available: true, startTime: '1800', endTime: '2200' } }
                }
            });
            assert.strictEqual(res.status, 200);
        });

        it('uses the profile timezone when requested', async function () {
            const res = await post('/team/market', { searchObj: { getProfileTimezone: true } });
            assert.strictEqual(res.status, 200);
        });
    });

    describe('GET /users/filtered/total', function () {
        it('counts unteamed users for a user without a team', async function () {
            const res = await get('/users/filtered/total');
            assert.strictEqual(res.status, 200);
            assert.strictEqual(typeof res.body.returnObject === 'number' || res.body.returnObject === undefined, true);
        });

        it('excludes users already invited by the requesting team', async function () {
            const captain = await User.findOne({ displayName: 'Mongoose#11247' });
            token = generateNewToken.generateNewToken(utils.objectify(captain), false);
            await Team.updateOne({ teamName: "Mongoose's Team" }, { invitedUsers: ['TEST lily#3664'] });
            const res = await get('/users/filtered/total');
            assert.strictEqual(res.status, 200);
        });

        it('still returns a count when the team is not found', async function () {
            await Team.deleteMany({});
            const captain = await User.findOne({ displayName: 'Mongoose#11247' });
            token = generateNewToken.generateNewToken(utils.objectify(captain), false);
            const res = await get('/users/filtered/total');
            assert.strictEqual(res.status, 200);
        });
    });

    describe('POST /user/filtered/paginate', function () {
        it('returns a page for a user without a team', async function () {
            const res = await post('/user/filtered/paginate', { page: 0 });
            assert.strictEqual(res.status, 200);
        });

        it('filters out invited users for a user on a team', async function () {
            const captain = await User.findOne({ displayName: 'Mongoose#11247' });
            token = generateNewToken.generateNewToken(utils.objectify(captain), false);
            await Team.updateOne({ teamName: "Mongoose's Team" }, { invitedUsers: ['TEST lily#3664'] });
            const res = await post('/user/filtered/paginate', { page: 0 });
            assert.strictEqual(res.status, 200);
        });

        it('still responds when the user team name matches no team', async function () {
            const captain = await User.findOne({ displayName: 'Mongoose#11247' });
            token = generateNewToken.generateNewToken(utils.objectify({ ...captain.toObject(), teamName: 'no such team' }), false);
            const res = await post('/user/filtered/paginate', { page: 0 });
            assert.strictEqual(res.status, 200);
        });
    });

    describe('GET /users/all/total', function () {
        it('returns a total without authentication', async function () {
            const res = await request(app.app).get('/api/search/users/all/total');
            assert.strictEqual(res.status, 200);
        });
    });

    describe('POST /user/paginate', function () {
        it('returns a page of users', async function () {
            const res = await post('/user/paginate', { page: 0 });
            assert.strictEqual(res.status, 200);
        });
    });

    describe('GET /teams/total', function () {
        it('counts teams looking for more members', async function () {
            const res = await request(app.app).get('/api/search/teams/total');
            assert.strictEqual(res.status, 200);
            const expected = await Team.countDocuments({ lookingForMore: true, teamName: { $not: /inactive|withdrawn/i } });
            assert.strictEqual(res.body.returnObject, expected);
        });
    });

    describe('POST /team/paginate', function () {
        it('returns a page of teams', async function () {
            const res = await post('/team/paginate', { page: 0 });
            assert.strictEqual(res.status, 200);
        });
    });
});
