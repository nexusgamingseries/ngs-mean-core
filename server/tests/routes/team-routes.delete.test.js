const mocha = require('mocha');
const chai = require('chai');
const request = require('supertest');
const assert = require('assert');
const mongoUnit = require('mongo-unit');
const registeredTeamData = require('../mock-data/registeredTeams.json');
const unRegisteredTeamData = require('../mock-data/unRegisteredTeams.json');
const Team = require('../../models/team-models');
const mongoose = require('mongoose');

const loadConfig = require('/Users/leegrisham/Documents/workspace_personal/ngs_mean_core/loadConfig');
let app;


before(() =>{
    return loadConfig().then(
    res=>{
       return mongoUnit.start().then(() => {
        console.log('fake mongo is started: ', mongoUnit.getUrl())
        process.env.mongoURI = mongoUnit.getUrl() // this var process.env.DATABASE_URL = will keep link to fake mongo
        app = require('../../../server');
        // mocha.run() // this line start mocha tests
        });
    });
})

describe("team-routes",()=>{

        it("/api/team/get (single team) (team name)", async ()=>{
        await mongoUnit.dropDb();
        return mongoUnit.load(registeredTeamData).then(
            loaded=>{

                return request(app.app).get("/api/team/get?team=TEST%20readable%20trolls").then((res)=>{
                  assert(Object.keys(res.body.returnObject).length>0);
                });
            },
            err=>{
                console.log("error 2", err);
            }
        )
    });

});

after(()=>{
    app.server.close();
})