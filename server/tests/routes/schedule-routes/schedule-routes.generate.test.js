const mocha = require('mocha');
const chai = require('chai');
const request = require('supertest');
const assert = require('assert');
const sinon = require('sinon');
const mongoUnit = require('mongo-unit');
const standings = require('../../mock-data/standingsData.json');
const utils = require('../../../utils');
const _ = require('lodash');
const SeasonInfoCommon = require('../../../methods/seasonInfoMethods');
const Match = require('../../../models/match-model');
const Division = require('../../../models/division-models');
const User = require('../../../models/user-models');
const Team = require('../../../models/team-models');
const Scheduling = require('../../../models/schedule-models');
const CasterReport = require('../../../models/caster-report-models');
const { AdminLevel } = require('../../../models/admin-models');
const challonge = require('../../../methods/challongeAPI');


const loadConfig = require('/Users/leegrisham/Documents/workspace_personal/ngs_mean_core/loadConfig');
let app;
let generateNewToken;

const challongeCreateResponse = require('../../mock-data/challonge.createTournament.json');
const challongeBulkParticpantsAddResponse = require('../../mock-data/challonge.bulkParticpantsAdd.json');
const challongeStartTournamentResposne = require('../../mock-data/challonge.startTournament.json');
const challongeShowTournamentResponse = require('../../mock-data/challonge.showTournament.json');

before(() =>{
    return loadConfig().then(
    res=>{
       return mongoUnit.start().then(() => {
        var challongeCreateTournament = sinon.stub(challonge,'createTournament').resolves(Promise.resolve(challongeCreateResponse));
        var challongeBulkParticpantsAdd = sinon.stub(challonge,'bulkParticpantsAdd').resolves(Promise.resolve(challongeBulkParticpantsAddResponse));
        var challongeStartTournament = sinon.stub(challonge,'startTournament').resolves(Promise.resolve(challongeStartTournamentResposne));
        var challongeShowTournament = sinon.stub(challonge,'showTournament').resolves(Promise.resolve(challongeShowTournamentResponse));

        generateNewToken = require('../../../configs/passport-setup');
        console.log('fake mongo is started: ', mongoUnit.getUrl())
        process.env.mongoURI = mongoUnit.getUrl() // this var process.env.DATABASE_URL = will keep link to fake mongo
        app = require('../../../../server');
        // mocha.run() // this line start mocha tests
        });
    });
})

describe("schedule-routes",()=>{

        it('/api/schedule/generate/tournament should generate tournament',async ()=>{
            await mongoUnit.dropDb();
            await mongoUnit.load(standings); 

        const casterName = "TEST azalea#9539";
        let caster = await User.find({displayName:casterName});
        caster=caster[0];

        const obj = {};

        obj.adminId = caster._id;
        obj.SCHEDULEGEN = true;

        await new AdminLevel(obj).save();
            
            let teams = await Team.find();


            const payload = {
                season:14,
                teams:teams
            }


            const token = generateNewToken.generateNewToken(utils.objectify(caster), false);
            let result = await request(app.app).post("/api/schedule/generate/tournament")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        console.log('result', result);
        })

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