const mocha = require('mocha');
const chai = require('chai');
const request = require('supertest');
const assert = require('assert');
const mongoUnit = require('mongo-unit');
const mockData = require('../../mock-data/playerRankRoutes.json');
const utils = require('../../../utils');
const _ = require('lodash');
const SeasonInfoCommon = require('../../../methods/seasonInfoMethods');
const User = require('../../../models/user-models');
const Team = require('../../../models/team-models');
const Message = require('../../../models/message-models');
const Admin = require('../../../models/admin-models');
const sinon = require('sinon');
const hpAPI = require('../../../methods/heroesProfileAPI');
const Avatar = require('../../../methods/avatarUpload');
const System = require('../../../models/system-models');
const { AdminLevel } = require('../../../models/admin-models');
const PendingRankQueue = require('../../../models/admin-models').PendingRankQueue;
const s3putObject = require('../../../methods/aws-s3/put-s3-file');
const playerRankUploads = require('../../../methods/player-rank-upload');


const loadConfig = require('/Users/leegrisham/Documents/workspace_personal/ngs_mean_core/loadConfig');
const message = require('../../../subroutines/message-subs');
let app;
let generateNewToken;
var stub;

before(() =>{
    return loadConfig().then(
    res=>{
       return mongoUnit.start().then(() => {
        generateNewToken = require('../../../configs/passport-setup');
        console.log('fake mongo is started: ', mongoUnit.getUrl())
        process.env.mongoURI = mongoUnit.getUrl() // this var process.env.DATABASE_URL = will keep link to fake mongo
        app = require('../../../../server');
        stub=sinon.stub(s3putObject,'s3putObject').resolves({link:"resolvelink"});
        // mocha.run() // this line start mocha tests
        });
    });
})

describe("player-rank-routes",()=>{

        it("/api/playerrank/get/required return required user ranks", async ()=>{

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
        
        let requestUrl = `/api/playerrank/get/required`;
        
        let result = await request(app.app).get(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status==200);
        assert(result.body.returnObject);

    });

    it("/api/playerrank/upsert upload player rank info", async ()=>{

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let user = await User.find();
        user=user[0];

        const obj = {};

        obj.adminId = user._id;
        obj.USER = true;
 
        await new AdminLevel(obj).save();

        let requiredRanks = await System.system.find({dataName:"requiredRankInfo"});
        requiredRanks = requiredRanks[0];
        const orgirnalLength = requiredRanks.data.length;
        const year = 2023;
        const season = 3;
        const required = true;
        const reqRank = {
            year,
            season,
            required
        }
        requiredRanks.data.push(reqRank);
        const addedLength = requiredRanks.data.length;

        const token = generateNewToken.generateNewToken(utils.objectify(user), false);
        
        let requestUrl = `/api/playerrank/upsert`;
        const payload = {
            requiredRanks
        }
        let result = await request(app.app).post(requestUrl)
        .set({"Authorization": `Bearer ${token}`})
        .send(payload)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        

        assert(result.status==200);
        assert(result.body.returnObject.data.length == addedLength)
        
    });
    
    it("/api/playerrank/upload user uploads required rank", async ()=>{

        

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let user = await User.find();
        user=user[0];
        
        let requestUrl = `/api/playerrank/upload`;
        const year = 2023;
        const season = 3;
        const required = true;
        const reqRank = {
            year,
            season,
            required
        }
        const payload = {
            logo:'imagestringhere',
            seasonInf:reqRank
        }

        const token = generateNewToken.generateNewToken(utils.objectify(user), false);
        
        let result = await request(app.app).post(requestUrl)
        .set({"Authorization": `Bearer ${token}`})
        .send(payload)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        let queue = await PendingRankQueue.find();
        queue = queue[0];

        assert(queue.year == reqRank.year);
        assert(queue.season == reqRank.season);
        assert(queue.userId == user._id);
        
        assert(result.status==200);
        assert(result.body.returnObject);

    });

        it("/api/playerrank/capt/upload user uploads required rank", async ()=>{

        // var stub = sinon.stub(s3putObject,'s3putObject').resolves({link:"resolvelink"});

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let captain = await User.find({"displayName": "TEST azalea#9539"});
        captain=captain[0];
        
        let requestUrl = `/api/playerrank/capt/upload`;

        const year = 2023;
        const season = 3;
        const required = true;
        const reqRank = {
            year,
            season,
            required
        }

        let user = await User.find({"displayName": "TEST hyena#4375"});
        user=user[0];

        const payload = {
            logo:'imagestringhere',
            userId:user._id,
            seasonInf:reqRank
        }

        const token = generateNewToken.generateNewToken(utils.objectify(captain), false);
        
        let result = await request(app.app).post(requestUrl)
        .set({"Authorization": `Bearer ${token}`})
        .send(payload)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        let queue = await PendingRankQueue.find();
        queue = queue[0];

        assert(queue.year == reqRank.year);
        assert(queue.season == reqRank.season);
        assert(queue.userId == user._id);
        
        assert(result.status==200);
        assert(result.body.returnObject);

    });

    it("/api/playerrank/capt/upload user fail non captain required rank", async ()=>{

        // var stub = sinon.stub(s3putObject,'s3putObject').resolves({link:"resolvelink"});

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let captain = await User.find({"displayName": "TEST mountain goat#1399"});
        captain=captain[0];
        
        let requestUrl = `/api/playerrank/capt/upload`;

        const year = 2023;
        const season = 3;
        const required = true;
        const reqRank = {
            year,
            season,
            required
        }

        let user = await User.find({"displayName": "TEST hyena#4375"});
        user=user[0];

        const payload = {
            logo:'imagestringhere',
            userId:user._id,
            seasonInf:reqRank
        }

        const token = generateNewToken.generateNewToken(utils.objectify(captain), false);
        
        let result = await request(app.app).post(requestUrl)
        .set({"Authorization": `Bearer ${token}`})
        .send(payload)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        let queue = await PendingRankQueue.find();
        queue = queue[0];
        
        assert(result.status==403);

    });

        it("/api/playerrank/usersReporting get report list", async ()=>{

        // var stub = sinon.stub(s3putObject,'s3putObject').resolves({link:"resolvelink"});

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
        
        let requestUrl = `/api/playerrank/usersReporting`;

        let user = await User.find();
        user = user[0];

        let team = await Team.find();
        team=team[0];

        const payload = {
            members:team.teamMembers
        }

        const token = generateNewToken.generateNewToken(utils.objectify(user), false);
        let result = await request(app.app).post(requestUrl)
        .set({"Authorization": `Bearer ${token}`})
        .send(payload)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        
        assert(result.status==200);
        assert(result.body.returnObject.reported==0);

    });

            it("/api/playerrank/usersReporting get report list", async ()=>{

        // var stub = sinon.stub(s3putObject,'s3putObject').resolves({link:"resolvelink"});

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
        
        let requestUrl = `/api/playerrank/usersReporting`;

        let team = await Team.find();
        team=team[0];
        

        let user = await User.find({displayName:team.teamMembers[0].displayName});
        user = user[0];

        user.verifiedRankHistory = [ 
            {
            "hlRankMetal" : "Platinum",
            "hlRankDivision" : 1,
            "season" : "3",
            "year" : "2020",
            "level" : 20,
            "status" : "verified"
            },
            {
            "hlRankMetal" : "Platinum",
            "hlRankDivision" : 1,
            "season" : "4",
            "year" : "2020",
            "level" : 20,
            "status" : "verified"
            },
            {
            "hlRankMetal" : "Platinum",
            "hlRankDivision" : 2,
            "season" : "1",
            "year" : "2021",
            "level" : 19,
            "status" : "verified"
            }
        ];

        await user.save();

        const payload = {
            members:team.teamMembers
        }

        const token = generateNewToken.generateNewToken(utils.objectify(user), false);
        let result = await request(app.app).post(requestUrl)
        .set({"Authorization": `Bearer ${token}`})
        .send(payload)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        
        assert(result.status==200);
        assert(result.body.returnObject.reported==1);

    });

});

after(()=>{
    app.server.close();
})