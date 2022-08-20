const mocha = require('mocha');
const chai = require('chai');
const request = require('supertest');
const assert = require('assert');
const mongoUnit = require('mongo-unit');
const dataForTeamDelete = require('../mock-data/dataForTeamDelete.json');
const utils = require('../../utils');
const _ = require('lodash');
const sinon = require('sinon');
const axios = require('axios');
const s3putObject = require('../../methods/aws-s3/put-s3-file');
const s3deleteFile = require('../../methods/aws-s3/delete-s3-file');
const Team = require('../../models/team-models');
const User = require('../../models/user-models');
const Division = require('../../models/division-models');
const Admin = require('../../models/admin-models');

const mongoose = require('mongoose');

const loadConfig = require('/Users/leegrisham/Documents/workspace_personal/ngs_mean_core/loadConfig');
const { AdminLevel } = require('../../models/admin-models');
let app;
let generateNewToken;

//TODO: fix the errors thrown by the rank finder... 
const expectedResponse = {data:{"hello!":{}}};

before(() =>{
    
    return loadConfig().then(
    res=>{
        generateNewToken = require('../../configs/passport-setup');
       return mongoUnit.start().then(() => {
        console.log('fake mongo is started: ', mongoUnit.getUrl())
        process.env.mongoURI = mongoUnit.getUrl() // this var process.env.DATABASE_URL = will keep link to fake mongo
        app = require('../../../server');
        // mocha.run() // this line start mocha tests
        });
    });
})

describe("team-routes",()=>{

        it("/api/team/questionnaire good data as captain", async ()=>{

        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete);

        let testTeam = await Team.find({}).then(r=>{return r[0]});
        let captain = await User.find({"displayName":"TEST azalea#9539"}).then(
            found=>{
                return found[0];
            }
        );
        
        const token = generateNewToken.generateNewToken(utils.objectify(captain), false);

        let result = await request(app.app).get(`/api/team/questionnaire?teamId=${testTeam._id}`)
        .set({"Authorization": `Bearer ${token}`})
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        
        assert(Object.keys(result.body).length>0);
        assert(result.status==200);
        
    });

     it("/api/team/questionnaire good data as assisstant captain", async ()=>{

        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete);

        let testTeam = await Team.find({}).then(r=>{return r[0]});
        let captain = await User.find({"displayName":"TEST narcissus#7376"}).then(
            found=>{
                return found[0];
            }
        );
        
        const token = generateNewToken.generateNewToken(utils.objectify(captain), false);

        let result = await request(app.app).get(`/api/team/questionnaire?teamId=${testTeam._id}`)
        .set({"Authorization": `Bearer ${token}`})
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        
        assert(Object.keys(result.body).length>0);
        assert(result.status==200);
        
    });

    it("/api/team/questionnaire no data as non-captain", async ()=>{

        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete);

        let testTeam = await Team.find({}).then(r=>{return r[0]});
        let captain = await User.find({"displayName":"TEST hyena#4375"}).then(
            found=>{
                return found[0];
            }
        );
        
        const token = generateNewToken.generateNewToken(utils.objectify(captain), false);

        let result = await request(app.app).get(`/api/team/questionnaire?teamId=${testTeam._id}`)
        .set({"Authorization": `Bearer ${token}`})
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        assert(Object.keys(result.body).length>0);
        assert(result.status==403);
        
    });

     it("/api/team/questionnaire data as admin", async ()=>{

        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete);

        let testTeam = await Team.find({}).then(r=>{return r[0]});
        let captain = await User.find({"displayName":"TEST hyena#4375"}).then(
            found=>{
                return found[0];
            }
        );

        const obj = {};

        obj.adminId = captain._id;
        obj.TEAM = true;

        await new Admin.AdminLevel(obj).save();
        
        const token = generateNewToken.generateNewToken(utils.objectify(captain), {TEAM:true});

        let result = await request(app.app).get(`/api/team/questionnaire?teamId=${testTeam._id}`)
        .set({"Authorization": `Bearer ${token}`})
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        // console.log(result);
        assert(Object.keys(result.body).length>0);
        assert(result.status==200);
        
    });

         it("/api/team/questionnaire/save fail on unauthorized", async ()=>{

        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete);

        let testTeam = await Team.find({}).then(r=>{return r[0]});
        let captain = await User.find({"displayName":"TEST hyena#4375"}).then(
            found=>{
                return found[0];
            }
        );

        const obj = {};

        obj.adminId = captain._id;
        obj.TEAM = true;

        await new Admin.AdminLevel(obj).save();

        let testVal = "Bouncy Castles";
        testTeam.questionnaire.oldTeam = testVal; 
        
        const token = generateNewToken.generateNewToken(utils.objectify(captain), {TEAM:true});

        let result = await request(app.app).post(`/api/team/questionnaire/save`)
        .set({"Authorization": `Bearer ${token}`})
        .send(testTeam)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(Object.keys(result.body).length>0);
        assert(result.status==403);
        
    });

     it("/api/team/questionnaire/save from captain", async ()=>{

        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete);

        let testTeam = await Team.find({}).lean().then(r=>{return r[0]});
        let captain = await User.find({"displayName":"TEST azalea#9539"}).then(
            found=>{
                return found[0];
            }
        );

        const obj = {};

        obj.adminId = captain._id;
        obj.TEAM = true;

        let testVal = "Bouncy Castles";
        testTeam.questionnaire.oldTeam = testVal; 
        
        const token = generateNewToken.generateNewToken(utils.objectify(captain), false);

        let result = await request(app.app).post(`/api/team/questionnaire/save`)
        .set({"Authorization": `Bearer ${token}`})
        .send(testTeam)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(Object.keys(result.body).length>0);
        assert(result.body.returnObject.questionnaire.oldTeam == testVal);
        assert(result.status==200);
        
    });

         it("/api/team/questionnaire/save from captain", async ()=>{

        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete);

        let testTeam = await Team.find({}).lean().then(r=>{return r[0]});
        let captain = await User.find({"displayName":"TEST narcissus#7376"}).then(
            found=>{
                return found[0];
            }
        );

        const obj = {};

        obj.adminId = captain._id;
        obj.TEAM = true;

        let testVal = "Bouncy Castles";
        testTeam.questionnaire.oldTeam = testVal; 
        
        const token = generateNewToken.generateNewToken(utils.objectify(captain), false);

        let result = await request(app.app).post(`/api/team/questionnaire/save`)
        .set({"Authorization": `Bearer ${token}`})
        .send(testTeam)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(Object.keys(result.body).length>0);
        assert(result.body.returnObject.questionnaire.oldTeam == testVal);
        assert(result.status==200);
        
    });

});

after(()=>{
    app.server.close();
})