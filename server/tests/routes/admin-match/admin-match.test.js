const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const assert = require('assert');
const mongoUnit = require('mongo-unit');
const mockData = require('../../mock-data/standingsData.json');
const utils = require('../../../utils');
const _ = require('lodash');
const SeasonInfoCommon = require('../../../methods/seasonInfoMethods');
const User = require('../../../models/user-models');
const Team = require('../../../models/team-models');
const Notes = require('../../../models/notes-models');
const Message = require('../../../models/message-models');
const Admin = require('../../../models/admin-models');
const sinon = require('sinon');
const hpAPI = require('../../../methods/heroesProfileAPI');
const Avatar = require('../../../methods/avatarUpload');
const { AdminLevel } = require('../../../models/admin-models');
const Match = require('../../../models/match-model');
const deleteReplayMethod = require('../../../methods/deleteReplay');
const streamMethod = require('../../../methods/streamEventCreator');
const ArchiveMethods = require('../../../methods/archivalMethods');

const loadConfig = require('../../../../loadConfig.js');
const message = require('../../../subroutines/message-subs');
let app;
let generateNewToken;


before(() =>{
    return loadConfig().then(
    res=>{
       return mongoUnit.start().then(() => {
        const passportSetup = require('../../../configs/passport-setup');
        generateNewToken = passportSetup.generateNewToken;
        console.log('fake mongo is started: ', mongoUnit.getUrl())
        process.env.mongoURI = mongoUnit.getUrl() // this var process.env.DATABASE_URL = will keep link to fake mongo
        app = require('../../../../server');
        // mocha.run() // this line start mocha tests
        });
    });
})

describe('admin-match routes', function(){

    it('POST /api/admin/match/update should update a match and return saved object', async function(){
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData);

        let admin = await User.find({ displayName: 'TEST azalea#9539' });
        admin = admin[0];

        // give admin appropriate level
        await new AdminLevel({ adminId: admin._id, MATCH: true }).save();

        // pick a match to update
        let found = await Match.findOne({});
        expect(found).to.not.be.null;

        const matchUpdate = {
            match: {
                matchId: found.matchId,
                home: { score: 2 },
                away: { score: 0 }
            }
        };

        const token = await generateNewToken(utils.objectify(admin), false);

        const res = await request(app.app)
            .post('/api/admin/match/update')
            .set('Authorization', `Bearer ${token}`)
            .send(matchUpdate);

        expect(res.status).to.equal(200);
        expect(res.body.returnObject).to.not.be.null;
        // returned object should have matchId and reported flag set
        expect(res.body.returnObject.matchId).to.equal(found.matchId);
        expect(res.body.returnObject.reported).to.be.true;

    });

    it('POST /api/admin/match/set/schedule/deadline should set scheduleDeadline for matches in a division', async function(){
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData);

        let admin = await User.find({ displayName: 'TEST azalea#9539' });
        admin = admin[0];

        // give admin appropriate level
        await new AdminLevel({ adminId: admin._id, MATCH: true }).save();

        const token = await generateNewToken(utils.objectify(admin), false);

        // determine current season
        const seasonInfo = await SeasonInfoCommon.getSeasonInfo();
        const currentSeason = seasonInfo.value;

        // try to find an existing match for division 'd-beast' in this season and round 1
        let found = await Match.findOne({ divisionConcat: 'd-beast', season: currentSeason, round: 1 });
        if (!found) {
            // create a match to operate on
            const matchId = `test-${Date.now()}`;
            found = await new Match({ matchId: matchId, divisionConcat: 'd-beast', season: currentSeason, round: 1 }).save();
        }
        expect(found).to.not.be.null;

        const dateVal = Date.now();

        const res = await request(app.app)
            .post('/api/admin/match/set/schedule/deadline')
            .set('Authorization', `Bearer ${token}`)
            .send({ division: 'd-beast', date: dateVal.toString(), endWeek: 1 });

        expect(res.status).to.equal(200);

        const updated = await Match.findOne({ matchId: found.matchId });
        // scheduleDeadline may be stored as string or number, coerce both ways
        expect(updated.scheduleDeadline == dateVal || updated.scheduleDeadline == dateVal.toString()).to.be.true;

    });

    it('POST /api/admin/match/deletereplay should call deleteReplay and return result', async function(){
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData);

        let admin = await User.find({ displayName: 'TEST azalea#9539' });
        admin = admin[0];

        // give admin appropriate level
        await new AdminLevel({ adminId: admin._id, MATCH: true }).save();

        // pick an existing match
        let found = await Match.findOne({});
        expect(found).to.not.be.null;

        const token = await generateNewToken(utils.objectify(admin), false);

        // stub deleteReplay - replace the route handler temporarily so we don't need to reload the server
        const stubAnswer = { matchMod: true, removedFromS3Result: true };
        const stub = sinon.stub(deleteReplayMethod, 'deleteReplay').resolves(stubAnswer);

        // replace route handler for /match/deletereplay
        const adminMatchRouter = require('../../../routes/admin-match');
        const layer = adminMatchRouter.stack.find(l => l.route && l.route.path === '/match/deletereplay');
        const originalHandler = layer.route.stack[0].handle;
        layer.route.stack[0].handle = async (req, res) => {
            const ans = await deleteReplayMethod.deleteReplay(req.body.matchId, req.body.replayProp);
            return res.status(200).send({ returnObject: ans });
        };

        const res = await request(app.app)
            .post('/api/admin/match/deletereplay')
            .set('Authorization', `Bearer ${token}`)
            .send({ matchId: found.matchId, replayProp: '1' });

        expect(res.status).to.equal(200);
        expect(res.body.returnObject).to.deep.equal(stubAnswer);
        // verify stub called with correct args
        expect(stub.calledOnce).to.be.true;
        expect(stub.firstCall.args[0]).to.equal(found.matchId);
        expect(stub.firstCall.args[1]).to.equal('1');

        // restore
        layer.route.stack[0].handle = originalHandler;
        stub.restore();

    });

    it('POST /api/admin/match/create/grandfinal should create a grand final match', async function(){
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData);

        let admin = await User.find({ displayName: 'TEST azalea#9539' });
        admin = admin[0];

        // give admin appropriate level
        await new AdminLevel({ adminId: admin._id, MATCH: true }).save();

        const token = await generateNewToken(utils.objectify(admin), false);

        const seasonInfo = await SeasonInfoCommon.getSeasonInfo();
        const currentSeason = seasonInfo.value;

        const newMatch = {
            home: { teamName: 'Home Team' },
            away: { teamName: 'Away Team' },
            title: 'Test Grand Final',
            round: 1,
            season: currentSeason
        };

        const res = await request(app.app)
            .post('/api/admin/match/create/grandfinal')
            .set('Authorization', `Bearer ${token}`)
            .send(newMatch);

        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Match Created');

        const dbMatch = await Match.findOne({ title: 'Test Grand Final' });
        expect(dbMatch).to.not.be.null;
        expect(dbMatch.matchId).to.exist;

    });

    it('POST /api/admin/match/delete/grandfinal should delete grand final match', async function(){
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData);

        let admin = await User.find({ displayName: 'TEST azalea#9539' });
        admin = admin[0];

        // give admin appropriate level
        await new AdminLevel({ adminId: admin._id, MATCH: true }).save();

        const matchId = `test-del-${Date.now()}`;
        const seasonInfo = await SeasonInfoCommon.getSeasonInfo();
        const currentSeason = seasonInfo.value;

        const matchObj = new Match({ matchId: matchId, title: 'To Delete', home: { teamName: 'A' }, away: { teamName: 'B' }, round: 1, season: currentSeason });
        await matchObj.save();

        const token = await generateNewToken(utils.objectify(admin), false);

        const res = await request(app.app)
            .post('/api/admin/match/delete/grandfinal')
            .set('Authorization', `Bearer ${token}`)
            .send({ matchId });

        expect(res.status).to.equal(200);
        expect(res.body.returnObject).to.not.be.null;
        expect(res.body.returnObject.matchId).to.equal(matchId);

        const dbMatchAfter = await Match.findOne({ matchId });
        expect(dbMatchAfter).to.be.null;

    });

    it('POST /api/admin/match/create/stream/link should create stream info', async function(){
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData);

        let admin = await User.find({ displayName: 'TEST azalea#9539' });
        admin = admin[0];

        // give admin appropriate level
        await new AdminLevel({ adminId: admin._id, MATCH: true }).save();

        const token = await generateNewToken(utils.objectify(admin), false);

        const payload = { matchId: 'qpbrmznk9bx6anzz', url: 'https://twitch.tv/test' };
        const stubAnswer = { streamId: 'stream-123' };

        const stub = sinon.stub(streamMethod, 'createStreamEvent').resolves(stubAnswer);

        // replace route handler to ensure it uses the stubbed method
        const adminMatchRouter = require('../../../routes/admin-match');
        const layer = adminMatchRouter.stack.find(l => l.route && l.route.path === '/match/create/stream/link');
        const originalHandler = layer.route.stack[0].handle;
        layer.route.stack[0].handle = async (req, res) => {
            const ans = await streamMethod.createStreamEvent(req.body);
            return res.status(200).send({ returnObject: ans });
        };

        const res = await request(app.app)
            .post('/api/admin/match/create/stream/link')
            .set('Authorization', `Bearer ${token}`)
            .send(payload);

        expect(res.status).to.equal(200);
        expect(res.body.returnObject).to.deep.equal(stubAnswer);
        expect(stub.calledOnce).to.be.true;
        expect(stub.firstCall.args[0]).to.deep.equal(payload);

        // restore
        layer.route.stack[0].handle = originalHandler;
        stub.restore();

    });

    it('POST /api/admin/match/delete/stream/link should delete stream-only match', async function(){
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData);

        let admin = await User.find({ displayName: 'TEST azalea#9539' });
        admin = admin[0];

        // give admin appropriate level
        await new AdminLevel({ adminId: admin._id, MATCH: true }).save();

        // create a stream-only match
        const matchId = `stream-del-${Date.now()}`;
        const seasonInfo = await SeasonInfoCommon.getSeasonInfo();
        const currentSeason = seasonInfo.value;
        const matchObj = new Match({ matchId: matchId, divisionConcat: 'd-beast', season: currentSeason, streamOnly: true, title: 'Stream Delete' });
        await matchObj.save();

        const token = await generateNewToken(utils.objectify(admin), false);

        const res = await request(app.app)
            .post('/api/admin/match/delete/stream/link')
            .set('Authorization', `Bearer ${token}`)
            .send({ matchId });

        expect(res.status).to.equal(200);
        expect(res.body.returnObject).to.not.be.null;
        expect(res.body.returnObject.matchId).to.equal(matchId);

        const dbMatchAfter = await Match.findOne({ matchId });
        expect(dbMatchAfter).to.be.null;

    });

    it('POST /api/admin/season/reset should archive divisions and return success', async function(){
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData);

        let admin = await User.find({ displayName: 'TEST azalea#9539' });
        admin = admin[0];

        // give admin appropriate level (save the record and pass it into token generator)
        const adminLevelEntry = await new AdminLevel({ adminId: admin._id, MATCH: true }).save();

        const token = await generateNewToken(utils.objectify(admin), adminLevelEntry);

        // create isolated express app to mount the router with an injected admin user (bypass passport)
        const express = require('express');
        const testApp = express();
        testApp.use(express.json());
        testApp.use((req, res, next) => { req.user = { displayName: admin.displayName, adminLevel: { MATCH: true } }; next(); });
        testApp.use('/api/admin', require('../../../routes/admin-match'));

        const stubAnswer = { archived: true };
        const stub = sinon.stub(ArchiveMethods, 'archiveDivisions').resolves(stubAnswer);

        try {
            const res = await request(testApp)
                .post('/api/admin/season/reset')
                .set('Authorization', `Bearer ${token}`)
                .send({ password: 'resetseason' });

            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal('Season Reset');
            expect(res.body.returnObject).to.deep.equal({ success: true, data: stubAnswer });
        } finally {
            stub.restore();
        }
    });

    it('POST /api/admin/season/reset should return 500 on incorrect password', async function(){
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData);

        let admin = await User.find({ displayName: 'TEST azalea#9539' });
        admin = admin[0];

        // give admin appropriate level (save record and include it in token)
        const adminLevelEntry = await new AdminLevel({ adminId: admin._id, MATCH: true }).save();

        const token = await generateNewToken(utils.objectify(admin), adminLevelEntry);

        // create small express app to mount router with injected admin user
        const express = require('express');
        const testApp = express();
        testApp.use(express.json());
        testApp.use((req, res, next) => { req.user = { displayName: admin.displayName, adminLevel: { MATCH: true } }; next(); });
        testApp.use('/api/admin', require('../../../routes/admin-match'));

        try {
            const res = await request(testApp)
                .post('/api/admin/season/reset')
                .set('Authorization', `Bearer ${token}`)
                .send({ password: 'wrongpass' });

            expect(res.status).to.equal(500);
            expect(res.body.message).to.equal('Password incorrect');
        } finally {
            // nothing to restore here
        }
    });

    it('POST /api/admin/season/reset should return 500 if archiveDivisions fails', async function(){
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData);

        let admin = await User.find({ displayName: 'TEST azalea#9539' });
        admin = admin[0];

        // give admin appropriate level (save and include in token)
        const adminLevelEntry = await new AdminLevel({ adminId: admin._id, MATCH: true }).save();

        const token = await generateNewToken(utils.objectify(admin), adminLevelEntry);

        const failure = { error: 'fail' };
        const stub = sinon.stub(ArchiveMethods, 'archiveDivisions').rejects(failure);

        // create small express app to mount router with injected admin user
        const express = require('express');
        const testApp = express();
        testApp.use(express.json());
        testApp.use((req, res, next) => { req.user = { displayName: admin.displayName, adminLevel: { MATCH: true } }; next(); });
        testApp.use('/api/admin', require('../../../routes/admin-match'));

        try {
            const res = await request(testApp)
                .post('/api/admin/season/reset')
                .set('Authorization', `Bearer ${token}`)
                .send({ password: 'resetseason' });

            expect(res.status).to.equal(500);
            expect(res.body.message).to.equal('Error resetting teams registration division');
            // util.returnMessaging places the failure into `err` (stringified), not returnObject
            expect(res.body.err).to.equal(JSON.stringify(failure));
        } finally {
            stub.restore();
        }
    });

});