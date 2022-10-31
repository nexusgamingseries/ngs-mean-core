const mocha = require('mocha');
const chai = require('chai');
const request = require('supertest');
const assert = require('assert');
const mongoUnit = require('mongo-unit');
const mockData = require('../../mock-data/eventsRoutes.json');
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
const message = require('../../../subroutines/message-subs');
let app;
let generateNewToken;
var uploadAvatarStub;


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
    it('api/events/upsert requires permissions',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
       
        let requestUrl = `/api/events/upsert`;

        const postBody = {"org_event":{},"event":{"eventName":"This is a test event","eventDate":1667239200000,"eventDescription":"I am further describing the event here.","eventLink":"www.theevent.com","eventBlurb":"This is a blurb of the event","eventImage":""}}

        let result = await request(app.app).post(requestUrl)
        .send(postBody)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 401);

    });
        it('api/events/upsert requires permissions',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
       
        let requestUrl = `/api/events/upsert`;

        const postBody = {"org_event":{},"event":{"eventName":"This is a test event","eventDate":1667239200000,"eventDescription":"I am further describing the event here.","eventLink":"www.theevent.com","eventBlurb":"This is a blurb of the event","eventImage":""}}

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};

        obj.adminId = admin._id;
        obj.EVENTS = true;
 
        await new AdminLevel(obj).save();

        const token = generateNewToken.generateNewToken(utils.objectify(admin), false);
        let result = await request(app.app).post(requestUrl)
        .set({"Authorization": `Bearer ${token}`})
        .send(postBody)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 200);

    });
    
     it('api/events/fetch/id fetches specified event',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
       
        let requestUrl = `/api/events/fetch/id`;

        const postBody = {
            "id":"bt03vnk8ti6y0f"
        }

    
        let result = await request(app.app).post(requestUrl)
        .send(postBody)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 200);
        assert(result.body.returnObject != null);

    });

         it('api/events/fetch/all fetches all events',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
       
        let requestUrl = `/api/events/fetch/all`;

    
        let result = await request(app.app).post(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 200);
        assert(result.body.returnObject != null);

    });

             it('api/events/delete deletes specified event',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
       
        let requestUrl = `/api/events/delete`;

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};

        obj.adminId = admin._id;
        obj.EVENTS = true;
 
        await new AdminLevel(obj).save();

        let event = await Event.find({uuid:"d18ank6z83wqb"});
        event = event[0];
        

        event = utils.objectify(event);

        const postBody = {
            "id":event._id
        };

        const token = generateNewToken.generateNewToken(utils.objectify(admin), false);
        let result = await request(app.app).post(requestUrl)
        .set({"Authorization": `Bearer ${token}`})
        .send(postBody)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 200);
        assert(result.body.returnObject != null);

    });

             it('api/events/delete requires permissions',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
       
        let requestUrl = `/api/events/delete`;

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const postBody = {
            "id":"d18ank6z83wqb"
        }

        const token = generateNewToken.generateNewToken(utils.objectify(admin), false);
        let result = await request(app.app).post(requestUrl)
        .set({"Authorization": `Bearer ${token}`})
        .send(postBody)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 403);

    });
    

})