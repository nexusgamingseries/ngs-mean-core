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

    it("/api/team/get (single team) (team ticker)", async ()=>{
        await mongoUnit.dropDb();
        return mongoUnit.load(registeredTeamData).then(
            loaded=>{

                return request(app.app).get("/api/team/get?ticker=qqqq").then((res)=>{
                  assert(Object.keys(res.body.returnObject).length>0);
                });
            },
            err=>{
                console.log("error 3", err);
            }
        )
    });

        it("/api/team/get (single team) (team id)", async ()=>{
        await mongoUnit.dropDb();
        return mongoUnit.load(registeredTeamData).then(
            loaded=>{
                let objectIds = loaded[0].insertedIds;
                return request(app.app).get("/api/team/get?teamId="+objectIds[0]).then((res)=>{
                  assert(Object.keys(res.body.returnObject).length>0);
                });
            },
            err=>{
                console.log("error 3", err);
            }
        )
    });

    it("/team/get/registered with teams registered", async ()=>{
        //configure the database...
        await mongoUnit.dropDb();
        return mongoUnit.load(registeredTeamData).then(
            loaded=>{
                return request(app.app).get("/api/team/get/registered").then((res)=>{
                  assert(res.body.returnObject.length>0)
                });
            },
            err=>{
                console.log("error 4", err);
            }
        )
    })

        it("/team/get/registered 0 teams registered", async ()=>{
        //configure the database...
        await mongoUnit.dropDb();
        return mongoUnit.load(unRegisteredTeamData).then(
            loaded=>{
                return request(app.app).get("/api/team/get/registered").then((res)=>{
                    assert(res.body.returnObject.length==0)
                });
            },
            err=>{
                console.log("error 5", err);
            }
        )
    });

    it("/api/team/fetch/teams (multiple teams) (teamName)", async ()=>{
        await mongoUnit.dropDb();
        return mongoUnit.load(registeredTeamData).then(
            loaded=>{
                const payload = {
                    teams:["TEST sunshine mynah birds","TEST inheriting weasels"]
                }
                return request(app.app).post("/api/team/fetch/teams").send(payload).then((res)=>{
                  assert(res.body.returnObject.length==2)
                });
            },
            err=>{
                console.log("error 6", err);
            }
        )
    })

    //TODO: apparently team id searches are bunk
        it("/api/team/fetch/teams (multiple teams) (teamIds)", async ()=>{
        await mongoUnit.dropDb();
        return mongoUnit.load(registeredTeamData).then(
            loaded=>{
                let objectIds = loaded[0].insertedIds;
                const payload = {
                    "teamIds":[objectIds[0],objectIds[2]]
                }
                return request(app.app).post("/api/team/fetch/teams").send(payload).then((res)=>{
                  assert(res.body.returnObject.length==2);
                });
            },
            err=>{
                console.log("xxxx error 7", err);
            }
        )
    })

    it("/api/team/fetch/teams (multiple teams) (team tickers)", async ()=>{
        await mongoUnit.dropDb();
        return mongoUnit.load(registeredTeamData).then(
            loaded=>{
                const payload = {
                    "teamTickers":["qqqq","eeee"]
                }
                return request(app.app).post("/api/team/fetch/teams").send(payload).then((res)=>{
                  assert(res.body.returnObject.length==2);
                });
            },
            err=>{
                console.log("error 1", err);
            }
        )
    })

});

after(()=>{
    app.server.close();
})
