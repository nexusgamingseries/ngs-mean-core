const mocha = require('mocha');
const chai = require('chai');
const request = require('supertest');
const assert = require('assert');
const mongoUnit = require('mongo-unit');
const standings = require('../../mock-data/standingsData.json');
const utils = require('../../../utils');
const _ = require('lodash');
const SeasonInfoCommon = require('../../../methods/seasonInfoMethods');
const Division = require('../../../models/division-models');


const loadConfig = require('/Users/leegrisham/Documents/workspace_personal/ngs_mean_core/loadConfig');
let app;


before(() =>{
    return loadConfig().then(
    res=>{
       return mongoUnit.start().then(() => {
        console.log('fake mongo is started: ', mongoUnit.getUrl())
        process.env.mongoURI = mongoUnit.getUrl() // this var process.env.DATABASE_URL = will keep link to fake mongo
        app = require('../../../../server');
        // mocha.run() // this line start mocha tests
        });
    });
})

describe("team-routes",()=>{

        it("/api/standings/fetch/division create good data", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 
        let division = await Division.find({}).then(
            found=>{
                return found[0];
            }
        );
        let currentSeasonInfo = await SeasonInfoCommon.getSeasonInfo();
        const payload = {
            division: division.divisionConcat,
            season: currentSeasonInfo.value

        };
        let result = await request(app.app).post("/api/standings/fetch/division")
        // .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        let returnObject = result.body.returnObject;
        assert(Array.isArray(returnObject))
        assert(returnObject.length == division.teams.length);
        //pick any random standing object..
        let tObj = returnObject[returnObject.length-1];
        assert(tObj.hasOwnProperty("wins"));
        assert(tObj.hasOwnProperty("points"));
        assert(tObj.hasOwnProperty("losses"));
        assert(tObj.hasOwnProperty("dominations"));
        assert(tObj.hasOwnProperty("matchesPlayed"));
        assert(tObj.hasOwnProperty("logo"));
        assert(tObj.hasOwnProperty("teamName"));
        assert(tObj.hasOwnProperty("standing"));
        assert(result.status==200);
    
    
    });

    it("/api/standings/fetch/division bad data", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 
        let division = await Division.find({}).then(
            found=>{
                return found[0];
            }
        );
        let currentSeasonInfo = await SeasonInfoCommon.getSeasonInfo();
        const payload = {
            division: 'nonexistingdivision',
            season: currentSeasonInfo.value

        };
        let result = await request(app.app).post("/api/standings/fetch/division")
        // .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 200);
        assert(result.body.hasOwnProperty("returnObject")==false);
    
    
    });


});

after(()=>{
    app.server.close();
})