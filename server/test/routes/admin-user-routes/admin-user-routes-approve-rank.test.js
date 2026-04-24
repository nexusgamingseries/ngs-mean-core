const request = require('supertest');
const assert = require('assert');
require('dotenv').config();
const mongoUnit = require('mongo-unit');
const mockData = require('../../mock-data/standingsData.json');
const utils = require('../../../utils');
const _ = require('lodash');
const User = require('../../../models/user-models');
const sinon = require('sinon');
const Admin = require('../../../models/admin-models');
const prMethods = require('../../../methods/player-rank-upload');

const { AdminLevel } = require('../../../models/admin-models');


let app;
let generateNewToken;
var playerRankApprovedStub;
var playerRankDeniedStub;

before(async function(){
    this.timeout(5000);
    const res = await mongoUnit.start(); 
    const passportSetup = require('../../../configs/passport-setup');  
    generateNewToken = passportSetup.generateNewToken;
    console.log('fake mongo is started: ', mongoUnit.getUrl())
    process.env.mongoURI = mongoUnit.getUrl()
    app = require('../../../../server');
})

describe("admin-user-routes-approve-rank",async function(){

    afterEach(function() {
        if (playerRankApprovedStub) {
            playerRankApprovedStub.restore();
        }
        if (playerRankDeniedStub) {
            playerRankDeniedStub.restore();
        }
    });

    it('approve player rank', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let requestUrl = '/api/admin/approveRank';

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        let users = await User.find();
        let user = users[0];

        const rankObj = {
            userId: user._id,
            hlRankMetal: 'Gold',
            hlRankDivision: 1,
            seasonInfo: 1,
            verified: true
        }

        const obj = {};
        obj.adminId = admin._id;
        obj.USER = true;
 
        await new AdminLevel(obj).save();
        
        playerRankApprovedStub = sinon.stub(prMethods, "playerRankApproved").resolves({success: true});

        const token = generateNewToken(utils.objectify(admin), false);

        let result = await request(app.app).post(requestUrl)
        .set({"Authorization": `Bearer ${token}`})
        .send(rankObj)
        .then((res)=>{
            return res;
        },
        (err)=>{
            throw err;
        });

        assert(result.status === 200);
        assert(Object.keys(result.body).length > 0);
        // Verify the method was called with the rank object
        sinon.assert.called(playerRankApprovedStub);

    })

    it('deny player rank', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let requestUrl = '/api/admin/approveRank';

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        let users = await User.find();
        let user = users[0];

        const rankObj = {
            userId: user._id,
            hlRankMetal: 'Gold',
            hlRankDivision: 1,
            seasonInfo: 1,
            verified: false
        }

        const obj = {};
        obj.adminId = admin._id;
        obj.USER = true;
 
        await new AdminLevel(obj).save();
        
        playerRankDeniedStub = sinon.stub(prMethods, "playerRankDenied").resolves({success: true});

        const token = generateNewToken(utils.objectify(admin), false);

        let result = await request(app.app).post(requestUrl)
        .set({"Authorization": `Bearer ${token}`})
        .send(rankObj)
        .then((res)=>{
            return res;
        },
        (err)=>{
            throw err;
        });

        assert(result.status === 200);
        assert(Object.keys(result.body).length > 0);
        // Verify the rankObj includes the sender (admin's user id)
        const callArgs = playerRankDeniedStub.getCall(0).args[0];
        assert(callArgs.sender === admin._id.toString() || callArgs.sender.toString() === admin._id.toString());
        sinon.assert.called(playerRankDeniedStub);

    })

    it('fail without proper access level', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let requestUrl = '/api/admin/approveRank';

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        let users = await User.find();
        let user = users[0];

        const rankObj = {
            userId: user._id,
            hlRankMetal: 'Gold',
            hlRankDivision: 1,
            seasonInfo: 1,
            verified: true
        }

        const obj = {};
        obj.adminId = admin._id;
        obj.EVENT = true; // Only EVENT access, not USER
 
        await new AdminLevel(obj).save();
        
        playerRankApprovedStub = sinon.stub(prMethods, "playerRankApproved").resolves({success: true});

        const token = generateNewToken(utils.objectify(admin), false);

        let result = await request(app.app).post(requestUrl)
        .set({"Authorization": `Bearer ${token}`})
        .send(rankObj)
        .then((res)=>{
            return res;
        },
        (err)=>{
            throw err;
        });

        assert(result.status === 403);

    })

    it('handle error on rank approval failure', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let requestUrl = '/api/admin/approveRank';

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        let users = await User.find();
        let user = users[0];

        const rankObj = {
            userId: user._id,
            hlRankMetal: 'Gold',
            hlRankDivision: 1,
            seasonInfo: 1,
            verified: true
        }

        const obj = {};
        obj.adminId = admin._id;
        obj.USER = true;
 
        await new AdminLevel(obj).save();
        
        playerRankApprovedStub = sinon.stub(prMethods, "playerRankApproved").rejects(new Error('Database error'));

        const token = generateNewToken(utils.objectify(admin), false);

        let result = await request(app.app).post(requestUrl)
        .set({"Authorization": `Bearer ${token}`})
        .send(rankObj)
        .then((res)=>{
            return res;
        },
        (err)=>{
            throw err;
        });

        assert(result.status === 500);
        assert(result.body.message.includes('Error') || result.body.message.includes('not updated'));

    })

    it('handle error on rank denial failure', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let requestUrl = '/api/admin/approveRank';

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        let users = await User.find();
        let user = users[0];

        const rankObj = {
            userId: user._id,
            hlRankMetal: 'Gold',
            hlRankDivision: 1,
            seasonInfo: 1,
            verified: false
        }

        const obj = {};
        obj.adminId = admin._id;
        obj.USER = true;
 
        await new AdminLevel(obj).save();
        
        playerRankDeniedStub = sinon.stub(prMethods, "playerRankDenied").rejects(new Error('Database error'));

        const token = generateNewToken(utils.objectify(admin), false);

        let result = await request(app.app).post(requestUrl)
        .set({"Authorization": `Bearer ${token}`})
        .send(rankObj)
        .then((res)=>{
            return res;
        },
        (err)=>{
            throw err;
        });

        assert(result.status === 500);
        assert(result.body.message.includes('Error') || result.body.message.includes('not updated'));

    })

    it('fail without authentication token', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let requestUrl = '/api/admin/approveRank';

        const rankObj = {
            userId: '123456789',
            hlRankMetal: 'Gold',
            hlRankDivision: 1,
            seasonInfo: 1,
            verified: true
        }

        playerRankApprovedStub = sinon.stub(prMethods, "playerRankApproved").resolves({success: true});

        let result = await request(app.app).post(requestUrl)
        .send(rankObj)
        .then((res)=>{
            return res;
        },
        (err)=>{
            throw err;
        });

        // Should be 302 (redirect) or 401 (unauthorized)
        assert(result.status === 302 || result.status === 401);

    })

})
