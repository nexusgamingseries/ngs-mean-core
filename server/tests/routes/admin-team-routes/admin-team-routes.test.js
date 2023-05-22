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

const { AdminLevel } = require('../../../models/admin-models');


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

    it('api/admin/team/removeInvitedMember remove invited member from team but isnt really on there',async function(){

        // let mockUp = sinon.stub(playerRanksMethods, "getNgsAvgRank").resolves(11);
        // let mockUp2 = sinon.stub(TeamSubs, "updateTeamMmrAsynch").resolves(true);
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
        let requestUrl = `/api/admin/team/removeInvitedMember`;

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        let foundTeam = await Team.find({"teamName": "Mongoose's Team"});
        foundTeam = foundTeam[0];

        let userToAdd = await User.find({"displayName":"TEST lily#3664"});
        userToAdd = userToAdd[0];

        foundTeam.invitedUsers = [userToAdd.displayName];

        let savedTeam = await foundTeam.save();

        const obj = {
        };

        const removePostObj = {
            teamName:foundTeam.teamName,
            removeUser:"Bozo#1234"
        }

        obj.adminId = admin._id;
        obj.TEAM = true;
 
        await new AdminLevel(obj).save();

        const token = generateNewToken.generateNewToken(utils.objectify(admin), false);

        let result = await request(app.app).post(requestUrl)
        .set({"Authorization": `Bearer ${token}`})
        .send(removePostObj)
        .then((res)=>{
            return res;
        },
        (err)=>{
            throw err;
        });

        assert(result.status === 400);
        assert(result.body.message.indexOf("not found")>-1);


        let teamAfterSave = new Promise( resolve=>{
            setTimeout(async()=>{
                let teamAfter = await Team.find({"teamName": "Mongoose's Team"});
                teamAfter = teamAfter[0];
                    let found = false;
                _.forEach(teamAfter.invitedUsers, itr=>{
                    if(itr == "Bozo#1234"){
                        found = true;
                    }
                    });
                    resolve(found);
            },1000);
        });

        let teamOk = await teamAfterSave.then(r=>{return r;});
        
        assert(teamOk==false);

    });


})