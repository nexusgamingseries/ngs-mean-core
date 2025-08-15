const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const assert = require('assert');
const mongoUnit = require('mongo-unit');
const mockData = require('../../mock-data/standingsData.json');
const utils = require('../../../utils');
const _ = require('lodash');
const User = require('../../../models/user-models');
const Team = require('../../../models/team-models');
const Admin = require('../../../models/admin-models');
const sinon = require('sinon');
const playerRanksMethods = require('../../../methods/player-ranks/playerRankMethods');
const TeamSubs = require('../../../subroutines/team-subs');
const s3putObject = require('../../../methods/aws-s3/put-s3-file');
const Matches = require('../../../models/match-model');

const { AdminLevel, PendingQueue } = require('../../../models/admin-models');

const loadConfig = require('../../../../loadConfig.js');
let app 
let generateNewToken;

before(async function(){
    this.timeout(5000);
    const res = await mongoUnit.start(); 
    const passportSetup = require('../../../configs/passport-setup');  
    generateNewToken = passportSetup.generateNewToken;
    console.log('fake mongo is started: ', mongoUnit.getUrl())
    process.env.mongoURI = mongoUnit.getUrl() // this var process.env.DATABASE_URL = will keep link to fake mongo
    app = require('../../../../server');
})

describe("admin-routes",async function(){

    it(`api/admin/upsertSeasonInfo returns upserted season info`,async function(){
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData);
    

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};

        obj.adminId = admin._id;
        obj.SCHEDULEGEN = true;

        await new AdminLevel(obj).save();

        const seasonInfo = {
            "value": 1,
            "seasonStartDate" : 1628481600000.0,
            "seasonEndDate" : 1634356800000.0,
            "registrationEndDate" : 1626937200000.0
        };

        console.log('seasonInfo', seasonInfo);

        const token = await generateNewToken(utils.objectify(admin), false);

        const res = await request(app.app)
            .post('/api/admin/upsertSeasonInfo')
            .set('Authorization', `Bearer ${token}`)
            .send(seasonInfo);
        
        console.log('res.body', res.body);
        expect(res.status).to.equal(200);
        expect(Object.keys(res.body.returnObject).length > 0).to.be.true;

    });

    it(`api/admin/upsertSeasonInfo returns error for bad inputs`,async function(){
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData);
    
        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};

        obj.adminId = admin._id;
        obj.SCHEDULEGEN = true;

        await new AdminLevel(obj).save();

        const seasonInfo = null;

        console.log('seasonInfo', seasonInfo);

        const token = await generateNewToken(utils.objectify(admin), false);

        const res = await request(app.app)
            .post('/api/admin/upsertSeasonInfo')
            .set('Authorization', `Bearer ${token}`)
            .send(seasonInfo);
        
        console.log('res.body', res.body);
        expect(res.status).to.equal(500);
        expect(res.body.message).to.include('value (number) is required!');

    });
    
});