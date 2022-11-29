const mocha = require('mocha');
const chai = require('chai');
const request = require('supertest');
const assert = require('assert');
const mongoUnit = require('mongo-unit');
const mockData = require('../../mock-data/division-routes.json');
const utils = require('../../../utils');
const _ = require('lodash');
const SeasonInfoCommon = require('../../../methods/seasonInfoMethods');
const User = require('../../../models/user-models');
const Event = require("../../../models/event-model");
const Team = require('../../../models/team-models');
const Notes = require('../../../models/notes-models');
const Message = require('../../../models/message-models');
const Admin = require('../../../models/admin-models');
const sinon = require('sinon');
const hpAPI = require('../../../methods/heroesProfileAPI');
const Avatar = require('../../../methods/avatarUpload');
const { AdminLevel } = require('../../../models/admin-models');


const loadConfig = require('/Users/leegrisham/Documents/workspace_personal/ngs_mean_core/loadConfig');
let app;
let generateNewToken;

before((done) =>{
    loadConfig().then(
    res=>{
       mongoUnit.start().then(() => {
        generateNewToken = require('../../../configs/passport-setup');
        console.log('fake mongo is started: ', mongoUnit.getUrl())
        process.env.mongoURI = mongoUnit.getUrl() // this var process.env.DATABASE_URL = will keep link to fake mongo
        app = require('../../../../server');
        // mocha.run() // this line start mocha tests
        done();
        });
    });
})

describe("events-routes",()=>{

    it('api/admin/delete/user fails with no access',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
       let div = "d-beast";
        let requestUrl = `/api/admin/delete/user`;

        const body = {
            displayName:""
        }

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};

        obj.adminId = admin._id;
        obj.EVENTS = true;
 
        await new AdminLevel(obj).save();

        const token = generateNewToken.generateNewToken(utils.objectify(admin), false);

        let result = await request(app.app).post(requestUrl)
        .set({"Authorization": `Bearer ${token}`})
        .send(body)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(Object.keys(result.body.returnObject).length>0);

    });

    it('api/admin/delete/user succeeds with access',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
       let div = "d-beast";
        let requestUrl = `/api/admin/delete/user`;

        const body = {
            displayName:""
        }

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};

        obj.adminId = admin._id;
        obj.EVENTS = true;
 
        await new AdminLevel(obj).save();

        const token = generateNewToken.generateNewToken(utils.objectify(admin), false);

        let result = await request(app.app).post(requestUrl)
        .set({"Authorization": `Bearer ${token}`})
        .send(body)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(Object.keys(result.body.returnObject).length>0);

    });

})