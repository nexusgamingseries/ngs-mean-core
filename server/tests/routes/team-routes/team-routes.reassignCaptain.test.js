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

        it("/api/team/reassignCaptain good data as captain", async ()=>{

        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete);

        let testTeamName = "TEST sunshine mynah birds";
        let captain = await User.find({"displayName":"TEST azalea#9539"}).then(
            found=>{
                return found[0];
            }
        );
        const newCaptName = "TEST hyena#4375";
        const token = generateNewToken.generateNewToken(utils.objectify(captain), false);
        const payload = {
            teamName: testTeamName,
            username: newCaptName
        };

        let result = await request(app.app).post("/api/team/reassignCaptain")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status==200);

        let savedTeam = await Team.find({teamName:testTeamName}).then( r=>{return r[0];});
        let oldCaptain = await User.find({"displayName":"TEST azalea#9539"}).then(
            found=>{
                return found[0];
            }
        );

        let newCaptain = await User.find({"displayName":newCaptName}).then(
            found=>{
                return found[0];
            }
        );

        assert(savedTeam.captain == newCaptName);
        assert(oldCaptain.isCaptain==false);
        assert(newCaptain.isCaptain == true);

        
    });

     it("/api/team/reassignCaptain good data as captain user not on team", async ()=>{

        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete);

        let testTeamName = "TEST sunshine mynah birds";
        let captain = await User.find({"displayName":"TEST azalea#9539"}).then(
            found=>{
                return found[0];
            }
        );
        const newCaptName = "TEST lily#3664";
        const token = generateNewToken.generateNewToken(utils.objectify(captain), false);
        const payload = {
            teamName: testTeamName,
            username: newCaptName
        };

        let result = await request(app.app).post("/api/team/reassignCaptain")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status==400);

        let savedTeam = await Team.find({teamName:testTeamName}).then( r=>{return r[0];});
        let oldCaptain = await User.find({"displayName":"TEST azalea#9539"}).then(
            found=>{
                return found[0];
            }
        );

        let newCaptain = await User.find({"displayName":newCaptName}).then(
            found=>{
                return found[0];
            }
        );

        assert(savedTeam.captain == oldCaptain.displayName);
        assert(oldCaptain.isCaptain==true);
        assert(newCaptain.isCaptain==false||newCaptain.isCaptain==null);

        
    });

    it("/api/team/reassignCaptain as assistant captain, cant change..", async ()=>{

        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete);

        let testTeamName = "TEST sunshine mynah birds";
        let captain = await User.find({"displayName":"TEST narcissus#7376"}).then(
            found=>{
                return found[0];
            }
        );
        const newCaptName = "TEST hyena#4375";
        const token = generateNewToken.generateNewToken(utils.objectify(captain), false);
        const payload = {
            teamName: testTeamName,
            username: newCaptName
        };

        let result = await request(app.app).post("/api/team/reassignCaptain")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status==400);

        let savedTeam = await Team.find({teamName:testTeamName}).then( r=>{return r[0];});

        let oldCaptain = await User.find({"displayName":"TEST azalea#9539"}).then(
            found=>{
                return found[0];
            }
        );

        let newCaptain = await User.find({"displayName":newCaptName}).then(
            found=>{
                return found[0];
            }
        );

        assert(savedTeam.captain == oldCaptain.displayName);
        assert(oldCaptain.isCaptain==true);
        assert(newCaptain.isCaptain==false||newCaptain.isCaptain==null);

        
    });

    it("/api/team/reassignCaptain as not capt or assistant, fail", async ()=>{

        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete);

        let testTeamName = "TEST sunshine mynah birds";
        let captain = await User.find({"displayName":"TEST mountain goat#1399"}).then(
            found=>{
                return found[0];
            }
        );
        const newCaptName = "TEST hyena#4375";
        const token = generateNewToken.generateNewToken(utils.objectify(captain), false);
        const payload = {
            teamName: testTeamName,
            username: newCaptName
        };

        let result = await request(app.app).post("/api/team/reassignCaptain")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status==403);

        let savedTeam = await Team.find({teamName:testTeamName}).then( r=>{return r[0];});
        
        let oldCaptain = await User.find({"displayName":"TEST azalea#9539"}).then(
            found=>{
                return found[0];
            }
        );

        let newCaptain = await User.find({"displayName":newCaptName}).then(
            found=>{
                return found[0];
            }
        );

        assert(savedTeam.captain == oldCaptain.displayName);
        assert(oldCaptain.isCaptain==true);
        assert(newCaptain.isCaptain==false||newCaptain.isCaptain==null);

        
    });

});

after(()=>{
    app.server.close();
})