const mocha = require('mocha');
const chai = require('chai');
var sinonChai = require("sinon-chai");
chai.use(sinonChai);
const expect = chai.expect;
const request = require('supertest');
const assert = require('assert');
const sinon = require('sinon');
const mongoUnit = require('mongo-unit');
const mockTourn = require('../../mock-data/scheudle-tournDelete-mockdata.json');
const utils = require('../../../utils');
const Match = require('../../../models/match-model');
const User = require('../../../models/user-models');
const Scheduling = require('../../../models/schedule-models');
const { AdminLevel } = require('../../../models/admin-models');
const challonge = require('../../../methods/challongeAPI');


const loadConfig = require('/Users/leegrisham/Documents/workspace_personal/ngs_mean_core/loadConfig');
let app;
let generateNewToken;
var sandbox;

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

beforeEach(()=>{
    sandbox = sinon.createSandbox();
})

afterEach(()=>{
   sandbox.restore(); 
})

describe("schedule-routes",()=>{

    it('/api/schedule/generate/tournament should delete tournament records',async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockTourn); 

        const casterName = "TEST azalea#9539";
        let caster = await User.find({displayName:casterName});
        caster=caster[0];

        const obj = {};

        obj.adminId = caster._id;
        obj.SCHEDULEGEN = true;

        await new AdminLevel(obj).save();
        
        let schedule = await Scheduling.find();

        schedule = schedule[0];

        let challongeRef = schedule.get("challonge_ref");

        const token = generateNewToken.generateNewToken(utils.objectify(caster), false);
        let result = await request(app.app).get(`/api/schedule/delete/tournament?tournId=${challongeRef}`)
            .set({"Authorization": `Bearer ${token}`})
            .then((res)=>{
                return res;
            },
            (err)=>{
                console.log("error XXX", err);
                throw err;
            });

        assert(result.status == 200);
   
        let matches = await Match.find({challonge_tournament_ref:challongeRef});
        let scheduleAfter = await Scheduling.find({challonge_ref:challongeRef});

        assert(matches.length==0);
        assert(scheduleAfter.length==0);
        expect(stub).to.have.been.called;

        });

        it('/api/schedule/generate/tournament error without proper access',async ()=>{
            await mongoUnit.dropDb();
            await mongoUnit.load(mockTourn); 

        const casterName = "TEST azalea#9539";
        let caster = await User.find({displayName:casterName});
        caster=caster[0];


        const obj = {};

        await new AdminLevel(obj).save();
        
        let schedule = await Scheduling.find();

        schedule = schedule[0];

        let challongeRef = schedule.get("challonge_ref");

            const token = generateNewToken.generateNewToken(utils.objectify(caster), false);
            let result = await request(app.app).get(`/api/schedule/delete/tournament?tournId=${challongeRef}`)
        .set({"Authorization": `Bearer ${token}`})
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 403);
        expect(stub).to.have.been.not.called;
    

        });

});

after(()=>{
    app.server.close();
})

/*
    it("api/schedule/fetch/reported/matches get reported matches", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

        let currentSeasonInfo = await SeasonInfoCommon.getSeasonInfo();
        const payload = {
            season: currentSeasonInfo.value,
        };
        let count = await Match.find({$and:[{reported:true},{season:currentSeasonInfo.value}]}).then(found=>{
            return found.length;
        });
        
        let result = await request(app.app).post("api/schedule/fetch/reported/matches")
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        console.log(result)
        let returnObject = result.body.returnObject;
        console.log(returnObject);
        assert(returnObject.length==count);
        assert(result.status==200);
    
    });
*/