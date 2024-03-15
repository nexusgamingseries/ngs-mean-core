const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const assert = require('assert');
const mongoUnit = require('mongo-unit');
const mockData = require('../../mock-data/standingsData.json');
const utils = require('../../../utils');
const _ = require('lodash');
const User = require('../../../models/user-models');
const Team = require('../../../models/team-models');
const Admin = require('../../../models/admin-models');
const sinon = require('sinon');
const playerRanksMethods = require('../../../methods/player-ranks/playerRankMethods');
const TeamSubs = require('../../../subroutines/team-subs');
const s3putObject = require('../../../methods/aws-s3/put-s3-file');
const Matches = require('../../../models/match-model');

const { AdminLevel, PendingQueue } = require('../../../models/admin-models');


const loadConfig = require('/Users/leegrisham/Documents/workspace_personal/ngs_mean_core/loadConfig');
let app 
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

describe("admin-team-routes",async function(){

//     it('api/admin/pendingMemberQueue return pending member queue',async function(){
        
//         await mongoUnit.dropDb();
//         await mongoUnit.load(mockData); 
       
//         let requestUrl = `/api/admin/pendingMemberQueue`;

//         let admin = await User.find({"displayName": "TEST azalea#9539"});
//         admin = admin[0];

//         const obj = {};

//         obj.adminId = admin._id;
//         obj.TEAM = true;
 
//         await new AdminLevel(obj).save();

//        const pqo = {
//             "teamId": "0987654321",
//             "teamName": "testbois",
//             "userId": "1234567890",
//             "userName": "hullaBalloo",
//             "timestamp": Date.now(),
// }

//         await new Admin.PendingQueue(pqo).save();

//         const token = generateNewToken.generateNewToken(utils.objectify(admin), false);

//         let result = await request(app.app).get(requestUrl)
//         .set({"Authorization": `Bearer ${token}`})
//         .then((res)=>{
//             return res;
//         },
//         (err)=>{
//             throw err;
//         });

//         assert(result.status === 200);
//         assert(result.body.returnObject.length>0);

//     });

//     it('api/admin/pendingMemberQueue fails without access',async function(){
        
//         await mongoUnit.dropDb();
//         await mongoUnit.load(mockData); 
       
//         let requestUrl = `/api/admin/pendingMemberQueue`;

//         let admin = await User.find({"displayName": "TEST azalea#9539"});
//         admin = admin[0];

//         const obj = {};

//         obj.adminId = admin._id;
//         obj.Event = true;
 
//         await new AdminLevel(obj).save();

//        const pqo = {
//             "teamId": "0987654321",
//             "teamName": "testbois",
//             "userId": "1234567890",
//             "userName": "hullaBalloo",
//             "timestamp": Date.now(),
// }

//         await new Admin.PendingQueue(pqo).save();

//         const token = generateNewToken.generateNewToken(utils.objectify(admin), false);

//         let result = await request(app.app).get(requestUrl)
//         .set({"Authorization": `Bearer ${token}`})
//         .then((res)=>{
//             return res;
//         },
//         (err)=>{
//             throw err;
//         });

//         assert(result.status === 403);

//     });

//  it('api/admin/pmq/delete delete the specified queue item', async function(){
        
//         await mongoUnit.dropDb();
//         await mongoUnit.load(mockData); 

//         let admin = await User.find({"displayName": "TEST azalea#9539"});
//         admin = admin[0];

//         const obj = {};

//         obj.adminId = admin._id;
//         obj.TEAM = true;
 
//         await new AdminLevel(obj).save();

//         const pqo = {
//             "teamId": "0987654321",
//             "teamName": "testbois",
//             "userId": "1234567890",
//             "userName": "hullaBalloo",
//             "timestamp": Date.now(),
//         }

//         await new Admin.PendingQueue(pqo).save();

//         const token = generateNewToken.generateNewToken(utils.objectify(admin), false);

//         // Send the request to delete the queue item
//         const requestUrl = `/api/admin/pmq/delete`;
//         const result = await request(app.app).post(requestUrl)
//             .set({"Authorization": `Bearer ${token}`})
//             .send({ queue: pqo })
//             .then((res)=>{
//                 return res;
//             },
//             (err)=>{
//                 throw err;
//             });

//         // Ensure the response is as expected
//         assert(result.status === 200);
//         assert(result.body.message.includes('Deleted queue item'));

//         // Ensure the queue item has been deleted from the database
//         const deletedQueue = await Admin.PendingQueue.findOne({_id: pqo._id});
//         expect(deletedQueue).to.be.null;

//     });

//     it('api/admin/pmq/delete fails without access',async function(){
        
//         await mongoUnit.dropDb();
//         await mongoUnit.load(mockData); 
       
//         let requestUrl = `/api/admin/pmq/delete`;

//         let admin = await User.find({"displayName": "TEST azalea#9539"});
//         admin = admin[0];

//         const obj = {};

//         obj.adminId = admin._id;
//         obj.Event = true;
 
//         await new AdminLevel(obj).save();

//        const pqo = {
//             "teamId": "0987654321",
//             "teamName": "testbois",
//             "userId": "1234567890",
//             "userName": "hullaBalloo",
//             "timestamp": Date.now(),
// }

//         await new Admin.PendingQueue(pqo).save();

//         const token = generateNewToken.generateNewToken(utils.objectify(admin), false);

//         let result = await request(app.app).post(requestUrl)
//         .send({queue:pqo})
//         .set({"Authorization": `Bearer ${token}`})
//         .then((res)=>{
//             return res;
//         },
//         (err)=>{
//             throw err;
//         });

//         assert(result.status === 403);

//     });

    // it('api/admin/pmq/addnote add pmq note',async function(){
        
    //     await mongoUnit.dropDb();
    //     await mongoUnit.load(mockData); 
       
    //     let requestUrl = `/api/admin/pmq/addnote`;

    //     let admin = await User.find({"displayName": "TEST azalea#9539"});
    //     admin = admin[0];

    //     const obj = {};

    //     obj.adminId = admin._id;
    //     obj.TEAM = true;
 
    //     await new AdminLevel(obj).save();

    //    const pqo = {
    //         "teamId": "0987654321",
    //         "teamName": "testbois",
    //         "userId": "1234567890",
    //         "userName": "hullaBalloo",
    //         "timestamp": Date.now(),
    //     }

    //     const savedPqo = await new Admin.PendingQueue(pqo).save();

    //     const token = generateNewToken.generateNewToken(utils.objectify(admin), false);

    //     let note = "Test note";

    //     let result = await request(app.app).post(requestUrl)
    //     .set({"Authorization": `Bearer ${token}`})
    //     .send({queue:savedPqo, note:note})
    //     .then((res)=>{
    //         return res;
    //     },
    //     (err)=>{
    //         throw err;
    //     });

    //     let pendingQueue = await Admin.PendingQueue.find({"teamId": "0987654321"});
    //     assert(pendingQueue[0].notes.length>0);
    //     assert(result.status === 200);

    // });

    // it('api/admin/pmq/addnote fails without access',async function(){
        
    //     await mongoUnit.dropDb();
    //     await mongoUnit.load(mockData); 
       
    //     let requestUrl = `/api/admin/pmq/addnote`;

    //     let admin = await User.find({"displayName": "TEST azalea#9539"});
    //     admin = admin[0];

    //     const obj = {};

    //     obj.adminId = admin._id;
    //     obj.USER = true;
 
    //     await new AdminLevel(obj).save();

    //    const pqo = {
    //         "teamId": "0987654321",
    //         "teamName": "testbois",
    //         "userId": "1234567890",
    //         "userName": "hullaBalloo",
    //         "timestamp": Date.now(),
    //     }

    //     const savedPqo = await new Admin.PendingQueue(pqo).save();

    //     const token = generateNewToken.generateNewToken(utils.objectify(admin), false);

    //     let note = "Test note";

    //     let result = await request(app.app).post(requestUrl)
    //     .set({"Authorization": `Bearer ${token}`})
    //     .send({queue:savedPqo, note:note})
    //     .then((res)=>{
    //         return res;
    //     },
    //     (err)=>{
    //         throw err;
    //     });

    //     assert(result.status === 403);

    // });


    //     it('api/admin/pendingAvatarQueue return pending avatar queue',async function(){
        
    //     await mongoUnit.dropDb();
    //     await mongoUnit.load(mockData); 
       
    //     let requestUrl = `/api/admin/pendingAvatarQueue`;

    //     let admin = await User.find({"displayName": "TEST azalea#9539"});
    //     admin = admin[0];

    //     const obj = {};

    //     obj.adminId = admin._id;
    //     obj.USER = true;
 
    //     await new AdminLevel(obj).save();

    //    const pqo = {
    //         "teamId": "0987654321",
    //         "teamName": "testbois",
    //         "userId": "1234567890",
    //         "userName": "hullaBalloo",
    //         "timestamp": Date.now(),
    //     }

        

    //     await new Admin.PendingAvatarQueue(pqo).save();

    //     const token = generateNewToken.generateNewToken(utils.objectify(admin), false);

    //     let result = await request(app.app).get(requestUrl)
    //     .set({"Authorization": `Bearer ${token}`})
    //     .then((res)=>{
    //         return res;
    //     },
    //     (err)=>{
    //         throw err;
    //     });

    //     assert(result.status === 200);
    //     assert(result.body.returnObject.length>0);

    // });

    // it('api/admin/pendingAvatarQueue fails without access',async function(){
        
    //     await mongoUnit.dropDb();
    //     await mongoUnit.load(mockData); 
       
    //     let requestUrl = `/api/admin/pendingAvatarQueue`;

    //     let admin = await User.find({"displayName": "TEST azalea#9539"});
    //     admin = admin[0];

    //     const obj = {};

    //     obj.adminId = admin._id;
    //     obj.Event = true;
 
    //     await new AdminLevel(obj).save();

    //    const pqo = {
    //         "teamId": "0987654321",
    //         "teamName": "testbois",
    //         "userId": "1234567890",
    //         "userName": "hullaBalloo",
    //         "timestamp": Date.now(),
    //     }

    //     await new Admin.PendingQueue(pqo).save();

    //     const token = generateNewToken.generateNewToken(utils.objectify(admin), false);

    //     let result = await request(app.app).get(requestUrl)
    //     .set({"Authorization": `Bearer ${token}`})
    //     .then((res)=>{
    //         return res;
    //     },
    //     (err)=>{
    //         throw err;
    //     });

    //     assert(result.status === 403);

    // });

    //  it('api/admin/pendingRankQueues return pending avatar queue',async function(){
        
    //     await mongoUnit.dropDb();
    //     await mongoUnit.load(mockData); 
       
    //     let requestUrl = `/api/admin/pendingRankQueues`;

    //     let admin = await User.find({"displayName": "TEST azalea#9539"});
    //     admin = admin[0];

    //     const obj = {};

    //     obj.adminId = admin._id;
    //     obj.USER = true;
 
    //     await new AdminLevel(obj).save();

    //     const pqo = {
    //         "userId" : "60cf98a1d35aec00220b9c5d",
    //         "year" : "2022",
    //         "season" : "3",
    //         "fileName" : "60cf98a1d35aec00220b9c5d_2022_3_3407.png",
    //         "timestamp": Date.now()
    //     }

    //     const t = await new Admin.PendingRankQueue(pqo).save();

    //     const token = generateNewToken.generateNewToken(utils.objectify(admin), false);

    //     let result = await request(app.app).get(requestUrl)
    //     .set({"Authorization": `Bearer ${token}`})
    //     .then((res)=>{
    //         return res;
    //     },
    //     (err)=>{
    //         throw err;
    //     });

    //     assert(result.status === 200);
    //     assert(result.body.returnObject.length>0);

    // });

    // it('api/admin/pendingRankQueues fails without access',async function(){
        
    //     await mongoUnit.dropDb();
    //     await mongoUnit.load(mockData); 
       
    //     let requestUrl = `/api/admin/pendingRankQueues`;

    //     let admin = await User.find({"displayName": "TEST azalea#9539"});
    //     admin = admin[0];

    //     const obj = {};

    //     obj.adminId = admin._id;
    //     obj.Event = true;
 
    //     await new AdminLevel(obj).save();

    //     const pqo = {
    //         "userId" : "60cf98a1d35aec00220b9c5d",
    //         "year" : "2022",
    //         "season" : "3",
    //         "fileName" : "60cf98a1d35aec00220b9c5d_2022_3_3407.png",
    //         "timestamp": Date.now()
    //     }


    //     await new Admin.PendingQueue(pqo).save();

    //     const token = generateNewToken.generateNewToken(utils.objectify(admin), false);

    //     let result = await request(app.app).get(requestUrl)
    //     .set({"Authorization": `Bearer ${token}`})
    //     .then((res)=>{
    //         return res;
    //     },
    //     (err)=>{
    //         throw err;
    //     });

    //     assert(result.status === 403);

    // });

    //      it('api/admin/pendingRankQueuesCount return pending avatar queue',async function(){
        
    //     await mongoUnit.dropDb();
    //     await mongoUnit.load(mockData); 
       
    //     let requestUrl = `/api/admin/pendingRankQueuesCount`;

    //     let admin = await User.find({"displayName": "TEST azalea#9539"});
    //     admin = admin[0];

    //     const obj = {};

    //     obj.adminId = admin._id;
    //     obj.USER = true;
 
    //     await new AdminLevel(obj).save();

    //     const pqo = {
    //         "userId" : "60cf98a1d35aec00220b9c5d",
    //         "year" : "2022",
    //         "season" : "3",
    //         "fileName" : "60cf98a1d35aec00220b9c5d_2022_3_3407.png",
    //         "timestamp": Date.now()
    //     }

    //     const t = await new Admin.PendingRankQueue(pqo).save();

    //     const token = generateNewToken.generateNewToken(utils.objectify(admin), false);

    //     let result = await request(app.app).get(requestUrl)
    //     .set({"Authorization": `Bearer ${token}`})
    //     .then((res)=>{
    //         return res;
    //     },
    //     (err)=>{
    //         throw err;
    //     });

    //     assert(result.status === 200);
    //     assert(result.body.returnObject.queueCount>0);

    // });

    //         it('api/admin/pendingRankQueuesCount fails with no access',async function(){
        
    //     await mongoUnit.dropDb();
    //     await mongoUnit.load(mockData); 
       
    //     let requestUrl = `/api/admin/pendingRankQueuesCount`;

    //     let admin = await User.find({"displayName": "TEST azalea#9539"});
    //     admin = admin[0];

    //     const obj = {};

    //     obj.adminId = admin._id;
    //     obj.EVENT = true;
 
    //     await new AdminLevel(obj).save();

    //     const pqo = {
    //         "userId" : "60cf98a1d35aec00220b9c5d",
    //         "year" : "2022",
    //         "season" : "3",
    //         "fileName" : "60cf98a1d35aec00220b9c5d_2022_3_3407.png",
    //         "timestamp": Date.now()
    //     }

    //     const t = await new Admin.PendingRankQueue(pqo).save();

    //     const token = generateNewToken.generateNewToken(utils.objectify(admin), false);

    //     let result = await request(app.app).get(requestUrl)
    //     .set({"Authorization": `Bearer ${token}`})
    //     .then((res)=>{
    //         return res;
    //     },
    //     (err)=>{
    //         throw err;
    //     });

    //     assert(result.status === 403);
        

    // });

    // it('api/admin/team/removeMember remove member from ream',async function(){
        
    //     await mongoUnit.dropDb();
    //     await mongoUnit.load(mockData); 

    //     let mockUp = sinon.stub(playerRanksMethods, "getNgsAvgRank").resolves(11);
    //     let mockUp2 = sinon.stub(TeamSubs, "updateTeamMmrAsynch").resolves(true);
       
    //     let requestUrl = `/api/admin/team/removeMember`;

    //     let admin = await User.find({"displayName": "TEST azalea#9539"});
    //     admin = admin[0];

    //     let team = await Team.find({"teamName": "Mongoose's Team"});
    //     team = team[0];

    //     let userToAdd = await User.find({"displayName":"TEST lily#3664"});
    //     userToAdd = userToAdd[0];


    //     const addPostObj = {
    //         teamName:team.teamName,
    //         user:userToAdd.displayName
    //     };

    //     const obj = {
    //     };

    //     const removePostObj = {
    //         teamName:team.teamName,
    //         removeUser:userToAdd.displayName
    //     }

    //     obj.adminId = admin._id;
    //     obj.TEAM = true;
 
    //     await new AdminLevel(obj).save();

    //     const token = generateNewToken.generateNewToken(utils.objectify(admin), false);

    //     let addMemberUrl = '/api/admin/team/memberAdd';

    //     let addResult = await request(app.app).post(addMemberUrl)
    //     .set({"Authorization": `Bearer ${token}`})
    //     .send(addPostObj)
    //     .then(
    //         res=>{
    //             return res;
    //         },
    //         err=>{
    //             throw err;
    //         });


    //     let result = await request(app.app).post(requestUrl)
    //     .set({"Authorization": `Bearer ${token}`})
    //     .send(removePostObj)
    //     .then((res)=>{
    //         return res;
    //     },
    //     (err)=>{
    //         throw err;
    //     });

    //     assert(result.status === 200);

    //     let userAfterSave = new Promise( resolve=>{
    //         setTimeout(async()=>{
    //             let userAfterSave = await User.find({"displayName":"TEST lily#3664"});
    //             userAfterSave = userAfterSave[0];
    //             resolve(userAfterSave);
    //         },1000);
    //     })

    //     let teamAfterSave = new Promise( resolve=>{
    //         setTimeout(async()=>{
    //             let teamAfter = await Team.find({"teamName": "Mongoose's Team"});
    //             teamAfter = teamAfter[0];
    //                 let found = false;
    //             _.forEach(teamAfter.teamMembers, itr=>{
    //                 if(itr.displayName == userAfterSave.displayName){
    //                     found = true;
    //                 }
            
    //                 });
    //                 resolve(found);
    //         },1000);
    //     });

    //     let teamOk = await teamAfterSave.then(r=>{return r;});
    //     let user = await userAfterSave.then(r=>{return r;});
        
    //     assert(teamOk==false);

    //     assert(user.teamName == null);
    //     assert(user.teamId == null);

    //     // assert(result.body.returnObject);

    // });

    //   it('api/admin/team/removeMember fails with no access',async function(){
        
    //     await mongoUnit.dropDb();
    //     await mongoUnit.load(mockData); 
       
    //     let requestUrl = `/api/admin/team/removeMember`;

    //     let admin = await User.find({"displayName": "TEST azalea#9539"});
    //     admin = admin[0];

    //     let team = await Team.find({"teamName": "Mongoose's Team"});
    //     team = team[0];

    //     let userToAdd = await User.find({"displayName":"TEST lily#3664"});
    //     userToAdd = userToAdd[0];


    //     const addPostObj = {
    //         teamName:team.teamName,
    //         user:userToAdd.displayName
    //     };

    //     const obj = {
    //     };

    //     const removePostObj = {
    //         teamName:team.teamName,
    //         removeUser:userToAdd.displayName
    //     }

    //     obj.adminId = admin._id;
    //     obj.EVENT = true;
 
    //     await new AdminLevel(obj).save();

    //     const token = generateNewToken.generateNewToken(utils.objectify(admin), false);

    //     let addMemberUrl = '/api/admin/team/memberAdd';

    //     let addResult = await request(app.app).post(addMemberUrl)
    //     .set({"Authorization": `Bearer ${token}`})
    //     .send(addPostObj)
    //     .then(
    //         res=>{
    //             return res;
    //         },
    //         err=>{
    //             throw err;
    //         });


    //     let result = await request(app.app).post(requestUrl)
    //     .set({"Authorization": `Bearer ${token}`})
    //     .send(removePostObj)
    //     .then((res)=>{
    //         return res;
    //     },
    //     (err)=>{
    //         throw err;
    //     });

    //     assert(result.status === 403);        

    // });

    //     it('api/admin/team/removeInvitedMember remove invited member from ream',async function(){

    //     let mockUp = sinon.stub(playerRanksMethods, "getNgsAvgRank").resolves(11);
    //     let mockUp2 = sinon.stub(TeamSubs, "updateTeamMmrAsynch").resolves(true);
        
    //     await mongoUnit.dropDb();
    //     await mongoUnit.load(mockData); 
       
    //     let requestUrl = `/api/admin/team/removeInvitedMember`;

    //     let admin = await User.find({"displayName": "TEST azalea#9539"});
    //     admin = admin[0];

    //     let foundTeam = await Team.find({"teamName": "Mongoose's Team"});
    //     foundTeam = foundTeam[0];

    //     let userToAdd = await User.find({"displayName":"TEST lily#3664"});
    //     userToAdd = userToAdd[0];

    //     foundTeam.invitedUsers = [userToAdd.displayName];

    //     let savedTeam = await foundTeam.save();

    //     const obj = {
    //     };

    //     const removePostObj = {
    //         teamName:foundTeam.teamName,
    //         removeUser:userToAdd.displayName
    //     }

    //     obj.adminId = admin._id;
    //     obj.TEAM = true;
 
    //     await new AdminLevel(obj).save();

    //     const token = generateNewToken.generateNewToken(utils.objectify(admin), false);

    //     let result = await request(app.app).post(requestUrl)
    //     .set({"Authorization": `Bearer ${token}`})
    //     .send(removePostObj)
    //     .then((res)=>{
    //         return res;
    //     },
    //     (err)=>{
    //         throw err;
    //     });

    //     assert(result.status === 200);


    //     let teamAfterSave = new Promise( resolve=>{
    //         setTimeout(async()=>{
    //             let teamAfter = await Team.find({"teamName": "Mongoose's Team"});
    //             teamAfter = teamAfter[0];
    //                 let found = false;
    //             _.forEach(teamAfter.invitedUsers, itr=>{
    //                 if(itr == userToAdd.displayName){
    //                     found = true;
    //                 }
    //                 });
    //                 resolve(found);
    //         },1000);
    //     });

    //     let teamOk = await teamAfterSave.then(r=>{return r;});
        
    //     assert(teamOk==false);

    // });

    //  it('api/admin/team/removeInvitedMember remove invited member from team but isnt really on there',async function(){

    //     // let mockUp = sinon.stub(playerRanksMethods, "getNgsAvgRank").resolves(11);
    //     // let mockUp2 = sinon.stub(TeamSubs, "updateTeamMmrAsynch").resolves(true);
        
    //     await mongoUnit.dropDb();
    //     await mongoUnit.load(mockData); 
       
    //     let requestUrl = `/api/admin/team/removeInvitedMember`;

    //     let admin = await User.find({"displayName": "TEST azalea#9539"});
    //     admin = admin[0];

    //     let foundTeam = await Team.find({"teamName": "Mongoose's Team"});
    //     foundTeam = foundTeam[0];

    //     let userToAdd = await User.find({"displayName":"TEST lily#3664"});
    //     userToAdd = userToAdd[0];

    //     foundTeam.invitedUsers = [userToAdd.displayName];

    //     let savedTeam = await foundTeam.save();

    //     const obj = {
    //     };

    //     const removePostObj = {
    //         teamName:foundTeam.teamName,
    //         removeUser:"Bozo#1234"
    //     }

    //     obj.adminId = admin._id;
    //     obj.TEAM = true;
 
    //     await new AdminLevel(obj).save();

    //     const token = generateNewToken.generateNewToken(utils.objectify(admin), false);

    //     let result = await request(app.app).post(requestUrl)
    //     .set({"Authorization": `Bearer ${token}`})
    //     .send(removePostObj)
    //     .then((res)=>{
    //         return res;
    //     },
    //     (err)=>{
    //         throw err;
    //     });

    //     assert(result.status === 400);
    //     assert(result.body.message.indexOf("not found")>-1);


    //     let teamAfterSave = new Promise( resolve=>{
    //         setTimeout(async()=>{
    //             let teamAfter = await Team.find({"teamName": "Mongoose's Team"});
    //             teamAfter = teamAfter[0];
    //                 let found = false;
    //             _.forEach(teamAfter.invitedUsers, itr=>{
    //                 if(itr == "Bozo#1234"){
    //                     found = true;
    //                 }
    //                 });
    //                 resolve(found);
    //         },1000);
    //     });

    //     let teamOk = await teamAfterSave.then(r=>{return r;});
        
    //     assert(teamOk==false);

    // });

    // it('api/admin/team/reassignCaptain assign captain to another player on team', async function () {
    //     // let mockUp = sinon.stub(playerRanksMethods, "getNgsAvgRank").resolves(11);
    //     // let mockUp2 = sinon.stub(TeamSubs, "updateTeamMmrAsynch").resolves(true);

    //     await mongoUnit.dropDb();
    //     await mongoUnit.load(mockData);

    //     let requestUrl = `/api/admin/reassignCaptain`;

    //     let admin = await User.find({ displayName: 'TEST azalea#9539' });
    //     admin = admin[0];

    //     let foundTeam = await Team.find({ teamName: "Mongoose's Team" });
    //     foundTeam = foundTeam[0];

    //     const obj = {};
    //     const testUser = 'TEST camellias#2749';

    //     const reassignCaptain = {
    //         teamName: foundTeam.teamName,
    //         userName: testUser,
    //     };

    //     obj.adminId = admin._id;
    //     obj.TEAM = true;

    //     await new AdminLevel(obj).save();

    //     const token = generateNewToken.generateNewToken(
    //         utils.objectify(admin),
    //         false
    //     );

    //     let result = await request(app.app)
    //         .post(requestUrl)
    //         .set({ Authorization: `Bearer ${token}` })
    //         .send(reassignCaptain)
    //         .then(
    //             res => {
    //                 return res;
    //             },
    //             err => {
    //                 throw err;
    //             }
    //         );

    //         assert(result.status == 200);

    //         assert(result.body.returnObject.captain == testUser);
    // });

    // it('api/admin/team/reassignCaptain fail to find team', async function () {
    //     // let mockUp = sinon.stub(playerRanksMethods, "getNgsAvgRank").resolves(11);
    //     // let mockUp2 = sinon.stub(TeamSubs, "updateTeamMmrAsynch").resolves(true);

    //     await mongoUnit.dropDb();
    //     await mongoUnit.load(mockData);

    //     let requestUrl = `/api/admin/reassignCaptain`;

    //     let admin = await User.find({ displayName: 'TEST azalea#9539' });
    //     admin = admin[0];

    //     let foundTeam = await Team.find({ teamName: "Mongoose's Team" });
    //     foundTeam = foundTeam[0];

    //     const obj = {};
    //     const testUser = 'TEST camellias#2749';

    //     const reassignCaptain = {
    //         teamName: foundTeam.teamName+'111',
    //         userName: testUser,
    //     };

    //     obj.adminId = admin._id;
    //     obj.TEAM = true;

    //     await new AdminLevel(obj).save();

    //     const token = generateNewToken.generateNewToken(
    //         utils.objectify(admin),
    //         false
    //     );

    //     let result = await request(app.app)
    //         .post(requestUrl)
    //         .set({ Authorization: `Bearer ${token}` })
    //         .send(reassignCaptain)
    //         .then(
    //             res => {
    //                 return res;
    //             },
    //             err => {
    //                 throw err;
    //             }
    //         );
            
    //     assert(result.status == 500);
    //     assert(result.body.err != null);
    // });

    // it('api/admin/team/reassignCaptain fail to find user', async function () {
    //     // let mockUp = sinon.stub(playerRanksMethods, "getNgsAvgRank").resolves(11);
    //     // let mockUp2 = sinon.stub(TeamSubs, "updateTeamMmrAsynch").resolves(true);

    //     await mongoUnit.dropDb();
    //     await mongoUnit.load(mockData);

    //     let requestUrl = `/api/admin/reassignCaptain`;

    //     let admin = await User.find({ displayName: 'TEST azalea#9539' });
    //     admin = admin[0];

    //     let foundTeam = await Team.find({ teamName: "Mongoose's Team" });
    //     foundTeam = foundTeam[0];

    //     const obj = {};
    //     const testUser = '111TEST camellias#2749';

    //     const reassignCaptain = {
    //         teamName: foundTeam.teamName,
    //         userName: testUser,
    //     };

    //     obj.adminId = admin._id;
    //     obj.TEAM = true;

    //     await new AdminLevel(obj).save();

    //     const token = generateNewToken.generateNewToken(
    //         utils.objectify(admin),
    //         false
    //     );

    //     let result = await request(app.app)
    //         .post(requestUrl)
    //         .set({ Authorization: `Bearer ${token}` })
    //         .send(reassignCaptain)
    //         .then(
    //             res => {
    //                 return res;
    //             },
    //             err => {
    //                 throw err;
    //             }
    //         );

    //     assert(result.status == 500);
    //     assert(result.body.err != null);
    // });

        // it('api/admin/team/reassignCaptain validate reset users status and remove assistant capt', async function () {
        //     // let mockUp = sinon.stub(playerRanksMethods, "getNgsAvgRank").resolves(11);
        //     // let mockUp2 = sinon.stub(TeamSubs, "updateTeamMmrAsynch").resolves(true);

        //     await mongoUnit.dropDb();
        //     await mongoUnit.load(mockData);

        //     let requestUrl = `/api/admin/reassignCaptain`;

        //     let admin = await User.find({ displayName: 'TEST azalea#9539' });
        //     admin = admin[0];

        //     let foundTeam = await Team.find({ teamName: "Mongoose's Team" });
        //     foundTeam = foundTeam[0];

        //     let currentCaptain = foundTeam.captain;

        //     const testUser = 'TEST camellias#2749';

        //     foundTeam.assistantCaptain.push(testUser);

        //     await foundTeam.save();

        //     const obj = {};

        //     const reassignCaptain = {
        //         teamName: foundTeam.teamName,
        //         userName: testUser,
        //     };

        //     obj.adminId = admin._id;
        //     obj.TEAM = true;

        //     await new AdminLevel(obj).save();

        //     const token = generateNewToken.generateNewToken(
        //         utils.objectify(admin),
        //         false
        //     );

        //     let result = await request(app.app)
        //         .post(requestUrl)
        //         .set({ Authorization: `Bearer ${token}` })
        //         .send(reassignCaptain)
        //         .then(
        //             res => {
        //                 return res;
        //             },
        //             err => {
        //                 throw err;
        //             }
        //         );

        //     assert(result.status == 200);
        //     assert(result.body.returnObject.captain == testUser);

        //         let newCaptainAfterSave = new Promise( resolve=>{
        //             setTimeout(async()=>{
        //                 let newCaptain = await User.find({displayName: testUser});
        //                     resolve(newCaptain);
        //             },1000);
        //         });

        //         let oldCaptainAfterSave = new Promise(
        //             resolve => {
        //                 setTimeout(async () => {
        //                     let oldCaptain = await User.find({ displayName: currentCaptain });
        //                     resolve(oldCaptain);
        //                 }, 1000);
        //             }
        //         );

        //         let newCaptain = await newCaptainAfterSave.then(r => {
        //             return r;
        //         });

        //         let oldCaptain = await oldCaptainAfterSave.then(r => {
        //             return r;
        //         });

        //         assert(newCaptain[0].isCaptain);
        //         assert(oldCaptain[0].isCaptain==false);
        
        // });

        // it('api/admin/approveMemberAdd confirm adding member to team', async function () {
        //     // let mockUp = sinon.stub(playerRanksMethods, "getNgsAvgRank").resolves(11);
        //     // let mockUp2 = sinon.stub(TeamSubs, "updateTeamMmrAsynch").resolves(true);

        //     await mongoUnit.dropDb();
        //     await mongoUnit.load(mockData);

        //     let requestUrl = `/api/admin/approveMemberAdd`;

        //     let admin = await User.find({ displayName: 'TEST azalea#9539' });
        //     admin = admin[0];

        //     let foundTeam = await Team.find({ teamName: "Mongoose's Team" });
        //     foundTeam = foundTeam[0];

        //     let userToAdd = await User.find({displayName: 'TEST wraith#9539'});
        //     userToAdd = userToAdd[0];

        //     const frToken = generateNewToken.generateNewToken(
        //         utils.objectify(userToAdd),
        //         false
        //     )
            
        //     const joinReq = {
        //         teamName: foundTeam.teamName,
        //         addMember: userToAdd.displayName,
        //         messageId: '12345',
        //         approval: true,
        //     };;

        //     let joinTeamApi = `/api/request/user/join/response?teamName`;
        //     const userJoinResponse = await request(app.app)
        //         .post(joinTeamApi)
        //         .set({ Authorization: `Bearer ${frToken}` })
        //         .send(joinReq)
        //         .then(
        //             res => {
        //                 return res;
        //             },
        //             err => {
        //                 throw err;
        //             }
        //         );

            
        //     const pmqBefore = await Admin.PendingQueue.find();

        //     assert(pmqBefore.length > 0);

            
        //     assert(userJoinResponse.status == 200);


        //     const approveAdd = {
        //         teamId: foundTeam._id,
        //         memberId: userToAdd._id,
        //         approved:true
        //     };

        //     const obj = {};

        //     obj.adminId = admin._id;
        //     obj.TEAM = true;

        //     await new AdminLevel(obj).save();

        //     const token = generateNewToken.generateNewToken(
        //         utils.objectify(admin),
        //         false
        //     );

        //     let result = await request(app.app)
        //         .post(requestUrl)
        //         .set({ Authorization: `Bearer ${token}` })
        //         .send(approveAdd)
        //         .then(
        //             res => {
        //                 return res;
        //             },
        //             err => {
        //                 throw err;
        //             }
        //         );

            
        //     assert(result.status == 200);

        //     let testTeam = await Team.find({ teamName: "Mongoose's Team" });
        //     testTeam = testTeam[0];
        //     let testUser = await User.find({displayName: 'TEST wraith#9539'});
        //     testUser = testUser[0];

        //     assert(testUser.teamId == testTeam._id && testUser.teamName == testTeam.teamName);

        //     let i = _.findIndex(testTeam.teamMembers, function(o){return o.displayName == testUser.displayName});

        //     assert(i>=0);

        //     const pmqAfter = await Admin.PendingQueue.find();

        //     assert(pmqAfter.length == 0);
            
                        
        // });

        // it('api/admin/approveMemberAdd error if target team has no pending members..', async function () {
        //     // let mockUp = sinon.stub(playerRanksMethods, "getNgsAvgRank").resolves(11);
        //     // let mockUp2 = sinon.stub(TeamSubs, "updateTeamMmrAsynch").resolves(true);

        //     await mongoUnit.dropDb();
        //     await mongoUnit.load(mockData);

        //     let requestUrl = `/api/admin/approveMemberAdd`;

        //     let admin = await User.find({ displayName: 'TEST azalea#9539' });
        //     admin = admin[0];

        //     let foundTeam = await Team.find({ teamName: "Mongoose's Team" });
        //     foundTeam = foundTeam[0];

        //     let userToAdd = await User.find({
        //         displayName: 'TEST wraith#9539',
        //     });
        //     userToAdd = userToAdd[0];

        //     const approveAdd = {
        //         teamId: foundTeam._id,
        //         memberId: userToAdd._id,
        //         approved: true,
        //     };

        //     const obj = {};

        //     obj.adminId = admin._id;
        //     obj.TEAM = true;

        //     await new AdminLevel(obj).save();

        //     const token = generateNewToken.generateNewToken(
        //         utils.objectify(admin),
        //         false
        //     );

        //     let result = await request(app.app)
        //         .post(requestUrl)
        //         .set({ Authorization: `Bearer ${token}` })
        //         .send(approveAdd)
        //         .then(
        //             res => {
        //                 return res;
        //             },
        //             err => {
        //                 throw err;
        //             }
        //         );

        //     assert(result.status == 200);
        //     assert(result.body.message.indexOf('had no pending members')>-1);
        //     assert(result.body.err);

        // });

                // it('api/admin/approveMemberAdd error if target user is not in pending members..', async function () {
                //     // let mockUp = sinon.stub(playerRanksMethods, "getNgsAvgRank").resolves(11);
                //     // let mockUp2 = sinon.stub(TeamSubs, "updateTeamMmrAsynch").resolves(true);

                //     await mongoUnit.dropDb();
                //     await mongoUnit.load(mockData);

                //     let requestUrl = `/api/admin/approveMemberAdd`;

                //     let admin = await User.find({
                //         displayName: 'TEST azalea#9539',
                //     });
                //     admin = admin[0];

                //     let foundTeam = await Team.find({
                //         teamName: "Mongoose's Team",
                //     });
                //     foundTeam = foundTeam[0];

                //     foundTeam.pendingMembers.push({displayName:'bozo1234'});

                //     await foundTeam.save();

                //     let userToAdd = await User.find({displayName: 'TEST wraith#9539'});
                //     userToAdd = userToAdd[0];

                //     const approveAdd = {
                //         teamId: foundTeam._id,
                //         memberId: userToAdd._id,
                //         approved: true,
                //     };

                //     const obj = {};

                //     obj.adminId = admin._id;
                //     obj.TEAM = true;

                //     await new AdminLevel(obj).save();

                //     const token = generateNewToken.generateNewToken(
                //         utils.objectify(admin),
                //         false
                //     );

                //     let result = await request(app.app)
                //         .post(requestUrl)
                //         .set({ Authorization: `Bearer ${token}` })
                //         .send(approveAdd)
                //         .then(
                //             res => {
                //                 return res;
                //             },
                //             err => {
                //                 throw err;
                //             }
                //         );

                //     assert(result.status == 200);
                //     assert(result.body.message.indexOf('User was not found in') >-1);
                //     assert(result.body.err);
                // });
        
                // it('api/admin/forfeit/team forfiet team matches..', async function () {
                //     // let mockUp = sinon.stub(playerRanksMethods, "getNgsAvgRank").resolves(11);
                //     // let mockUp2 = sinon.stub(TeamSubs, "updateTeamMmrAsynch").resolves(true);

                //     await mongoUnit.dropDb();
                //     await mongoUnit.load(mockData);

                //     let requestUrl = `/api/admin/forfeit/team`;

                //     let admin = await User.find({
                //         displayName: 'TEST azalea#9539',
                //     });
                //     admin = admin[0];

                //     const testTeamName = "Mongoose's Team";

                //     let foundTeam = await Team.find({
                //         teamName: testTeamName
                //     });
                //     foundTeam = foundTeam[0];

                //     let matches = await Matches.find({
                //         $or: [
                //             { 'away.teamName': testTeamName },
                //             { 'home.teamName': testTeamName },
                //         ],
                //     });

                //     for(var i = 0; i<matches.length; i++){
                //         let match = matches[i];
                //         if(match.home.teamName == testTeamName){
                //             match.home.id = foundTeam._id;
                //         }
                //         if(match.away.teamName == testTeamName){
                //             match.away.id = foundTeam._id;
                //         }
                //         await match.save();
                //     }

                //     const obj = {};

                //     obj.adminId = admin._id;
                //     obj.TEAM = true;

                //     await new AdminLevel(obj).save();

                //     const token = generateNewToken.generateNewToken(
                //         utils.objectify(admin),
                //         false
                //     );

                //     const postForfeit = {"teamName":testTeamName};

                //     let result = await request(app.app)
                //         .post(requestUrl)
                //         .set({ Authorization: `Bearer ${token}` })
                //         .send(postForfeit)
                //         .then(
                //             res => {
                //                 return res;
                //             },
                //             err => {
                //                 throw err;
                //             }
                //         );

                //     console.log(result.status, result.body);

                //     assert(result.status == 200);
                //     assert(result.body.returnObject);

                    
                //     let matchesAfter = await Matches.find({
                //         $or: [
                //             {
                //                 'away.teamName':testTeamName
                //             },
                //             {
                //                 'home.teamName':testTeamName
                //             },
                //         ],
                //     });

                //     let forfeit = true;

                //     for(var i = 0; i<matchesAfter.length; i++){
                //         let match = matchesAfter[i];
                //         if(match.home.teamName==testTeamName){
                //             forfeit = forfeit && match.home.score == 0
                //         }
                //         if(match.away.teamName==testTeamName){
                //             forfeit = forfeit && match.away.score == 0
                //         }
                //         forfeit = forfeit && match.forfeit;
                //     }

                //     assert(forfeit);
                // });

                // it('api/admin/forfeit/team fail wrong name forfiet team matches..', async function () {
                //     // let mockUp = sinon.stub(playerRanksMethods, "getNgsAvgRank").resolves(11);
                //     // let mockUp2 = sinon.stub(TeamSubs, "updateTeamMmrAsynch").resolves(true);

                //     await mongoUnit.dropDb();
                //     await mongoUnit.load(mockData);

                //     let requestUrl = `/api/admin/forfeit/team`;

                //     let admin = await User.find({
                //         displayName: 'TEST azalea#9539',
                //     });
                //     admin = admin[0];

                //     const testTeamName = "Mongoose's Teamy";

                //     let foundTeam = await Team.find({
                //         teamName: testTeamName,
                //     });
                //     foundTeam = foundTeam[0];

                //     const obj = {};

                //     obj.adminId = admin._id;
                //     obj.TEAM = true;

                //     await new AdminLevel(obj).save();

                //     const token =
                //         generateNewToken.generateNewToken(
                //             utils.objectify(admin),
                //             false
                //         );

                //     const postForfeit = {
                //         teamName: testTeamName,
                //     };

                //     let result = await request(app.app)
                //         .post(requestUrl)
                //         .set({
                //             Authorization: `Bearer ${token}`,
                //         })
                //         .send(postForfeit)
                //         .then(
                //             res => {
                //                 return res;
                //             },
                //             err => {
                //                 throw err;
                //             }
                //         );

                //     assert(result.status == 500);
                //     assert(result.body.err);

                // });

                // it('api/admin/forfeit/team team - no matches..', async function () {
                //     // let mockUp = sinon.stub(playerRanksMethods, "getNgsAvgRank").resolves(11);
                //     // let mockUp2 = sinon.stub(TeamSubs, "updateTeamMmrAsynch").resolves(true);

                //     await mongoUnit.dropDb();
                //     await mongoUnit.load(mockData);

                //     let requestUrl = `/api/admin/forfeit/team`;

                //     let admin = await User.find({
                //         displayName: 'TEST azalea#9539',
                //     });
                //     admin = admin[0];

                //     const testTeamName = "Mongoose's Team";

                //     let foundTeam = await Team.find({
                //         teamName: testTeamName,
                //     });
                //     foundTeam = foundTeam[0];

                //     const obj = {};

                //     obj.adminId = admin._id;
                //     obj.TEAM = true;

                //     await new AdminLevel(obj).save();

                //     const token = generateNewToken.generateNewToken(
                //         utils.objectify(admin),
                //         false
                //     );

                //     const postForfeit = {
                //         teamName: testTeamName,
                //     };

                //     let result = await request(app.app)
                //         .post(requestUrl)
                //         .set({
                //             Authorization: `Bearer ${token}`,
                //         })
                //         .send(postForfeit)
                //         .then(
                //             res => {
                //                 return res;
                //             },
                //             err => {
                //                 throw err;
                //             }
                //         );

                //     assert(result.status == 500);
                //     assert(result.body.message == 'Error forfeiting matches');
                // });

                                // it('api/admin/teamSave team - name taken..', async function () {
        
                                //     await mongoUnit.dropDb();
                                //     await mongoUnit.load(mockData);

                                //     let requestUrl = `/api/admin/teamSave`;

                                //     let admin = await User.find({
                                //         displayName: 'TEST azalea#9539',
                                //     });
                                //     admin = admin[0];

                                //     const testTeamName = "Mongoose's Team";

                                //     let foundTeam = await Team.find({ teamName: testTeamName });
                                //     foundTeam = foundTeam[0];

                                //     const obj = {};

                                //     obj.adminId = admin._id;
                                //     obj.TEAM = true;

                                //     await new AdminLevel(obj).save();

                                //     const token =
                                //         generateNewToken.generateNewToken(
                                //             utils.objectify(admin),
                                //             false
                                //         );

                                //         let oldTeamName = foundTeam.teamName;

                                //     foundTeam.teamName =
                                //         'TEST assigned daffodils';

                                //         foundTeam.teamName_lower = foundTeam.teamName.toLowerCase();

                                //         const teamEdit = {
                                //             teamName: oldTeamName,
                                //             teamObj: foundTeam,
                                //         };


                                //     let result = await request(app.app)
                                //         .post(requestUrl)
                                //         .set({
                                //             Authorization: `Bearer ${token}`,
                                //         })
                                //         .send(teamEdit)
                                //         .then(
                                //             res => {
                                //                 return res;
                                //             },
                                //             err => {
                                //                 throw err;
                                //             }
                                //         );

                                //     assert(result.status == 400);
                                //     assert(result.body.message.indexOf("This team name was all ready taken">-1));

                                // });

    //   it('api/admin/teamSave team - name change ok..', async function () {
    //       await mongoUnit.dropDb();
    //       await mongoUnit.load(mockData);

    //       let requestUrl = `/api/admin/teamSave`;

    //       let admin = await User.find({
    //           displayName: 'TEST azalea#9539',
    //       });
    //       admin = admin[0];

    //       const testTeamName = "Mongoose's Team";

    //       let foundTeam = await Team.find({ teamName: testTeamName });
    //       foundTeam = foundTeam[0];

    //       const obj = {};

    //       obj.adminId = admin._id;
    //       obj.TEAM = true;

    //       await new AdminLevel(obj).save();

    //       const token = generateNewToken.generateNewToken(
    //           utils.objectify(admin),
    //           false
    //       );

    //       let oldTeamName = foundTeam.teamName;

    //       let testName = 'TEST TEST TEST'
    //       foundTeam.teamName = testName;

    //       foundTeam.teamName_lower = foundTeam.teamName.toLowerCase();

    //       const teamEdit = {
    //           teamName: oldTeamName,
    //           teamObj: foundTeam,
    //       };

    //       let result = await request(app.app)
    //           .post(requestUrl)
    //           .set({
    //               Authorization: `Bearer ${token}`,
    //           })
    //           .send(teamEdit)
    //           .then(
    //               res => {
    //                   return res;
    //               },
    //               err => {
    //                   throw err;
    //               }
    //           );

    //           console.log(result.status, )

    //       assert(result.status == 200);
    //       assert(result.body.returnObject.teamName = testName);
    //   });

    //  it('api/admin/teamSave team - name change with more..', async function () {
    //      await mongoUnit.dropDb();
    //      await mongoUnit.load(mockData);

    //      let requestUrl = `/api/admin/teamSave`;

    //      let admin = await User.find({
    //          displayName: 'TEST azalea#9539',
    //      });
    //      admin = admin[0];

    //      const testTeamName = "Mongoose's Team";

    //      let foundTeam = await Team.find({ teamName: testTeamName });
    //      foundTeam = foundTeam[0];

    //      const obj = {};

    //      obj.adminId = admin._id;
    //      obj.TEAM = true;

    //      await new AdminLevel(obj).save();

    //      const token = generateNewToken.generateNewToken(
    //          utils.objectify(admin),
    //          false
    //      );

    //      let oldTeamName = foundTeam.teamName;

    //      let testName = 'TEST TEST TEST';
    //      let lfm = false;
    //      let avail = { monday : 'no'}
    //      let descriptionOfTeam = '123456'
    //      let competitiveLevel = 5;
    //      let rolesNeeded = { tank:false, dps:true }
    //      let timezone = '5';
    //      let twitch = 'twitch';
    //      let twitter = 'twitter';
    //      let youtube = 'youtube';
    //      let ticker = 'ticker';

    //      foundTeam.teamName = testName;
    //      foundTeam.lookingForMore = lfm;
    //      foundTeam.availability = avail;
    //      foundTeam.competitiveLevel = competitiveLevel;
    //      foundTeam.descriptionOfTeam = descriptionOfTeam;
    //      foundTeam.rolesNeeded = rolesNeeded;
    //      foundTeam.timeZone = timezone;
    //      foundTeam.twitch = twitch;
    //      foundTeam.twitter = twitter;
    //      foundTeam.youtube = youtube;
    //      foundTeam.ticker = ticker;

    //      foundTeam.teamName_lower = foundTeam.teamName.toLowerCase();

    //      const teamEdit = {
    //          teamName: oldTeamName,
    //          teamObj: foundTeam,
    //      };

    //      let result = await request(app.app)
    //          .post(requestUrl)
    //          .set({
    //              Authorization: `Bearer ${token}`,
    //          })
    //          .send(teamEdit)
    //          .then(
    //              res => {
    //                  return res;
    //              },
    //              err => {
    //                  throw err;
    //              }
    //          );

    //      assert(result.status == 200);

    //      let savedTeam = await Team.find({ teamName: testName });
    //      savedTeam = savedTeam[0];

    //      assert(lfm == savedTeam.lookingForMore);
    //      assert(_.isEqual(avail,savedTeam.availability));
    //      assert(descriptionOfTeam == savedTeam.descriptionOfTeam);
    //      assert(competitiveLevel == savedTeam.competitiveLevel);
    //      assert(_.isEqual(rolesNeeded, savedTeam.rolesNeeded));
    //      assert(timezone == savedTeam.timeZone);
    //      assert(twitch == savedTeam.twitch);
    //      assert(twitter == savedTeam.twitter);
    //      assert(youtube == savedTeam.youtube);
    //      assert(ticker  == savedTeam.ticker);
    //  });

    // it('api/admin/teamSave team - change details..', async function () {
    //     await mongoUnit.dropDb();
    //     await mongoUnit.load(mockData);

    //     let requestUrl = `/api/admin/teamSave`;

    //     let admin = await User.find({
    //         displayName: 'TEST azalea#9539',
    //     });
    //     admin = admin[0];

    //     const testTeamName = "Mongoose's Team";

    //     let foundTeam = await Team.find({ teamName: testTeamName });
    //     foundTeam = foundTeam[0];

    //     const obj = {};

    //     obj.adminId = admin._id;
    //     obj.TEAM = true;

    //     await new AdminLevel(obj).save();

    //     const token = generateNewToken.generateNewToken(
    //         utils.objectify(admin),
    //         false
    //     );

    //     let oldTeamName = foundTeam.teamName;

    //     let lfm = false;
    //     let avail = { monday: 'no' };
    //     let descriptionOfTeam = '123456';
    //     let competitiveLevel = 5;
    //     let rolesNeeded = { tank: false, dps: true };
    //     let timezone = '5';
    //     let twitch = 'twitch';
    //     let twitter = 'twitter';
    //     let youtube = 'youtube';
    //     let ticker = 'ticker';

    //     foundTeam.lookingForMore = lfm;
    //     foundTeam.availability = avail;
    //     foundTeam.competitiveLevel = competitiveLevel;
    //     foundTeam.descriptionOfTeam = descriptionOfTeam;
    //     foundTeam.rolesNeeded = rolesNeeded;
    //     foundTeam.timeZone = timezone;
    //     foundTeam.twitch = twitch;
    //     foundTeam.twitter = twitter;
    //     foundTeam.youtube = youtube;
    //     foundTeam.ticker = ticker;

    //     const teamEdit = {
    //         teamName: oldTeamName,
    //         teamObj: foundTeam,
    //     };

    //     let result = await request(app.app)
    //         .post(requestUrl)
    //         .set({
    //             Authorization: `Bearer ${token}`,
    //         })
    //         .send(teamEdit)
    //         .then(
    //             res => {
    //                 return res;
    //             },
    //             err => {
    //                 throw err;
    //             }
    //         );

    //     assert(result.status == 200);

    //     let savedTeam = await Team.find({ teamName: testTeamName });
    //     savedTeam = savedTeam[0];

    //     assert(lfm == savedTeam.lookingForMore);
    //     assert(_.isEqual(avail, savedTeam.availability));
    //     assert(descriptionOfTeam == savedTeam.descriptionOfTeam);
    //     assert(competitiveLevel == savedTeam.competitiveLevel);
    //     assert(_.isEqual(rolesNeeded, savedTeam.rolesNeeded));
    //     assert(timezone == savedTeam.timeZone);
    //     assert(twitch == savedTeam.twitch);
    //     assert(twitter == savedTeam.twitter);
    //     assert(youtube == savedTeam.youtube);
    //     assert(ticker == savedTeam.ticker);
    // });

    //  it('api/admin/get/teams/all get all teams..', async function () {
    //      await mongoUnit.dropDb();
    //      await mongoUnit.load(mockData);

    //      let requestUrl = `/api/admin/get/teams/all`;

    //      let admin = await User.find({
    //          displayName: 'TEST azalea#9539',
    //      });
    //      admin = admin[0];

    //      const obj = {};

    //      obj.adminId = admin._id;
    //      obj.TEAM = true;

    //      await new AdminLevel(obj).save();

    //      const token = generateNewToken.generateNewToken(
    //          utils.objectify(admin),
    //          false
    //      );

    //      let result = await request(app.app)
    //          .get(requestUrl)
    //          .set({
    //              Authorization: `Bearer ${token}`,
    //          })
    //          .then(
    //              res => {
    //                  return res;
    //              },
    //              err => {
    //                  throw err;
    //              }
    //          );

    //      assert(result.status == 200);
    //      assert(result.body.returnObject.length>0)
    //  });

    // it('api/admin/team/memberAdd add team member method ..', async function () {
    //     await mongoUnit.dropDb();
    //     await mongoUnit.load(mockData);

    //     let requestUrl = `/api/admin/team/memberAdd`;

    //     let admin = await User.find({
    //         displayName: 'TEST azalea#9539',
    //     });
    //     admin = admin[0];

    //     const obj = {};

    //     const userToAdd = "TEST wraith#9539"
    //     const testTeamName = "Mongoose's Team";

    //     obj.adminId = admin._id;
    //     obj.TEAM = true;

    //     await new AdminLevel(obj).save();

    //     const token = generateNewToken.generateNewToken(
    //         utils.objectify(admin),
    //         false
    //     );

    //     const post = {
    //         user:userToAdd,
    //         teamName:testTeamName
    //     };

    //     let result = await request(app.app)
    //         .post(requestUrl)
    //         .set({
    //             Authorization: `Bearer ${token}`,
    //         })
    //         .send(post)
    //         .then(
    //             res => {
    //                 return res;
    //             },
    //             err => {
    //                 throw err;
    //             }
    //         );

    //     assert(result.status == 200);
    //     assert(result.body.returnObject);

    //     setTimeout(
    //         async ()=>{
    //             let user = await User.find({displayName: userToAdd});
    //             user=user[0];

    //             let team = await Team.find({teamName:testTeamName});
    //             team = team[0];

    //             let foundUser = false;
    //             team.teamMembers.forEach(
    //                 i=>{
    //                     if(i.displayName==user.displayName){
    //                         foundUser = true;
    //                     }
    //                 }
    //             )
    //             assert(foundUser);
    //             assert(user.teamName == team.teamName);
    //         },1000
    //     )



    // });

    // it('api/admin/team/memberAdd add team member method, team not found ..', async function () {
    //     await mongoUnit.dropDb();
    //     await mongoUnit.load(mockData);

    //     let requestUrl = `/api/admin/team/memberAdd`;

    //     let admin = await User.find({
    //         displayName: 'TEST azalea#9539',
    //     });
    //     admin = admin[0];

    //     const obj = {};

    //     const userToAdd = 'TEST wraith#9539';
    //     const testTeamName = "Mongoose's Team11";

    //     obj.adminId = admin._id;
    //     obj.TEAM = true;

    //     await new AdminLevel(obj).save();

    //     const token = generateNewToken.generateNewToken(
    //         utils.objectify(admin),
    //         false
    //     );

    //     const post = {
    //         user: userToAdd,
    //         teamName: testTeamName,
    //     };

    //     let result = await request(app.app)
    //         .post(requestUrl)
    //         .set({
    //             Authorization: `Bearer ${token}`,
    //         })
    //         .send(post)
    //         .then(
    //             res => {
    //                 return res;
    //             },
    //             err => {
    //                 throw err;
    //             }
    //         );


    //     assert(result.body.message == 'Team not found');
    //     assert(result.status == 500);

    // });

        // it('api/admin/team/get find team admin teamname..', async function () {
        //     await mongoUnit.dropDb();
        //     await mongoUnit.load(mockData);

        //     let requestUrl = `/api/admin/team/get`;

        //     let admin = await User.find({
        //         displayName: 'TEST azalea#9539',
        //     });
        //     admin = admin[0];

        //     const obj = {};

        //     const testTeamName = "Mongoose's Team";

        //     obj.adminId = admin._id;
        //     obj.TEAM = true;

        //     await new AdminLevel(obj).save();

        //     const token = generateNewToken.generateNewToken(
        //         utils.objectify(admin),
        //         false
        //     );

        //     let result = await request(app.app)
        //         .get(`${requestUrl}?team=${testTeamName}`)
        //         .set({
        //             Authorization: `Bearer ${token}`,
        //         })
        //         .then(
        //             res => {
        //                 return res;
        //             },
        //             err => {
        //                 throw err;
        //             }
        //         );

        //     assert(result.body.returnObject);
        //     assert(result.status == 200);
        // });

                // it('api/admin/team/get find team admin ticker..', async function () {
                //     await mongoUnit.dropDb();
                //     await mongoUnit.load(mockData);

                //     let requestUrl = `/api/admin/team/get`;

                //     let admin = await User.find({
                //         displayName: 'TEST azalea#9539',
                //     });
                //     admin = admin[0];

                //     const obj = {};

                //     obj.adminId = admin._id;
                //     obj.TEAM = true;

                //     await new AdminLevel(obj).save();

                //     const token = generateNewToken.generateNewToken(
                //         utils.objectify(admin),
                //         false
                //     );

                //     let result = await request(app.app)
                //         .get(`${requestUrl}?ticker=goose`)
                //         .set({
                //             Authorization: `Bearer ${token}`,
                //         })
                //         .then(
                //             res => {
                //                 return res;
                //             },
                //             err => {
                //                 throw err;
                //             }
                //         );

                //     assert(result.body.returnObject);
                //     assert(result.status == 200);
                // });

        // it('api/admin/team/get find team admin ticker..', async function () {
        //     await mongoUnit.dropDb();
        //     await mongoUnit.load(mockData);

        //     let requestUrl = `/api/admin/team/get`;

        //     let admin = await User.find({
        //         displayName: 'TEST azalea#9539',
        //     });
        //     admin = admin[0];

        //     let team = await Team.find({ teamName: "Mongoose's Team" });
        //     team = team[0];

        //     const obj = {};

        //     obj.adminId = admin._id;
        //     obj.TEAM = true;

        //     await new AdminLevel(obj).save();

        //     const token = generateNewToken.generateNewToken(
        //         utils.objectify(admin),
        //         false
        //     );

        //     let result = await request(app.app)
        //         .get(`${requestUrl}?teamId=${team._id}`)
        //         .set({
        //             Authorization: `Bearer ${token}`,
        //         })
        //         .then(
        //             res => {
        //                 return res;
        //             },
        //             err => {
        //                 throw err;
        //             }
        //         );

        //     assert(result.body.returnObject);
        //     assert(result.status == 200);
        // });

                // it('api/admin/team/get find team admin ticker..', async function () {
                //     await mongoUnit.dropDb();
                //     await mongoUnit.load(mockData);

                //     let requestUrl = `/api/admin/team/get`;

                //     let admin = await User.find({
                //         displayName: 'TEST azalea#9539',
                //     });
                //     admin = admin[0];

                //     let team = await Team.find({ teamName: "Mongoose's Team" });
                //     team = team[0];

                //     const obj = {};

                //     obj.adminId = admin._id;
                //     obj.TEAM = true;

                //     await new AdminLevel(obj).save();

                //     const token = generateNewToken.generateNewToken(
                //         utils.objectify(admin),
                //         false
                //     );

                //     let result = await request(app.app)
                //         .get(`${requestUrl}?teamId=${team._id}&discordTag=true`)
                //         .set({
                //             Authorization: `Bearer ${token}`,
                //         })
                //         .then(
                //             res => {
                //                 return res;
                //             },
                //             err => {
                //                 throw err;
                //             }
                //         );

                //     assert(result.body.returnObject);
                //     assert(result.status == 200);
                // });

                                // it('api/admin/team/uploadLogo upload logo..', async function () {
                                //     await mongoUnit.dropDb();
                                //     await mongoUnit.load(mockData);

                                //     var imageUploadStub = sinon.stub(s3putObject,'s3putObject').resolves({link:"resolvelink"});

                                //     let requestUrl = `/api/admin/team/uploadLogo`;

                                //     let admin = await User.find({
                                //         displayName: 'TEST azalea#9539',
                                //     });
                                //     admin = admin[0];

                                //     let team = await Team.find({
                                //         teamName: "Mongoose's Team",
                                //     });
                                //     team = team[0];

                                //     const originalImage = team.logo;

                                //     const obj = {};

                                //     obj.adminId = admin._id;
                                //     obj.TEAM = true;

                                //     await new AdminLevel(obj).save();

                                //     const token =
                                //         generateNewToken.generateNewToken(
                                //             utils.objectify(admin),
                                //             false
                                //         );

                                //         const postObj = {
                                //             teamName:"Mongoose's Team",
                                //             logo: "logostring"
                                //         }

                                //     let result = await request(app.app)
                                //         .post(requestUrl)
                                //         .set({
                                //             Authorization: `Bearer ${token}`,
                                //         })
                                //         .send(postObj)
                                //         .then(
                                //             res => {
                                //                 return res;
                                //             },
                                //             err => {
                                //                 throw err;
                                //             }
                                //         );

                                //     assert(result.body.returnObject.additional.logo != originalImage);
                                //     assert(result.status == 200);

                                // });

                                // it('api/admin/team/removeLogo remove logo..', async function () {
                                //     await mongoUnit.dropDb();
                                //     await mongoUnit.load(mockData);

                                //     var imageUploadStub = sinon
                                //         .stub(s3putObject, 's3putObject')
                                //         .resolves({ link: 'resolvelink' });

                                //     let requestUrl = `/api/admin/team/removeLogo`;

                                //     let admin = await User.find({
                                //         displayName: 'TEST azalea#9539',
                                //     });
                                //     admin = admin[0];

                                //     let team = await Team.find({
                                //         teamName: "Mongoose's Team",
                                //     });
                                //     team = team[0];

                                //     const originalImage = team.logo;

                                //     const obj = {};

                                //     obj.adminId = admin._id;
                                //     obj.TEAM = true;

                                //     await new AdminLevel(obj).save();

                                //     const token =
                                //         generateNewToken.generateNewToken(
                                //             utils.objectify(admin),
                                //             false
                                //         );

                                //     const postObj = {
                                //         teamName: "Mongoose's Team",
                                //     };

                                //     let result = await request(app.app)
                                //         .post(requestUrl)
                                //         .set({
                                //             Authorization: `Bearer ${token}`,
                                //         })
                                //         .send(postObj)
                                //         .then(
                                //             res => {
                                //                 return res;
                                //             },
                                //             err => {
                                //                 throw err;
                                //             }
                                //         );

                                //     assert(
                                //         result.body.returnObject.additional
                                //             .logo != originalImage
                                //     );

                                //     assert(
                                //         result.body.returnObject.additional.logo == null
                                //     );

                                //     assert(result.status == 200);

                                // });

                                 it('api/admin/team/removeLogo remove logo, logo not found..', async function () {
                                     await mongoUnit.dropDb();
                                     await mongoUnit.load(mockData);

                                     var imageUploadStub = sinon
                                         .stub(s3putObject, 's3putObject')
                                         .resolves({ link: 'resolvelink' });

                                     let requestUrl = `/api/admin/team/removeLogo`;

                                     let admin = await User.find({
                                         displayName: 'TEST azalea#9539',
                                     });
                                     admin = admin[0];

                                     let team = await Team.find({
                                         teamName: 'TEST assigned daffodils',
                                     });
                                     team = team[0];

                                     const originalImage = team.logo;

                                     const obj = {};

                                     obj.adminId = admin._id;
                                     obj.TEAM = true;

                                     await new AdminLevel(obj).save();

                                     const token =
                                         generateNewToken.generateNewToken(
                                             utils.objectify(admin),
                                             false
                                         );

                                     const postObj = {
                                         teamName: 'TEST assigned daffodils',
                                     };

                                     let result = await request(app.app)
                                         .post(requestUrl)
                                         .set({
                                             Authorization: `Bearer ${token}`,
                                         })
                                         .send(postObj)
                                         .then(
                                             res => {
                                                 return res;
                                             },
                                             err => {
                                                 throw err;
                                             }
                                         );

                                     assert(result.status == 500);
                                 });

})