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
const Admin = require('../../models/admin-models');

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

        it("/api/team/addMember good data", async ()=>{
            let testTeamName = "TEST sunshine mynah birds";
        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete); 
        let captain = await User.find({"displayName":"TEST azalea#9539"}).then(
            found=>{
                return found[0];
            }
        );
        let userToAdd = "TEST lily#3664";
        const token = generateNewToken.generateNewToken(utils.objectify(captain), false);
        const payload = {
            teamName: testTeamName,
            addMember: userToAdd

        }
        let result = await request(app.app).post("/api/team/addMember")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        assert(result.status==200);
        let testTeam = await Team.find({teamName:testTeamName}).then(found=>{return found[0]});
        let testTeamObj = utils.objectify(testTeam);
        let isPendingMember = !!(_.find(testTeamObj.pendingMembers,{displayName:userToAdd}));
        assert(isPendingMember==true);
        let userPostSave = await User.find({"displayName":userToAdd}).then(
            found=>{
                return found[0];
            }
        );
        assert(userPostSave.pendingTeam==true);
        let queue = await Admin.PendingQueue.find({teamName:testTeamName.toLowerCase()});
        assert(queue.length>0);
        
    });

    it('/api/team/addMember bad team name data', async ()=>{
            let testTeamName = "supastas";
        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete); 
        let captain = await User.find({"displayName":"TEST azalea#9539"}).then(
            found=>{
                return found[0];
            }
        );
        let userToAdd = "TEST lily#3664";
        const token = generateNewToken.generateNewToken(utils.objectify(captain), false);
        const payload = {
            teamName: testTeamName,
            addMember: userToAdd

        }
        let result = await request(app.app).post("/api/team/addMember")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload);
        
        assert(result.status == 400);
        
    });

        it('/api/team/addMember not captain', async ()=>{
            let testTeamName = "TEST sunshine mynah birds";
        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete); 
        let captain = await User.find({"displayName":"TEST hyena#4375"}).then(
            found=>{
                return found[0];
            }
        );
        let userToAdd = "TEST lily#3664";
        const token = generateNewToken.generateNewToken(utils.objectify(captain), false);
        const payload = {
            teamName: testTeamName,
            addMember: userToAdd

        }
        let result = await request(app.app).post("/api/team/addMember")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload);
        assert(result.status == 403);
        
    });

            it('/api/team/addMember memberToAdd was all ready pending team...', async ()=>{
            let testTeamName = "TEST sunshine mynah birds";
        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete); 
        let captain = await User.find({"displayName":"TEST azalea#9539"}).then(
            found=>{
                return found[0];
            }
        );
        let team = await Team.find({}).then(
            res=>{
                return res[0];
            }
        );
        let userToAdd = await User.find({displayName:"TEST lily#3664"}).then(res=>{return res[0]});
        team.pendingMembers = [{displayName:userToAdd.displayName, id:userToAdd._id}];
        await team.save();
        const token = generateNewToken.generateNewToken(utils.objectify(captain), false);
        const payload = {
            teamName: testTeamName,
            addMember: userToAdd.displayName

        }
        let result = await request(app.app).post("/api/team/addMember")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload);
        assert(result.status == 403);
        
    });

    it('/api/team/addMember memberToAdd was all ready on team...', async ()=>{
            let testTeamName = "TEST sunshine mynah birds";
        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete); 
        let captain = await User.find({"displayName":"TEST azalea#9539"}).then(
            found=>{
                return found[0];
            }
        );
        let userToAdd = await User.find({displayName:"TEST lily#3664"}).then(res=>{return res[0]});
        userToAdd.teamId = "someId";
        userToAdd.teamName = "some team";
        await userToAdd.save();
        const token = generateNewToken.generateNewToken(utils.objectify(captain), false);
        const payload = {
            teamName: testTeamName,
            addMember: userToAdd.displayName

        }
        let result = await request(app.app).post("/api/team/addMember")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload);
        assert(result.status == 403);
        
    });


});

after(()=>{
    app.server.close();
})