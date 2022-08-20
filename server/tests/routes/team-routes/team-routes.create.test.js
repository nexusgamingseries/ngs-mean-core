const mocha = require('mocha');
const chai = require('chai');
const request = require('supertest');
const assert = require('assert');
const mongoUnit = require('mongo-unit');
const dataForTeamDelete = require('../mock-data/dataForTeamDelete.json');
const utils = require('../../utils');
const _ = require('lodash');

const Team = require('../../models/team-models');
const User = require('../../models/user-models');
const Division = require('../../models/division-models');

const mongoose = require('mongoose');

const loadConfig = require('/Users/leegrisham/Documents/workspace_personal/ngs_mean_core/loadConfig');
let app;
let generateNewToken;

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

        it("/api/team/create good data", async ()=>{
            let testTeamName = "super test team";
        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete); 
        let user = await User.find({"displayName":"TEST lily#3664"}).then(
            found=>{
                return found[0];
            }
        )
        const token = generateNewToken.generateNewToken(utils.objectify(user), false);
        const payload = {
            teamName: testTeamName,

        }
        let result = await request(app.app).post("/api/team/create")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        assert(result.status==200);
        let testTeam = await Team.find({teamName:testTeamName});
        assert(testTeam.length>0);
        assert(testTeam[0].captain == user.displayName);
        let postSaveUser = await User.find({"displayName":"TEST lily#3664"}).then(
            found=>{
                return found[0];
            }
        );
        assert(postSaveUser.isCaptain);
        assert(postSaveUser.teamName == testTeamName);
        assert(postSaveUser.teamId == testTeam[0]._id);
    });

            it("/api/team/create user all ready on team", async ()=>{
            let testTeamName = "super test team";
        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete); 
        let user = await User.find({teamName:{$exists:true}}).then(
            found=>{
                return found[0];
            }
        )
        const token = generateNewToken.generateNewToken(utils.objectify(user), false);
        const payload = {
            teamName: testTeamName,

        }
        let result = await request(app.app).post("/api/team/create")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        assert(result.status==400);
    });

                it("/api/team/create team all ready exists", async ()=>{
            
        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete); 
        let team = await Team.find({}).then(found=>{
            return found[0];
        })
        let user = await User.find({"displayName":"TEST lily#3664"}).then(
            found=>{
                return found[0];
            }
        )
        const token = generateNewToken.generateNewToken(utils.objectify(user), false);
        const payload = {
            teamName: team.teamName,

        }
        let result = await request(app.app).post("/api/team/create")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        assert(result.status==500);
    });


});

after(()=>{
    app.server.close();
})