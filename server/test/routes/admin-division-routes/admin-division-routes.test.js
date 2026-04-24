const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const assert = require('assert');
const mongoUnit = require('mongo-unit');
const usersData = require('../../mock-data/usersDataArray.json');
const teamsData = require('../../mock-data/teamsDataArray.json');
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
const divisionsData = require('../../mock-data/divisionsDataArray.json');

const { AdminLevel, PendingQueue } = require('../../../models/admin-models');

const mockData = {
    users: usersData,
    teams: teamsData
};

const loadConfig = require('../../../../loadConfig.js');
const Division = require('../../../models/division-models.js');
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

describe("admin-division-routes",async function(){

    it('/admin/getTeamsUndivisioned should return all teams that are not in a division',async function(){
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let requestUrl = `/api/admin/getTeamsUndivisioned`;

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};

        obj.adminId = admin._id;
        obj.DIVISION = true;

        await new AdminLevel(obj).save();

        const token = generateNewToken.generateNewToken(utils.objectify(admin), obj);

        const res = await request(app.app)
            .get(requestUrl)
            .set({'Authorization': `Bearer ${token}`})
            .then((res)=>{
                return res;
               },
                (err)=>{
                    throw err;
                });

            assert(res.body.returnObject.length > 0);
            
    });

    it('/admin/getTeamsUndivisioned should not allow access for now admins',async function(){
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let requestUrl = `/api/admin/getTeamsUndivisioned`;

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const token = generateNewToken.generateNewToken(utils.objectify(admin), false);

        const res = await request(app.app)
            .get(requestUrl)
            .set({'Authorization': `Bearer ${token}`})
            .then((res)=>{
                return res;
               },
                (err)=>{
                    throw err;
                });

            assert(res.body.message.includes("Unauthorized"));
            
    });


    it('/admin/getDivisionInfo should get divisions', async function(){
        await mongoUnit.dropDb();
        mockData['divisions'] = divisionsData;
        await mongoUnit.load(mockData); 

        let requestUrl = `/api/admin/getDivisionInfo`;

        const res = await request(app.app)
            .get(requestUrl)
            .then((res)=>{
                return res;
               },
                (err)=>{
                    throw err;
                });

            assert(res.body.returnObject.length > 0);

    });

    it('/admin/divisionTeams should place team into a division',async function(){
        await mongoUnit.dropDb();
        mockData['divisions'] = divisionsData;
        await mongoUnit.load(mockData); 

        let requestUrl = `/api/admin/divisionTeams`;

        const teamName = "TEST readable trolls"
        const divisionConcat = "test-a";

        const teamArr = await Team.find({"teamName": teamName});

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};
        obj.adminId = admin._id;
        obj.DIVISION = true;

        await new AdminLevel(obj).save();
        const token = generateNewToken.generateNewToken(utils.objectify(admin), obj);
        const res = await request(app.app)
            .post(requestUrl)
            .set({'Authorization': `Bearer ${token}`})
            .send({
                teamInfo: teamArr,
                divisionName: divisionConcat
            })
            .then((res)=>{
                return res;
               },
                (err)=>{
                    throw err;
                });

            assert(res.body.message.includes("Saved division"));

        let teamAfterSave = new Promise( resolve=>{
            setTimeout(async()=>{
                let teamAfter = await Team.find({"teamName": teamName});
                teamAfter = teamAfter[0];
                resolve(teamAfter);
            },1000);
        });

        let teamOk = await teamAfterSave.then(r=>{return r;});
        
        assert(teamOk.divisionConcat == divisionConcat);


    });

    it('/admin/divisionTeams should fail if not admin',async function(){
        await mongoUnit.dropDb();
        mockData['divisions'] = divisionsData;
        await mongoUnit.load(mockData); 

        let requestUrl = `/api/admin/divisionTeams`;

        const teamName = "TEST readable trolls"
        const divisionConcat = "test-a";

        const teamArr = await Team.find({"teamName": teamName});

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};
        obj.adminId = admin._id;
        obj.DIVISION = false;

        await new AdminLevel(obj).save();
        const token = generateNewToken.generateNewToken(utils.objectify(admin), obj);
        const res = await request(app.app)
            .post(requestUrl)
            .set({'Authorization': `Bearer ${token}`})
            .send({
                teamInfo: teamArr,
                divisionName: divisionConcat
            })
            .then((res)=>{
                return res;
               },
                (err)=>{
                    throw err;
                });
                
                assert(res.status == 403);

    });

    it('/admin/divisionTeams should fail if division is wrong',async function(){
        await mongoUnit.dropDb();
        mockData['divisions'] = divisionsData;
        await mongoUnit.load(mockData); 

        let requestUrl = `/api/admin/divisionTeams`;

        const teamName = "TEST readable trolls"
        const divisionConcat = "test-aaa";

        const teamArr = await Team.find({"teamName": teamName});

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};
        obj.adminId = admin._id;
        obj.DIVISION = true;

        await new AdminLevel(obj).save();
        const token = generateNewToken.generateNewToken(utils.objectify(admin), obj);
        const res = await request(app.app)
            .post(requestUrl)
            .set({'Authorization': `Bearer ${token}`})
            .send({
                teamInfo: teamArr,
                divisionName: divisionConcat
            })
            .then((res)=>{
                return res;
               },
                (err)=>{
                    throw err;
                });

           assert(res.status != 200);
           assert(res.body.message.includes("No division found"));

    });

    it('/admin/divisionTeams should fail if teamInfo is missing',async function(){
        await mongoUnit.dropDb();
        mockData['divisions'] = divisionsData;
        await mongoUnit.load(mockData); 

        let requestUrl = `/api/admin/divisionTeams`;

        const divisionConcat = "test-a";

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};
        obj.adminId = admin._id;
        obj.DIVISION = true;

        await new AdminLevel(obj).save();
        const token = generateNewToken.generateNewToken(utils.objectify(admin), obj);
        const res = await request(app.app)
            .post(requestUrl)
            .set({'Authorization': `Bearer ${token}`})
            .send({
                teamInfo: [],
                divisionName: divisionConcat
            })
            .then((res)=>{
                return res;
               },
                (err)=>{
                    throw err;
                });

                assert(res.status != 200);
                assert(res.body.message.includes("teamInfo (array) parameter"));

    });

    it('/admin/upsertDivision should upsert a new division',async function(){
        await mongoUnit.dropDb();
        mockData['divisions'] = divisionsData;
        await mongoUnit.load(mockData); 

        let requestUrl = `/api/admin/upsertDivision`;

        const divisionName = "Upserted Division";

        const divisionObj = {
            divisionName: divisionName,
            divisionConcat: "upserted-division",
            teams:[],
            divisionCoast:null,
            sorting:1,
            maxMMR:2000,
            minMMR:1000,
            moderator:"Joel",
            public:false,
            divColor: "#000000"
        }

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};
        obj.adminId = admin._id;
        obj.DIVISION = true;

        await new AdminLevel(obj).save();
        const token = generateNewToken.generateNewToken(utils.objectify(admin), obj);
        const res = await request(app.app)
            .post(requestUrl)
            .set({'Authorization': `Bearer ${token}`})
            .send({
                divObj: divisionObj,
                divName: divisionName
            })
            .then((res)=>{
                return res;
               },
                (err)=>{
                    throw err;
                });

        assert(res.status == 200);
           
    });

    it('/admin/upsertDivision should update existing division',async function(){
        await mongoUnit.dropDb();
        mockData['divisions'] = divisionsData;
        await mongoUnit.load(mockData); 

        let requestUrl = `/api/admin/upsertDivision`;

        const divisionConcat = "test-a";

        const divisionSearch = await Division.find({"divisionConcat": divisionConcat});
        const divisionObj = divisionSearch[0];

        divisionObj.maxMMR = 5000;
        divisionObj.minMMR = 1000;
        divisionObj.public = false;

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};
        obj.adminId = admin._id;
        obj.DIVISION = true;

        await new AdminLevel(obj).save();
        const token = generateNewToken.generateNewToken(utils.objectify(admin), obj);
        const res = await request(app.app)
            .post(requestUrl)
            .set({'Authorization': `Bearer ${token}`})
            .send({
                divObj: divisionObj,
                divName: divisionObj.divisionConcat
            })
            .then((res)=>{
                return res;
               },
                (err)=>{
                    throw err;
                });

        assert(res.status == 200);

        let divisionAfterSave = new Promise( resolve=>{
            setTimeout(async()=>{
                let divisionAfter = await Division.find({"divisionConcat": divisionObj.divisionConcat});
                divisionAfter = divisionAfter[0];
                resolve(divisionAfter);
            },500);
        });

        let divisionOk = await divisionAfterSave.then(r=>{return r;});

        assert(divisionOk.maxMMR == 5000);
        assert(divisionOk.minMMR == 1000);
        assert(divisionOk.public == false);
        assert(divisionOk.divisionName == divisionObj.divisionName);
        assert(divisionOk.divisionConcat == divisionObj.divisionConcat);
           
    });

    it('/admin/upsertDivision should require inputs',async function(){
        await mongoUnit.dropDb();
        mockData['divisions'] = divisionsData;
        await mongoUnit.load(mockData); 

        let requestUrl = `/api/admin/upsertDivision`;

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};
        obj.adminId = admin._id;
        obj.DIVISION = true;

        await new AdminLevel(obj).save();
        const token = generateNewToken.generateNewToken(utils.objectify(admin), obj);
        let res = await request(app.app)
            .post(requestUrl)
            .set({'Authorization': `Bearer ${token}`})
            .send({
                divObj: {},
            })
            .then((res)=>{
                return res;
               },
                (err)=>{
                    throw err;
                });

        assert(res.status != 200);
        assert(res.body.message.includes("divName (string) parameter"));

        res = await request(app.app)
        .post(requestUrl)
        .set({'Authorization': `Bearer ${token}`})
        .send({
            divName: 'name',
        })
        .then((res)=>{
            return res;
           },
            (err)=>{
                throw err;
            });

        assert(res.status != 200);
        assert(res.body.message.includes("divObj (object) parameter"));
           
    });

    it('/admin/upsertDivision should require admin',async function(){
        await mongoUnit.dropDb();
        mockData['divisions'] = divisionsData;
        await mongoUnit.load(mockData); 

        let requestUrl = `/api/admin/upsertDivision`;

        const divisionName = "Upserted Division";

        const divisionObj = {
            divisionName: divisionName,
            divisionConcat: "upserted-division",
            teams:[],
            divisionCoast:null,
            sorting:1,
            maxMMR:2000,
            minMMR:1000,
            moderator:"Joel",
            public:false,
            divColor: "#000000"
        }

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};
        obj.adminId = admin._id;
        obj.DIVISION = false;

        await new AdminLevel(obj).save();
        const token = generateNewToken.generateNewToken(utils.objectify(admin), obj);
        const res = await request(app.app)
            .post(requestUrl)
            .set({'Authorization': `Bearer ${token}`})
            .send({
                divObj: divisionObj,
                divName: divisionName
            })
            .then((res)=>{
                return res;
               },
                (err)=>{
                    throw err;
                });

        assert(res.status == 403);
           
    });

    it('/admin/removeTeams should remove teams from division',async function(){

        let requestUrl = `/api/admin/removeTeams`;

        await mongoUnit.dropDb();
        mockData['divisions'] = divisionsData;
        await mongoUnit.load(mockData);

        const divisionSearch = await Division.find({"divisionConcat": "test-a"});
        const divisionObj = divisionSearch[0];

        const teamName = "TEST Team A";

        const postObj = {
            divName: divisionObj.divisionConcat,
            teams: [teamName]
        }

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};
        obj.adminId = admin._id;
        obj.DIVISION = true;
        await new AdminLevel(obj).save();
        const token = generateNewToken.generateNewToken(utils.objectify(admin), obj);
        const res = await request(app.app)
            .post(requestUrl)
            .set({'Authorization': `Bearer ${token}`})
            .send(postObj)
            .then((res)=>{
                return res;
               },
                (err)=>{
                    throw err;
                });

        assert(res.status == 200);

        let divisionAfterSave = new Promise( resolve=>{
            setTimeout(async()=>{
                let divisionAfter = await Division.find({"divisionConcat": divisionObj.divisionConcat});
                divisionAfter = divisionAfter[0];
                resolve(divisionAfter);
            },500);
        });

        let divisionOk = await divisionAfterSave.then(r=>{return r;});

        assert(divisionOk.teams.includes(teamName) == false);
        
    });

    it('/admin/removeTeams should require admin',async function(){

        let requestUrl = `/api/admin/removeTeams`;

        await mongoUnit.dropDb();
        mockData['divisions'] = divisionsData;
        await mongoUnit.load(mockData);

        const divisionSearch = await Division.find({"divisionConcat": "test-a"});
        const divisionObj = divisionSearch[0];

        const teamName = "TEST Team A";

        const postObj = {
            divName: divisionObj.divisionConcat,
            teams: [teamName]
        }

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};
        obj.adminId = admin._id;
        obj.DIVISION = false;
        await new AdminLevel(obj).save();
        const token = generateNewToken.generateNewToken(utils.objectify(admin), obj);
        const res = await request(app.app)
            .post(requestUrl)
            .set({'Authorization': `Bearer ${token}`})
            .send(postObj)
            .then((res)=>{
                return res;
               },
                (err)=>{
                    throw err;
                });

        assert(res.status == 403);
        
    });

    it('/admin/removeTeams should require inputs',async function(){

        let requestUrl = `/api/admin/removeTeams`;

        await mongoUnit.dropDb();
        mockData['divisions'] = divisionsData;
        await mongoUnit.load(mockData);

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};
        obj.adminId = admin._id;
        obj.DIVISION = true;
        await new AdminLevel(obj).save();
        const token = generateNewToken.generateNewToken(utils.objectify(admin), obj);
        let res = await request(app.app)
            .post(requestUrl)
            .set({'Authorization': `Bearer ${token}`})
            .send({teams: []})
            .then((res)=>{
                return res;
               },
                (err)=>{
                    throw err;
                });

        assert(res.status == 500);

        res = await request(app.app)
        .post(requestUrl)
        .set({'Authorization': `Bearer ${token}`})
        .send({
            divName: 'test'
        })
        .then((res)=>{
            return res;
           },
            (err)=>{
                throw err;
            });

        assert(res.status != 200);
        
    });

    it('/admin/createDivision should create a new division',async function(){
        await mongoUnit.dropDb();
        mockData['divisions'] = divisionsData;
        await mongoUnit.load(mockData);

        let requestUrl = `/api/admin/createDivision`;

        const divisionName = "New Division";

        const divisionObj = {
            divisionName: divisionName,
            divisionConcat: "new-division",
            teams:[],
            divisionCoast:null,
            sorting:1,
            maxMMR:2000,
            minMMR:1000,
            moderator:"Joel",
            public:false,
            divColor: "#000000"
        }

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};
        obj.adminId = admin._id;
        obj.DIVISION = true;

        await new AdminLevel(obj).save();
        const token = generateNewToken.generateNewToken(utils.objectify(admin), obj);
        const res = await request(app.app)
            .post(requestUrl)
            .set({'Authorization': `Bearer ${token}`})
            .send({
                division: divisionObj
            })
            .then((res)=>{
                return res;
               },
                (err)=>{
                    throw err;
                });

        assert(res.status == 200);

        let divisionAfterSave = new Promise( resolve=>{
            setTimeout(async()=>{
                let divisionAfter = await Division.find({"divisionConcat": divisionObj.divisionConcat});
                divisionAfter = divisionAfter[0];
                resolve(divisionAfter);
            },500);
        });

        let divisionOk = await divisionAfterSave.then(r=>{return r;});
        assert(divisionOk.divisionConcat == divisionObj.divisionConcat);

    });

    it('/admin/createDivision should require admin',async function(){
        await mongoUnit.dropDb();
        mockData['divisions'] = divisionsData;
        await mongoUnit.load(mockData);

        let requestUrl = `/api/admin/createDivision`;

        const divisionName = "New Division";

        const divisionObj = {
            divisionName: divisionName,
            divisionConcat: "new-division",
            teams:[],
            divisionCoast:null,
            sorting:1,
            maxMMR:2000,
            minMMR:1000,
            moderator:"Joel",
            public:false,
            divColor: "#000000"
        }

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};
        obj.adminId = admin._id;
        obj.DIVISION = false;

        await new AdminLevel(obj).save();
        const token = generateNewToken.generateNewToken(utils.objectify(admin), obj);
        const res = await request(app.app)
            .post(requestUrl)
            .set({'Authorization': `Bearer ${token}`})
            .send({
                division: divisionObj
            })
            .then((res)=>{
                return res;
               },
                (err)=>{
                    throw err;
                });

        assert(res.status == 403);

    });

    it('/admin/createDivision should require inputs',async function(){
        await mongoUnit.dropDb();
        mockData['divisions'] = divisionsData;
        await mongoUnit.load(mockData);

        let requestUrl = `/api/admin/createDivision`;

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};
        obj.adminId = admin._id;
        obj.DIVISION = true;

        await new AdminLevel(obj).save();
        const token = generateNewToken.generateNewToken(utils.objectify(admin), obj);
        let res = await request(app.app)
            .post(requestUrl)
            .set({'Authorization': `Bearer ${token}`})
            .send({division: {}})
            .then((res)=>{
                return res;
               },
                (err)=>{
                    throw err;
                });

        assert(res.status == 500);

        res = await request(app.app)
        .post(requestUrl)
        .set({'Authorization': `Bearer ${token}`})
        .send({
        })
        .then((res)=>{
            return res;
           },
            (err)=>{
                throw err;
            });

        assert(res.status != 200);
        
    });

    it('/admin/deleteDivision should delete division',async function(){

        await mongoUnit.dropDb();
        mockData['divisions'] = divisionsData;
        await mongoUnit.load(mockData);

        let requestUrl = `/api/admin/deleteDivision`;

        const divisionConcat = "test-a";

        const divisionSearch = await Division.find({"divisionConcat": divisionConcat});
        const divisionObj = divisionSearch[0];

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};
        obj.adminId = admin._id;
        obj.DIVISION = true;

        await new AdminLevel(obj).save();
        const token = generateNewToken.generateNewToken(utils.objectify(admin), obj);
        const res = await request(app.app)
            .post(requestUrl)
            .set({'Authorization': `Bearer ${token}`})
            .send({
                division: divisionObj.divisionConcat
            })
            .then((res)=>{
                return res;
               },
                (err)=>{
                    throw err;
                });

        assert(res.status == 200);

        let divisionAfterSave = new Promise( resolve=>{
            setTimeout(async()=>{
                let divisionAfter = await Division.find({"divisionConcat": divisionObj.divisionConcat});
                resolve(divisionAfter);
            },500);
        });
        
        let divisionOk = await divisionAfterSave.then(r=>{return r;});
        
        assert(divisionOk.length == 0);

    });

    it('/admin/deleteDivision should require admin',async function(){

        await mongoUnit.dropDb();
        mockData['divisions'] = divisionsData;
        await mongoUnit.load(mockData);

        let requestUrl = `/api/admin/deleteDivision`;

        const divisionConcat = "test-a";

        const divisionSearch = await Division.find({"divisionConcat": divisionConcat});
        const divisionObj = divisionSearch[0];

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};
        obj.adminId = admin._id;
        obj.DIVISION = false;

        await new AdminLevel(obj).save();
        const token = generateNewToken.generateNewToken(utils.objectify(admin), obj);
        const res = await request(app.app)
            .post(requestUrl)
            .set({'Authorization': `Bearer ${token}`})
            .send({
                division: divisionObj.divisionConcat
            })
            .then((res)=>{
                return res;
               },
                (err)=>{
                    throw err;
                });

        assert(res.status == 403);

    });

    it('/admin/deleteDivision should require inputs',async function(){

        await mongoUnit.dropDb();
        mockData['divisions'] = divisionsData;
        await mongoUnit.load(mockData);

        let requestUrl = `/api/admin/deleteDivision`;

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};
        obj.adminId = admin._id;
        obj.DIVISION = true;

        await new AdminLevel(obj).save();
        const token = generateNewToken.generateNewToken(utils.objectify(admin), obj);
        let res = await request(app.app)
            .post(requestUrl)
            .set({'Authorization': `Bearer ${token}`})
            .send({})
            .then((res)=>{
                return res;
               },
                (err)=>{
                    throw err;
                });

        assert(res.status == 500);
        assert(res.body.message.includes("recievedDivision (string) parameter"));

    });

    it('/admin/deleteDivision should fail with bad input',async function(){

        await mongoUnit.dropDb();
        mockData['divisions'] = divisionsData;
        await mongoUnit.load(mockData);

        let requestUrl = `/api/admin/deleteDivision`;

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};
        obj.adminId = admin._id;
        obj.DIVISION = true;

        await new AdminLevel(obj).save();
        const token = generateNewToken.generateNewToken(utils.objectify(admin), obj);
        let res = await request(app.app)
            .post(requestUrl)
            .set({'Authorization': `Bearer ${token}`})
            .send({
                division: "silly-goose"
            })
            .then((res)=>{
                return res;
               },
                (err)=>{
                    throw err;
                });

        assert(res.status != 200);

    });

});