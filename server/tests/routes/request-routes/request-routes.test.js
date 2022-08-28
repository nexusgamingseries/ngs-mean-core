const mocha = require('mocha');
const chai = require('chai');
const request = require('supertest');
const assert = require('assert');
const mongoUnit = require('mongo-unit');
const mockData = require('../../mock-data/dataForTeamDelete.json');
const utils = require('../../../utils');
const _ = require('lodash');
const SeasonInfoCommon = require('../../../methods/seasonInfoMethods');
const User = require('../../../models/user-models');
const Team = require('../../../models/team-models');
const Message = require('../../../models/message-models');
const Admin = require('../../../models/admin-models');


const loadConfig = require('/Users/leegrisham/Documents/workspace_personal/ngs_mean_core/loadConfig');
const message = require('../../../subroutines/message-subs');
let app;
let generateNewToken;


before(() =>{
    return loadConfig().then(
    res=>{
       return mongoUnit.start().then(() => {
        generateNewToken = require('../../../configs/passport-setup');
        console.log('fake mongo is started: ', mongoUnit.getUrl())
        process.env.mongoURI = mongoUnit.getUrl() // this var process.env.DATABASE_URL = will keep link to fake mongo
        app = require('../../../../server');
        // mocha.run() // this line start mocha tests
        });
    });
})

describe("team-routes",()=>{

    /**
     * User requests to join a team, Message is sent to captain for them to respond.
     */
        it("/api/request/team/join user request to join team", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
        let teams = await Team.find();
        teams = teams[0];
        let user = await User.find({displayName:"TEST lily#3664"});
        user = user[0];
        const payload = {
            teamName:teams.teamName
        };
        const token = generateNewToken.generateNewToken(utils.objectify(user));
        let result = await request(app.app).post("/api/request/team/join")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        
        assert(result.status==200);

        let captain = await User.find({displayName:teams.captain});
        captain=captain[0];
        let id = captain._id.toString();

        let subRoutine = new Promise(resolve=>{
            setTimeout(
                async()=>{

                    let messages = await Message.find({recipient:id}).lean();
                    resolve(messages);
                }        
                ,500
            )
        });

        let messages = await subRoutine.then(r=>{return r;});
        assert(messages.length>0);
        let message = _.find(utils.objectify(messages), {recipient:id, sender:user._id.toString()});
        assert(message != null);
        
    });

    it("/api/request/team/join user request to join team, captain data not found", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
        let teams = await Team.find();
        teams = teams[0];
        teams.captain=null;
        await teams.save();
        let user = await User.find({displayName:"TEST lily#3664"});
        user = user[0];
        const payload = {
            teamName:teams.teamName
        };
        const token = generateNewToken.generateNewToken(utils.objectify(user));
        let result = await request(app.app).post("/api/request/team/join")
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

        it("/api/request/team/join user request to join team, team data not found", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
        let teams = await Team.find();
        teams = teams[0];
        teams.captain=null;
        await teams.save();
        let user = await User.find({displayName:"TEST lily#3664"});
        user = user[0];
        const payload = {
            teamName:"wiggle worms"
        };
        const token = generateNewToken.generateNewToken(utils.objectify(user));
        let result = await request(app.app).post("/api/request/team/join")
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

    /**
     * Captain responds to request to join, if accepted the user is added to the pending team members...
     */

     it("/api/request/team/join/response accept request to join team", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        //prime the test with a user making request to join..
        let teams = await Team.find();
        teams = teams[0];
        let user = await User.find({displayName:"TEST lily#3664"});
        user = user[0];
        const payload = {
            teamName:teams.teamName
        };
        const token = generateNewToken.generateNewToken(utils.objectify(user));
        let result = await request(app.app).post("/api/request/team/join")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        
        let captain = await User.find({displayName:teams.captain});
        captain = captain[0];
        let subRoutine = new Promise(resolve=>{
            setTimeout(
                async()=>{
                    let messages = await Message.find({recipient:captain._id.toString()}).lean();
                    resolve(messages);
                }        
                ,500
            )
        });
        

        let message = await subRoutine.then(r=>{return r;});
        message=message[0];
        

        const acceptPayload={
            approval:true,
            teamName:teams.teamName,
            addMember:"TEST lily#3664",
            messageId:message._id.toString(),
        }
        

        const captainToken = generateNewToken.generateNewToken(utils.objectify(captain));
        let joinResult = await request(app.app).post("/api/request/team/join/response")
        .set({"Authorization": `Bearer ${captainToken}`})
        .send(acceptPayload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status==200);
        assert(joinResult.status == 200);

        let teamafter = await Team.find();
        teamafter = teamafter[0];

        let subroutine2 = new Promise(resolve=>{
            setTimeout(async()=>{
                let userafter = await User.find({displayName:"TEST lily#3664"});
                userafter = userafter[0];
                let queue = await Admin.PendingQueue.find();
                resolve({queue,userafter})
            },1000)
        })

        const { queue, userafter } = await subroutine2.then(r=>{return r;});
        assert(userafter.pendingTeam == true);

        assert(_.findIndex(teamafter.pendingMembers, {displayName:"TEST lily#3664"})>-1);
        
    });

    it("/api/request/team/join/response decline request to join team", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        //prime the test with a user making request to join..
        let teams = await Team.find();
        teams = teams[0];
        let user = await User.find({displayName:"TEST lily#3664"});
        user = user[0];
        const payload = {
            teamName:teams.teamName
        };
        const token = generateNewToken.generateNewToken(utils.objectify(user));
        let result = await request(app.app).post("/api/request/team/join")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        
        let captain = await User.find({displayName:teams.captain});
        captain = captain[0];
        let subRoutine = new Promise(resolve=>{
            setTimeout(
                async()=>{
                    let messages = await Message.find({recipient:captain._id.toString()}).lean();
                    resolve(messages);
                }        
                ,500
            )
        });
        

        let message = await subRoutine.then(r=>{return r;});
        message=message[0];
        

        const acceptPayload={
            approval:false,
            teamName:teams.teamName,
            addMember:"TEST lily#3664",
            messageId:message._id.toString(),
        }
        

        const captainToken = generateNewToken.generateNewToken(utils.objectify(captain));
        let joinResult = await request(app.app).post("/api/request/team/join/response")
        .set({"Authorization": `Bearer ${captainToken}`})
        .send(acceptPayload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status==200);
        assert(joinResult.status == 200);

        let teamafter = await Team.find();
        teamafter = teamafter[0];

        let subroutine2 = new Promise(resolve=>{
            setTimeout(async()=>{
                let userafter = await User.find({displayName:"TEST lily#3664"});
                userafter = userafter[0];
                let queue = await Admin.PendingQueue.find();
                resolve({queue,userafter})
            },1000)
        });

        const { queue, userafter } = await subroutine2.then(r=>{return r;});

        const messageafter = await Message.find({_id:message._id});

        assert(messageafter.length==0);

        assert(userafter.pendingTeam == false || userafter.pendingTeam == null || userafter.pendingTeam == undefined);
        assert(queue.length==0);
        assert(_.findIndex(teamafter.pendingMembers, {displayName:"TEST lily#3664"})==-1);
        
    });


    /**
     * Captain invites team member to join their team:
     */
         it("/api/request/user/join invite to join team", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        //prime the test with a user making request to join..
        let teams = await Team.find();
        teams = teams[0];
        let user = await User.find({displayName:"TEST lily#3664"});
        user = user[0];
        const payload = {
            teamName:teams.teamName,
            userName:user.displayName
        };
        let captain = await User.find({displayName:teams.captain});
        captain = captain[0];
        const token = generateNewToken.generateNewToken(utils.objectify(captain));
        let result = await request(app.app).post("/api/request/user/join")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        


        let subRoutine = new Promise(resolve=>{
            setTimeout(
                async()=>{
                    let messages = await Message.find({recipient:user._id.toString()}).lean();
                    resolve(messages);
                }        
                ,600
            )
        });
        

        let message = await subRoutine.then(r=>{return r;});
        // message=message[0];
        let teamAfter = await Team.find();
        teamAfter=teamAfter[0];
        assert(result.status=200);
        assert(teamAfter.invitedUsers.indexOf(user.displayName)>-1);       
        assert(message.length==1);
        
    });

    /**
     * User accepts captain invite..
     */
         it("/api/request/user/join/response invite to join team", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        //prime the test with a user making request to join..
        let teams = await Team.find();
        teams = teams[0];
        let user = await User.find({displayName:"TEST lily#3664"});
        user = user[0];
        const payload = {
            teamName:teams.teamName,
            userName:user.displayName
        };
        let captain = await User.find({displayName:teams.captain});
        captain = captain[0];
        const token = generateNewToken.generateNewToken(utils.objectify(captain));
        let result = await request(app.app).post("/api/request/user/join")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        


        let subRoutine = new Promise(resolve=>{
            setTimeout(
                async()=>{
                    let messages = await Message.find({recipient:user._id.toString()}).lean();
                    resolve(messages);
                }        
                ,600
            )
        });
        

        let message = await subRoutine.then(r=>{return r;});
        
        let teamAfter = await Team.find();
        teamAfter=teamAfter[0];
        assert(result.status=200);
        assert(teamAfter.invitedUsers.indexOf(user.displayName)>-1);       
        assert(message.length==1);

        message=message[0];

        const replyPayload = {
            teamName:teams.teamName,
            addMember:user.displayName,
            messageId:message._id,
            approval:true
        }
        
        let userToken = generateNewToken.generateNewToken(utils.objectify(user));
        let acceptResult = await request(app.app).post("/api/request/user/join/response")
        .set({"Authorization": `Bearer ${userToken}`})
        .send(replyPayload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(acceptResult.status == 200);

        teamAfter = await Team.find();
        teamAfter = teamAfter[0];

        assert(_.findIndex(teamAfter.get("pendingMembers"),{displayName:user.displayName}) > -1);

        let userAfter = await User.find({displayName:"TEST lily#3664"});
        userAfter = userAfter[0];

        assert(userAfter.pendingTeam==true);

    });

});

after(()=>{
    app.server.close();
})