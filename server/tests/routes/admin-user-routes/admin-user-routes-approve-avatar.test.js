const request = require('supertest');
const assert = require('assert');
const mongoUnit = require('mongo-unit');
const mockData = require('../../mock-data/standingsData.json');
const utils = require('../../../utils');
const _ = require('lodash');
const User = require('../../../models/user-models');
const sinon = require('sinon');
const Admin = require('../../../models/admin-models');
const Avatar = require('../../../methods/avatarUpload');

const { AdminLevel } = require('../../../models/admin-models');


let app;
let generateNewToken;
var deleteAvatarStub;

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

    it('approve pending user avatar', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let requestUrl = '/api/admin/approveAvatar';

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        let users = await User.find();
        let user = users[0];

        const avatarInfo = {
            userId:user._id,
            displayName:user.displayName,
            fileName:"aTestFile.png",
            timestamp:Date.now()
        }

        const body = {
            approved:true,
            fileName:avatarInfo.fileName,
            userId:user._id
        }

        await new Admin.PendingAvatarQueue(avatarInfo).save();

        const obj = {};

        obj.adminId = admin._id;
        obj.USER = true;
 
        await new AdminLevel(obj).save();
        
        deleteAvatarStub = sinon.stub(Avatar, "deleteAvatar").resolves(true);

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

        let userSaved = await User.find({displayName:user.displayName});
        userSaved = userSaved[0];

        assert(result.status === 200);
        assert(Object.keys(result.body).length>0)
        assert(userSaved.avatar === body.fileName);

    })

        it('deny pending user avatar', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let requestUrl = '/api/admin/approveAvatar';

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        let users = await User.find();
        let user = users[0];

        const avatarInfo = {
            userId:user._id,
            displayName:user.displayName,
            fileName:"aTestFile.png",
            timestamp:Date.now()
        }

        const body = {
            approved:false,
            fileName:avatarInfo.fileName,
            userId:user._id
        }

        await new Admin.PendingAvatarQueue(avatarInfo).save();

        const obj = {};

        obj.adminId = admin._id;
        obj.USER = true;
 
        await new AdminLevel(obj).save();
        
        // deleteAvatarStub = sinon.stub(Avatar, "deleteAvatar").resolves(true);
        deleteAvatarStub.reset();
        deleteAvatarStub.resolves(true);
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

        let userSaved = await User.find({displayName:user.displayName});
        userSaved = userSaved[0];

        assert(result.status === 200);
        assert(Object.keys(result.body).length>0)
        assert(userSaved.avatar === 'defaultAvatar.png');

    })

    it('fail without access ', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let requestUrl = '/api/admin/approveAvatar';

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        let users = await User.find();
        let user = users[0];

        const avatarInfo = {
            userId:user._id,
            displayName:user.displayName,
            fileName:"aTestFile.png",
            timestamp:Date.now()
        }

        const body = {
            approved:false,
            fileName:avatarInfo.fileName,
            userId:user._id
        }

        await new Admin.PendingAvatarQueue(avatarInfo).save();

        const obj = {};

        obj.adminId = admin._id;
        obj.EVENT = true;
 
        await new AdminLevel(obj).save();
        
        // deleteAvatarStub = sinon.stub(Avatar, "deleteAvatar").resolves(true);
        deleteAvatarStub.reset();
        deleteAvatarStub.resolves(true);
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

        let userSaved = await User.find({displayName:user.displayName});
        userSaved = userSaved[0];

        assert(result.status === 403);

    })


})