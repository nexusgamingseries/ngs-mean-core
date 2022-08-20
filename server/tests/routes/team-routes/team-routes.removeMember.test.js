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

const Team = require('../../models/team-models');
const User = require('../../models/user-models');
const Division = require('../../models/division-models');
const Admin = require('../../models/admin-models');

const mongoose = require('mongoose');

const loadConfig = require('/Users/leegrisham/Documents/workspace_personal/ngs_mean_core/loadConfig');
let app;
let generateNewToken;

//TODO: fix the errors thrown by the rank finder... 

before(() =>{
    const expectedResponse = {data:{"hello!":{}}};
    const res = sinon.spy();
    const aStub = sinon.stub(axios, "get").resolves(Promise.resolve(expectedResponse));
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

        it("/api/team/removeMember good data as captain,  cleans up assistant captain rank", async ()=>{

            let testTeamName = "TEST sunshine mynah birds";
        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete); 
        let captain = await User.find({"displayName":"TEST azalea#9539"}).then(
            found=>{
                return found[0];
            }
        );
        let userToRemove = "TEST narcissus#7376";
        const token = generateNewToken.generateNewToken(utils.objectify(captain), false);
        const payload = {
            teamName: testTeamName,
            remove: userToRemove

        }
        let result = await request(app.app).post("/api/team/removeMember")
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
        let isPendingMember = _.findIndex(testTeamObj.teamMembers,{displayName:userToRemove})==-1;
        assert(isPendingMember==true);
        assert(testTeamObj.assistantCaptain.length==0);
        let userPostSave = await User.find({"displayName":userToRemove}).then(
            found=>{
                return found[0];
            }
        );
        assert(userPostSave.isCaptain==null);
        assert(userPostSave.teamId==null);
        assert(userPostSave.teamName==null);
        
    });

     it("/api/team/removeMember good data as assistant captain,", async ()=>{

            let testTeamName = "TEST sunshine mynah birds";
        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete); 
        let captain = await User.find({"displayName":"TEST narcissus#7376"}).then(
            found=>{
                return found[0];
            }
        );
        let userToRemove = "TEST hyena#4375";
        const token = generateNewToken.generateNewToken(utils.objectify(captain), false);
        const payload = {
            teamName: testTeamName,
            remove: userToRemove

        }
        let result = await request(app.app).post("/api/team/removeMember")
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
        let teamMemberRemoved = _.findIndex(testTeamObj.teamMembers,{displayName:userToRemove})==-1;
        assert(teamMemberRemoved==true);

        let userPostSave = await User.find({"displayName":userToRemove}).then(
            found=>{
                return found[0];
            }
        );
        assert(userPostSave.isCaptain==null);
        assert(userPostSave.teamId==null);
        assert(userPostSave.teamName==null);
        
    });

     it("/api/team/removeMember assistant captain self remove", async ()=>{
            let testTeamName = "TEST sunshine mynah birds";
        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete); 
        let captain = await User.find({"displayName":"TEST narcissus#7376"}).then(
            found=>{
                return found[0];
            }
        );
        let userToRemove = "TEST narcissus#7376";
        const token = generateNewToken.generateNewToken(utils.objectify(captain), false);
        const payload = {
            teamName: testTeamName,
            remove: userToRemove

        }
        let result = await request(app.app).post("/api/team/removeMember")
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
        let teamMemberRemoved = _.findIndex(testTeamObj.teamMembers,{displayName:userToRemove})==-1;
        assert(teamMemberRemoved==true);

        let userPostSave = await User.find({"displayName":userToRemove}).then(
            found=>{
                return found[0];
            }
        );
        assert(userPostSave.isCaptain==null);
        assert(userPostSave.teamId==null);
        assert(userPostSave.teamName==null);
        
    });

    it("/api/team/removeMember good data non-captain, non-ac self removal", async ()=>{

            let testTeamName = "TEST sunshine mynah birds";
        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete); 
        let captain = await User.find({"displayName":"TEST hyena#4375"}).then(
            found=>{
                return found[0];
            }
        );
        let userToRemove = "TEST hyena#4375";
        const token = generateNewToken.generateNewToken(utils.objectify(captain), false);
        const payload = {
            teamName: testTeamName,
            remove: userToRemove

        }
        let result = await request(app.app).post("/api/team/removeMember")
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
        let teamMemberRemoved = _.findIndex(testTeamObj.teamMembers,{displayName:userToRemove})==-1;
        assert(teamMemberRemoved==true);

        let userPostSave = await User.find({"displayName":userToRemove}).then(
            found=>{
                return found[0];
            }
        );
        assert(userPostSave.isCaptain==null);
        assert(userPostSave.teamId==null);
        assert(userPostSave.teamName==null);
        })

    it("/api/team/removeMember good data non-captain, non-ac removal", async ()=>{

            let testTeamName = "TEST sunshine mynah birds";
        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete); 
        let captain = await User.find({"displayName":"TEST hyena#4375"}).then(
            found=>{
                return found[0];
            }
        );
        let userToRemove = "TEST mountain goat#1399";
        const token = generateNewToken.generateNewToken(utils.objectify(captain), false);
        const payload = {
            teamName: testTeamName,
            remove: userToRemove

        }
        let result = await request(app.app).post("/api/team/removeMember")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        assert(result.status==403);
        let testTeam = await Team.find({teamName:testTeamName}).then(found=>{return found[0]});
        let testTeamObj = utils.objectify(testTeam);
        let teamMemberRemoved = _.findIndex(testTeamObj.teamMembers,{displayName:userToRemove})>-1;
        assert(teamMemberRemoved);

        let userPostSave = await User.find({"displayName":userToRemove}).then(
            found=>{
                return found[0];
            }
        );

        assert(userPostSave.isCaptain==null);
        //TODO: may can make this more robust if we can replace bad IDs in test data.
        // console.log(userPostSave.teamId, " ---- ", testTeam._id);
        // assert(userPostSave.teamId==testTeam._id.toString());
        assert(userPostSave.teamName==testTeam.teamName);
        
    });

     it("/api/team/removeMember good data non-captain, non-ac removal", async ()=>{
            let testTeamName = "TEST BIG BIRDS";
        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete); 
        let captain = await User.find({"displayName":"TEST hyena#4375"}).then(
            found=>{
                return found[0];
            }
        );
        let userToRemove = "TEST mountain goat#1399";
        const token = generateNewToken.generateNewToken(utils.objectify(captain), false);
        const payload = {
            teamName: testTeamName,
            remove: userToRemove

        }
        let result = await request(app.app).post("/api/team/removeMember")
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

    it("/api/team/removeMember good data captain, remove self", async ()=>{
            let testTeamName = "TEST sunshine mynah birds";
        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete); 
        let captain = await User.find({"displayName":"TEST azalea#9539"}).then(
            found=>{
                return found[0];
            }
        );
        let userToRemove = "TEST azalea#9539";
        const token = generateNewToken.generateNewToken(utils.objectify(captain), false);
        const payload = {
            teamName: testTeamName,
            remove: userToRemove

        }
        let result = await request(app.app).post("/api/team/removeMember")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        assert(result.status==400);
        assert(result.body.message.toLowerCase().indexOf("can not remove team captain")>-1);
        
    });


});

after(()=>{
    app.server.close();
})