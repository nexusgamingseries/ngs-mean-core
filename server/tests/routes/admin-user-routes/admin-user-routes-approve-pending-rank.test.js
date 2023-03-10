const request = require('supertest');
const assert = require('assert');
const mongoUnit = require('mongo-unit');
const mockData = require('../../mock-data/standingsData.json');
const utils = require('../../../utils');
const _ = require('lodash');
const User = require('../../../models/user-models');
const sinon = require('sinon');
const Admin = require('../../../models/admin-models');
const s3deleteFile = require('../../../methods/aws-s3/delete-s3-file');
const PendingRankQueue = require('../../../models/admin-models').PendingRankQueue;

const { AdminLevel } = require('../../../models/admin-models');


let app;
let generateNewToken;
var s3deleteStub;

before(async function(){
    this.timeout(5000);
    // await loadConfig();
    const res = await mongoUnit.start();   
    generateNewToken = require('../../../configs/passport-setup');
    console.log('fake mongo is started: ', mongoUnit.getUrl())
    process.env.mongoURI = mongoUnit.getUrl() // this var process.env.DATABASE_URL = will keep link to fake mongo
    app = require('../../../../server');
})

describe("admin-user-routes-2",async function(){

    it('approve pending user rank', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let requestUrl = '/api/admin/approveRank';

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        let users = await User.find();
        let user = users[1];

        const tObj = {
            userId:user._id,
            year:2022,
            season:1,
            filename:'testfilename',
            timestamp:Date.now()
        }

        const savedRankQueue = await new PendingRankQueue(tObj).save();

        const body = {
            verified: true,
            seasonInf:{season:1, year:2022},
            userId:user._id,
            hlRankMetal:'Gold',
            hlRankDivision:1
        }

        // await new Admin.PendingAvatarQueue(avatarInfo).save();

        const obj = {};

        obj.adminId = admin._id;
        obj.USER = true;
 
        await new AdminLevel(obj).save();
        
        s3deleteStub = sinon.stub(s3deleteFile, 's3deleteFile').resolves(true);

        const token = generateNewToken.generateNewToken(utils.objectify(admin), false);

        let result = await request(app.app).post(requestUrl)
        .set({"Authorization": `Bearer ${token}`})
        .send(body)
        .then((res)=>{
            return res;
        },
        (err)=>{
            throw err;
        });

        let savedUser = await User.findById(user._id);

        assert(savedUser.verifiedRankHistory.length>0)
        assert(result.status === 200);

    });

    it('deny pending user rank', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let requestUrl = '/api/admin/approveRank';

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        let users = await User.find();
        let user = users[0];

        const body = {
            verified: false,
            seasonInf:{season:1, year:2022},
            userId:user._id,
            hlRankMetal:'Gold',
            hlRankDivision:1
        }

        const obj = {};

        obj.adminId = admin._id;
        obj.USER = true;
 
        await new AdminLevel(obj).save();
        
        s3deleteStub.reset();
        s3deleteStub.resolves(true);

        const token = generateNewToken.generateNewToken(utils.objectify(admin), false);

        let result = await request(app.app).post(requestUrl)
        .set({"Authorization": `Bearer ${token}`})
        .send(body)
        .then((res)=>{
            return res;
        },
        (err)=>{
            throw err;
        });

        assert(result.status === 200);

    })

    it('fail without access ', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let requestUrl = '/api/admin/approveRank';

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        let users = await User.find();
        let user = users[0];

        const avatarInfo = {
            userId:user._id,
            displayName:user.displayName,
            fileName:"aTestFile.png",
            timestamp:Date.now()
        };

        const body = {
            verified: true,
            seasonInf:{season:1, year:2022},
            usedId:user._id,
            hlRankMetal:'Gold',
            hlRankDivision:1
        };

        await new Admin.PendingAvatarQueue(avatarInfo).save();

        const obj = {};

        obj.adminId = admin._id;
        obj.EVENT = true;
 
        await new AdminLevel(obj).save();
        
        s3deleteStub.reset();
        s3deleteStub.resolves(true);
        const token = generateNewToken.generateNewToken(utils.objectify(admin), false);

        let result = await request(app.app).post(requestUrl)
        .set({"Authorization": `Bearer ${token}`})
        .send(body)
        .then((res)=>{
            return res;
        },
        (err)=>{
            throw err;
        });

        assert(result.status === 403);

    })


})