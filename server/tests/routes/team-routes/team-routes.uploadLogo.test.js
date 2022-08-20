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
const s3putObject = require('../../methods/aws-s3/put-s3-file');
const s3deleteFile = require('../../methods/aws-s3/delete-s3-file');
const Team = require('../../models/team-models');
const User = require('../../models/user-models');
const Division = require('../../models/division-models');
const Admin = require('../../models/admin-models');

const mongoose = require('mongoose');

const loadConfig = require('/Users/leegrisham/Documents/workspace_personal/ngs_mean_core/loadConfig');
let app;
let generateNewToken;

//TODO: fix the errors thrown by the rank finder... 
const expectedResponse = {data:{"hello!":{}}};

before(() =>{
    
    const res = sinon.spy();
    const aStub = sinon.stub(axios, "get").resolves(Promise.resolve(expectedResponse));
    var stub = sinon.stub(s3putObject,'s3putObject').resolves(Promise.resolve(expectedResponse));
    var dstub = sinon.stub(s3deleteFile,'s3deleteFile').resolves(Promise.resolve(expectedResponse));
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

        it("/api/team/uploadLogo good data as captain", async ()=>{

        
        const longstring = "big long string";
        var dataUri = "data:text/plain;base64,"+ Buffer.from(longstring,'base64');

        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete);

        let testTeamName = "TEST sunshine mynah birds";
        let captain = await User.find({"displayName":"TEST azalea#9539"}).then(
            found=>{
                return found[0];
            }
        );

        const token = generateNewToken.generateNewToken(utils.objectify(captain), false);
        const payload = {
            teamName: testTeamName,
            logo:dataUri
        };

        let result = await request(app.app).post("/api/team/uploadLogo")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        // console.log("$$$", result);
        assert(result.status==200);

        let savedTeam = await Team.find({teamName:testTeamName}).then( r=>{return r[0];});

        assert(savedTeam.logo != null);
        
    });

        it("/api/team/uploadLogo good data as captain, replace old string", async ()=>{

        
        const longstring = "big long string";
        var dataUri = "data:text/plain;base64,"+ Buffer.from(longstring,'base64');

        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete);

        let testTeamName = "TEST sunshine mynah birds";
        let captain = await User.find({"displayName":"TEST azalea#9539"}).then(
            found=>{
                return found[0];
            }
        );

        let team = await Team.find({teamName:testTeamName}).then(r => { return r[0]});

        let logoString = "asdfasdfasdfasdf";
        team.logo= logoString;
        team.save();

        const token = generateNewToken.generateNewToken(utils.objectify(captain), false);
        const payload = {
            teamName: testTeamName,
            logo:dataUri
        };

        let result = await request(app.app).post("/api/team/uploadLogo")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        // console.log("$$$", result);
        assert(result.status==200);

        let savedTeam = await Team.find({teamName:testTeamName}).then( r=>{return r[0];});
        assert(savedTeam.logo != logoString);
        assert(savedTeam.logo != null);
        
    });


});

after(()=>{
    app.server.close();
})