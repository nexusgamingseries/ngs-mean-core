const mocha = require('mocha');
const chai = require('chai');
const request = require('supertest');
const assert = require('assert');
const mongoUnit = require('mongo-unit');
const mockData = require('../../mock-data/standingsData.json');
const utils = require('../../../utils');
const _ = require('lodash');
const User = require('../../../models/user-models');

const { AdminLevel } = require('../../../models/admin-models');


const loadConfig = require('/Users/leegrisham/Documents/workspace_personal/ngs_mean_core/loadConfig');
let app;
let generateNewToken;

before(async function(){
    this.timeout(5000);
    // await loadConfig();
    const res = await mongoUnit.start();   
    generateNewToken = require('../../../configs/passport-setup');
    console.log('fake mongo is started: ', mongoUnit.getUrl())
    process.env.mongoURI = mongoUnit.getUrl() // this var process.env.DATABASE_URL = will keep link to fake mongo
    app = require('../../../../server');
})

describe("admin-user-routes",async function(){

    it('api/admin/user/delete fails with no access',async function(){
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
        let requestUrl = `/api/admin/user/delete`;

        const body = {
            displayName:"TEST lily#3664"
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
            throw err;
        });

        assert(result.status === 403);

    });

    it('api/admin/user/delete succeeds with access',async function(){
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
        let requestUrl = `/api/admin/user/delete`;

        const body = {
            displayName:"TEST lily#3664"
        }

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};

        obj.adminId = admin._id;
        obj.USER = true;
 
        await new AdminLevel(obj).save();

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

        assert(Object.keys(result.body.returnObject).length>0);

    });

        it('api/admin/user/delete may not delete yourself',async function(){
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
        let requestUrl = `/api/admin/user/delete`;

        const body = {
            displayName:"TEST azalea#9539"
        }

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};

        obj.adminId = admin._id;
        obj.USER = true;
 
        await new AdminLevel(obj).save();

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

        assert(result.status === 400);

    });

     it('api/admin/user/delete may not delete a captain',async function(){
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
        let requestUrl = `/api/admin/user/delete`;

        const body = {
            displayName:"Mongoose#11247"
        }

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};

        obj.adminId = admin._id;
        obj.USER = true;
 
        await new AdminLevel(obj).save();

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

        assert(result.status === 400);

    });

    it('api/admin/user/delete user not found',async function(){
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
        let requestUrl = `/api/admin/user/delete`;

        const body = {
            displayName:"Mongooasdfse#11247"
        }

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};

        obj.adminId = admin._id;
        obj.USER = true;
 
        await new AdminLevel(obj).save();

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

        assert(result.status === 400);

    });

    it('api/admin/user/save saves user changes', async()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
       let requestUrl = `/api/admin/user/save`;

       let userToSave = await User.find({"displayName":"Mongoose#11247"});
       userToSave = userToSave[0];


       let disname = "Test#7131";
       let thandle = "1-Hero-1-6315242"
       let seaplay = 1;
       let iscapt = true;
       let castername = "zzzz";
       let twitch = "twitch.tv/zzzz";
       let teamname = "ffff";
       let pendingTeam = false;
       let timeZone =  "-5";

        userToSave["timeZone"] = timeZone;
        userToSave["pendingTeam"] = pendingTeam;
        userToSave["teamName"] = teamname;
        userToSave["discordId"] = disname;
        userToSave["toonHandle"] = thandle;
        userToSave["seasonsPlayed"] = seaplay;
        userToSave["isCaptain"] = iscapt;
        userToSave["casterName"] = castername;
        userToSave["twitch"] = twitch;

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};

        obj.adminId = admin._id;
        obj.USER = true;
 
        await new AdminLevel(obj).save();

        const body = {
            user:userToSave
        }

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

        assert(result.status == 200);
        assert(Object.keys(result.body.returnObject).length>0);
        let returnedUser = result.body.returnObject;
        assert(userToSave["timeZone"] == returnedUser["timeZone"]);
        assert(userToSave["pendingTeam"] == returnedUser["pendingTeam"]);
        assert(userToSave["teamName"] == returnedUser["teamName"]);
        assert(userToSave["discordId"] == returnedUser["discordId"]);
        assert(userToSave["toonHandle"] == returnedUser["toonHandle"]);
        assert(userToSave["seasonsPlayed"] == returnedUser["seasonsPlayed"]);
        assert(userToSave["isCaptain"] == returnedUser["isCaptain"]);
        assert(userToSave["casterName"] == returnedUser["casterName"]);
        assert(userToSave["twitch"] == returnedUser["twitch"]);
        
    })

        it('api/admin/user/save user not found, bad input', async()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
       let requestUrl = `/api/admin/user/save`;


        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};

        obj.adminId = admin._id;
        obj.USER = true;
 
        await new AdminLevel(obj).save();

        const body = {
            user:{
                _id:"asdfasdfasdf"
            }
        }

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

        assert(result.status == 400);
        
    })

    it('api/admin/user/save fails without permissions', async()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
       let requestUrl = `/api/admin/user/save`;


        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};

        obj.adminId = admin._id;
        obj.EVENT = true;
 
        await new AdminLevel(obj).save();

        const body = {
            user:{
                _id:"asdfasdfasdf"
            }
        }

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

        assert(result.status == 403);
        
    })

        it('api/admin/user/get/usersacl/all gets all users acls list', async()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        const adminobjs = [{
    
    "TEAM": true,
    "USER": true,
    "DIVISION": true,
    "STANDINGS": true,
    "CASTER": true,
    "MATCH": true,
    "SCHEDULEGEN": true,
    "ACL": true,
    "EVENTS": true,
    "LOGS": true,
    "__v": 0
},{
    "TEAM": false,
    "USER": false,
    "DIVISION": false,
    "STANDINGS": true,
    "CASTER": false,
    "MATCH": false,
    "SCHEDULEGEN": true,
    "ACL": true,
    "EVENTS": true,
    "LOGS": true,
    "__v": 0
}]
       
       let requestUrl = `/api/admin/user/get/usersacl/all`;


        let admin = await User.find();
        let adminOne = admin[0];
        let adminTwo = admin[1];
        let testAdmin = admin[2];


        adminobjs[0].adminId = adminOne._id;
 
        await new AdminLevel(adminobjs[0]).save();

        adminobjs[1].adminId = adminTwo._id;
 
        await new AdminLevel(adminobjs[1]).save();

        const obj = {

        }

        obj.adminId = testAdmin._id;
        obj.ACL = true;

        await new AdminLevel(obj).save();

        

        const token = generateNewToken.generateNewToken(utils.objectify(testAdmin), false);

        let result = await request(app.app).get(requestUrl)
        .set({"Authorization": `Bearer ${token}`})
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 200);
        assert(Object.keys(result.body.returnObject).length>0);
        
    });

      it('api/admin/user/get/usersacl/all fail with out permission', async()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        const adminobjs = [{
    
    "TEAM": true,
    "USER": true,
    "DIVISION": true,
    "STANDINGS": true,
    "CASTER": true,
    "MATCH": true,
    "SCHEDULEGEN": true,
    "ACL": true,
    "EVENTS": true,
    "LOGS": true,
    "__v": 0
},{
    "TEAM": false,
    "USER": false,
    "DIVISION": false,
    "STANDINGS": true,
    "CASTER": false,
    "MATCH": false,
    "SCHEDULEGEN": true,
    "ACL": true,
    "EVENTS": true,
    "LOGS": true,
    "__v": 0
}]
       
       let requestUrl = `/api/admin/user/get/usersacl/all`;


        let admin = await User.find();
        let adminOne = admin[0];
        let adminTwo = admin[1];
        let testAdmin = admin[2];


        adminobjs[0].adminId = adminOne._id;
 
        await new AdminLevel(adminobjs[0]).save();

        adminobjs[1].adminId = adminTwo._id;
 
        await new AdminLevel(adminobjs[1]).save();

        const obj = {

        }

        obj.adminId = testAdmin._id;
        obj.USER = true;

        await new AdminLevel(obj).save();

        

        const token = generateNewToken.generateNewToken(utils.objectify(testAdmin), false);

        let result = await request(app.app).get(requestUrl)
        .set({"Authorization": `Bearer ${token}`})
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 403);
        
        
    })

    it('api/admin/user/get/usersacl fail with out permission', async()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        const adminobjs = [{
    
    "TEAM": true,
    "USER": true,
    "DIVISION": true,
    "STANDINGS": true,
    "CASTER": true,
    "MATCH": true,
    "SCHEDULEGEN": true,
    "ACL": true,
    "EVENTS": true,
    "LOGS": true,
    "__v": 0
},{
    "TEAM": false,
    "USER": false,
    "DIVISION": false,
    "STANDINGS": true,
    "CASTER": false,
    "MATCH": false,
    "SCHEDULEGEN": true,
    "ACL": true,
    "EVENTS": true,
    "LOGS": true,
    "__v": 0
}]
       
       let requestUrl = `/api/admin/user/get/usersacl`;


        let admin = await User.find();
        let adminOne = admin[0];
        let adminTwo = admin[1];
        let testAdmin = admin[2];


        adminobjs[0].adminId = adminOne._id;
 
        await new AdminLevel(adminobjs[0]).save();

        adminobjs[1].adminId = adminTwo._id;
 
        await new AdminLevel(adminobjs[1]).save();

        const obj = {

        }

        obj.adminId = testAdmin._id;
        obj.USER = true;

        await new AdminLevel(obj).save();

        const body = {
            id:adminOne._id
        };

        const token = generateNewToken.generateNewToken(utils.objectify(testAdmin), false);

        let result = await request(app.app).post(requestUrl)
        .send(body)
        .set({"Authorization": `Bearer ${token}`})
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 403);
        
        
    })

    it('api/admin/user/get/usersacl does not find non-existant rights', async()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        const adminobjs = [{
    
    "TEAM": true,
    "USER": true,
    "DIVISION": true,
    "STANDINGS": true,
    "CASTER": true,
    "MATCH": true,
    "SCHEDULEGEN": true,
    "ACL": true,
    "EVENTS": true,
    "LOGS": true,
    "__v": 0
},{
    "TEAM": false,
    "USER": false,
    "DIVISION": false,
    "STANDINGS": true,
    "CASTER": false,
    "MATCH": false,
    "SCHEDULEGEN": true,
    "ACL": true,
    "EVENTS": true,
    "LOGS": true,
    "__v": 0
}]
       
       let requestUrl = `/api/admin/user/get/usersacl`;


        let admin = await User.find();
        let adminOne = admin[0];
        let adminTwo = admin[1];
        let testAdmin = admin[2];


        adminobjs[0].adminId = adminOne._id;
 
        await new AdminLevel(adminobjs[0]).save();

        adminobjs[1].adminId = adminTwo._id;
 
        await new AdminLevel(adminobjs[1]).save();

        const obj = {

        }

        obj.adminId = testAdmin._id;
        obj.ACL = true;

        await new AdminLevel(obj).save();

        const body = {
            id:adminOne._id
        };

        const token = generateNewToken.generateNewToken(utils.objectify(testAdmin), false);

        let result = await request(app.app).post(requestUrl)
        .send(body)
        .set({"Authorization": `Bearer ${token}`})
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 200);
        assert(result.body.returnObject.adminRights.adminId == adminOne._id);
        
        
    })

    it('api/admin/user/get/usersacl bet specified user ACL', async()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        const adminobjs = [{
    
    "TEAM": true,
    "USER": true,
    "DIVISION": true,
    "STANDINGS": true,
    "CASTER": true,
    "MATCH": true,
    "SCHEDULEGEN": true,
    "ACL": true,
    "EVENTS": true,
    "LOGS": true,
    "__v": 0
},{
    "TEAM": false,
    "USER": false,
    "DIVISION": false,
    "STANDINGS": true,
    "CASTER": false,
    "MATCH": false,
    "SCHEDULEGEN": true,
    "ACL": true,
    "EVENTS": true,
    "LOGS": true,
    "__v": 0
}]
       
       let requestUrl = `/api/admin/user/get/usersacl`;


        let admin = await User.find();
        let adminOne = admin[0];
        let adminTwo = admin[1];
        let testAdmin = admin[2];
        let user = admin[3];


        adminobjs[0].adminId = adminOne._id;
 
        await new AdminLevel(adminobjs[0]).save();

        adminobjs[1].adminId = adminTwo._id;
 
        await new AdminLevel(adminobjs[1]).save();

        const obj = {

        }

        obj.adminId = testAdmin._id;
        obj.ACL = true;

        await new AdminLevel(obj).save();

        const body = {
            id:user._id
        };

        const token = generateNewToken.generateNewToken(utils.objectify(testAdmin), false);

        let result = await request(app.app).post(requestUrl)
        .send(body)
        .set({"Authorization": `Bearer ${token}`})
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 401);
        // assert(result.body.returnObject.adminRights.adminId == adminOne._id);
        
    })


    it('api/admin/user/upsertRoles set specified new user ACL', async()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        const adminobjs = [{
    
    "TEAM": true,
    "USER": true,
    "DIVISION": true,
    "STANDINGS": true,
    "CASTER": true,
    "MATCH": true,
    "SCHEDULEGEN": true,
    "ACL": true,
    "EVENTS": true,
    "LOGS": true,
    "__v": 0
},{
    "TEAM": false,
    "USER": false,
    "DIVISION": false,
    "STANDINGS": true,
    "CASTER": false,
    "MATCH": false,
    "SCHEDULEGEN": true,
    "ACL": true,
    "EVENTS": true,
    "LOGS": true,
    "__v": 0
}]
       
       let requestUrl = `/api/admin/user/upsertRoles`;


        let admin = await User.find();
        let adminOne = admin[0];
        let adminTwo = admin[1];


        adminobjs[0].adminId = adminOne._id;
 
        // await new AdminLevel(adminobjs[0]).save();

        const obj = {
        }

        obj.adminId = adminTwo._id;
        obj.ACL = true;

        await new AdminLevel(obj).save();

        const body = adminobjs[0];

        const token = generateNewToken.generateNewToken(utils.objectify(adminTwo), false);

        let result = await request(app.app).post(requestUrl)
        .send(body)
        .set({"Authorization": `Bearer ${token}`})
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 200);
        let returned = result.body.returnObject;
        assert(returned["ACL"] == adminobjs[0]["ACL"]);
        assert(returned["USER"] == adminobjs[0]["USER"]);
        assert(returned["SCHEDULEGEN"] == adminobjs[0]["SCHEDULEGEN"]);
        
    })

    it('api/admin/user/upsertRoles set specified new user ACL', async()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        const adminobjs = [{
    
    "TEAM": true,
    "USER": true,
    "DIVISION": true,
    "STANDINGS": true,
    "CASTER": true,
    "MATCH": true,
    "SCHEDULEGEN": true,
    "ACL": true,
    "EVENTS": true,
    "LOGS": true,
    "__v": 0
},{
    "TEAM": false,
    "USER": false,
    "DIVISION": false,
    "STANDINGS": true,
    "CASTER": false,
    "MATCH": false,
    "SCHEDULEGEN": true,
    "ACL": true,
    "EVENTS": true,
    "LOGS": true,
    "__v": 0
}]
       
       let requestUrl = `/api/admin/user/upsertRoles`;


        let admin = await User.find();
        let adminOne = admin[0];
        let adminTwo = admin[1];


        adminobjs[0].adminId = adminOne._id;
 
        await new AdminLevel(adminobjs[0]).save();

        const obj = {
        }

        obj.adminId = adminTwo._id;
        obj.ACL = true;

        await new AdminLevel(obj).save();

        const body = {
            adminId: adminobjs[0].adminId,
            "LOGS":false,
            "EVENTS":true,
            "USER":false
        }

        const token = generateNewToken.generateNewToken(utils.objectify(adminTwo), false);

        let result = await request(app.app).post(requestUrl)
        .send(body)
        .set({"Authorization": `Bearer ${token}`})
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 200);
        let returned = result.body.returnObject;
        assert(returned["LOGS"] == body["LOGS"]);
        assert(returned["EVENTS"] == body["EVENTS"]);
        assert(returned["USER"] == body["USER"]);
        
    })

    it('api/admin/user/upsertRoles fails without permission', async()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        const adminobjs = [{
    
    "TEAM": true,
    "USER": true,
    "DIVISION": true,
    "STANDINGS": true,
    "CASTER": true,
    "MATCH": true,
    "SCHEDULEGEN": true,
    "ACL": true,
    "EVENTS": true,
    "LOGS": true,
    "__v": 0
},{
    "TEAM": false,
    "USER": false,
    "DIVISION": false,
    "STANDINGS": true,
    "CASTER": false,
    "MATCH": false,
    "SCHEDULEGEN": true,
    "ACL": true,
    "EVENTS": true,
    "LOGS": true,
    "__v": 0
}]
       
       let requestUrl = `/api/admin/user/upsertRoles`;


        let admin = await User.find();
        let adminOne = admin[0];
        let adminTwo = admin[1];


        adminobjs[0].adminId = adminOne._id;
 
        await new AdminLevel(adminobjs[0]).save();

        const obj = {
        }

        obj.adminId = adminTwo._id;
        obj.USER = true;

        await new AdminLevel(obj).save();

        const body = {
            adminId: adminobjs[0].adminId,
            "LOGS":false,
            "EVENTS":true,
            "USER":false
        }

        const token = generateNewToken.generateNewToken(utils.objectify(adminTwo), false);

        let result = await request(app.app).post(requestUrl)
        .send(body)
        .set({"Authorization": `Bearer ${token}`})
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 403);
        
    })

})