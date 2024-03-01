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
        
                it('api/admin/approveMemberAdd error if target user is not in pending members..', async function () {
                    // let mockUp = sinon.stub(playerRanksMethods, "getNgsAvgRank").resolves(11);
                    // let mockUp2 = sinon.stub(TeamSubs, "updateTeamMmrAsynch").resolves(true);

                    await mongoUnit.dropDb();
                    await mongoUnit.load(mockData);

                    let requestUrl = `/api/admin/approveMemberAdd`;

                    let admin = await User.find({
                        displayName: 'TEST azalea#9539',
                    });
                    admin = admin[0];

                    let foundTeam = await Team.find({
                        teamName: "Mongoose's Team",
                    });
                    foundTeam = foundTeam[0];

                    foundTeam.pendingMembers.push({ displayName: 'bozo1234' });

                    await foundTeam.save();

                    let userToAdd = await User.find({
                        displayName: 'TEST wraith#9539',
                    });
                    userToAdd = userToAdd[0];

                    const approveAdd = {
                        teamId: foundTeam._id,
                        memberId: userToAdd._id,
                        approved: true,
                    };

                    const obj = {};

                    obj.adminId = admin._id;
                    obj.TEAM = true;

                    await new AdminLevel(obj).save();

                    const token = generateNewToken.generateNewToken(
                        utils.objectify(admin),
                        false
                    );

                    let result = await request(app.app)
                        .post(requestUrl)
                        .set({ Authorization: `Bearer ${token}` })
                        .send(approveAdd)
                        .then(
                            res => {
                                return res;
                            },
                            err => {
                                throw err;
                            }
                        );

                    assert(result.status == 200);
                    assert(
                        result.body.message.indexOf('User was not found in') >
                            -1
                    );
                    assert(result.body.err);
                });

})