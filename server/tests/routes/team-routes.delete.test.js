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

        it("/api/team/delete good data", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete); 
        let team = await Team.find({}).then(
            found=>{
                return found[0];
            }
        );
        let captain = await User.find({"displayName":team.captain}).then(
            found=>{
                return found[0];
            }
        )
        const token = generateNewToken.generateNewToken(utils.objectify(captain), false);
        const payload = {
            teamName: team.teamName
        }
        let result = await request(app.app).post("/api/team/delete")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        let testTeam = await Team.find({});
        assert(testTeam.length==0);
        let users = await User.find({});
        let division = await Division.find({displayName:team.divisionDisplayName});
        users.forEach(user=>{
            let iterator = utils.objectify(user);
            assert(utils.returnBoolByPath(iterator, 'teamName')==false);
            assert(utils.returnBoolByPath(iterator,"teamId")==false);
            assert(utils.returnBoolByPath(iterator,'isCaptain')==false);
            let pendingTeam = utils.returnBoolByPath(iterator,'pendingTeam') ? utils.returnByPath(iterator,'pendingTeam'):utils.returnBoolByPath(iterator,'pendingTeam');
            assert(pendingTeam==false);
        });
        let oldTeamNameGone = division[0].teams.indexOf(team.teamName)==-1;
        assert(oldTeamNameGone == true);
        let newTeamName = division[0].teams.indexOf(`${team.teamName} (withdrawn)`)>-1;
        assert(newTeamName==true);
    });

           it("/api/team/delete bad team name, 400", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete); 
        let team = await Team.find({}).then(
            found=>{
                return found[0];
            }
        );
        let captain = await User.find({"displayName":team.captain}).then(
            found=>{
                return found[0];
            }
        )
        const token = generateNewToken.generateNewToken(utils.objectify(captain), false);
        const payload = {
            teamName: "doesn't exist"
        }
        let result = await request(app.app).post("/api/team/delete")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        assert(result.body.message=="Team not found.");
        assert(result.status == 400);
    });

               it("/api/team/delete bad captain user, 400", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete); 
        let team = await Team.find({}).then(
            found=>{
                return found[0];
            }
        );
        let captain = await User.find({"isCaptain":{$ne:true}}).then(
            found=>{
                return found[0];
            }
        )
        const token = generateNewToken.generateNewToken(utils.objectify(captain), false);
        const payload = {
            teamName: team.teamName
        }
        let result = await request(app.app).post("/api/team/delete")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        assert(result.body.message=="User not authorized to change team.");
        assert(result.status == 403);
    });

});

after(()=>{
    app.server.close();
})