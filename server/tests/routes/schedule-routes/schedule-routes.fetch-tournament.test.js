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
const Team = require('../../../models/team-models');
const Scheduling = require('../../../models/schedule-models');
const { AdminLevel } = require('../../../models/admin-models');
const System = require('../../../models/system-models');
const challonge = require('../../../methods/challongeAPI');
const _ = require('lodash');


const loadConfig = require('/Users/leegrisham/Documents/workspace_personal/ngs_mean_core/loadConfig');
let app;
let generateNewToken;
var sandbox;
var stub

before(() =>{
    return loadConfig().then(
    res=>{
       return mongoUnit.start().then(() => {
        
        
        generateNewToken = require('../../../configs/passport-setup');
        console.log('fake mongo is started: ', mongoUnit.getUrl())
        process.env.mongoURI = mongoUnit.getUrl() // this var process.env.DATABASE_URL = will keep link to fake mongo
        app = require('../../../../server');
        stub = sinon.stub(challonge,'deleteTournament').resolves(Promise.resolve({data:"hello!"}));
        // mocha.run() // this line start mocha tests
        });
    });
})

beforeEach(()=>{
    sandbox = sinon.createSandbox();
    stub.reset();
})

afterEach(()=>{
   sandbox.restore(); 
})

describe("schedule-routes",()=>{

    it('/api/schedule/fetch/team/tournament/matches should get tournament matches for team',async ()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockTourn); 

        await cleanUpMatchRoles();

        await cleanUpParticipantRoles();

        // let teams = await Team.find();
        let schedule = await Scheduling.find();
        schedule=schedule[0];
        
        let teamId = schedule.get("participants")[0];

        let team = await Team.find({_id:teamId});

        const payload = {
            teamId:teamId,
            season:schedule.season
        };

        });

          it('/api/schedule/fetch/team/tournament/matches should get tournament matches for team',async ()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockTourn); 

        await cleanUpMatchRoles();
        await cleanUpParticipantRoles();

        let scheduleQuery = {
            $and: [{
                    'dataName': 'seasonInfo'
                },
                {
                    'data.value': 15
                }
            ]
        };

        let postedInfo = {
            'dataName': 'seasonInfo',
            'data': 15
        };

        await System.system.findOneAndUpdate(
                scheduleQuery, postedInfo, {
                    new: true,
                    upsert: true
                }
            );

        let team = await Team.find();
        team=team[0];
        let schedule = await Scheduling.find();
        schedule = schedule[0];
        const payload = {
            teamId:team._id,
            season:schedule.season
        };

        

        let result = await request(app.app).post(`/api/schedule/fetch/team/tournament/matches`)
            .send(payload)
            .then((res)=>{
                return res;
            },
            (err)=>{
                console.log("error XXX", err);
                throw err;
            });

        assert(result.status == 200);
        assert(result.body.returnObject.length>0)

        });

          it('/schedule/get/tournament/past should get closed tournaments',async ()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockTourn); 

        await cleanUpMatchRoles();

        let result = await request(app.app).get(`/api/schedule/get/tournament/past`)
            .then((res)=>{
                return res;
            },
            (err)=>{
                console.log("error XXX", err);
                throw err;
            });

        assert(result.status == 200);
        assert(result.body.returnObject.length>0)

        });

        it('/schedule/fetch/team/tournament should return all tournament objects that team is particpant in',async ()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockTourn); 

        await cleanUpMatchRoles();
        await cleanUpParticipantRoles();

        let teams = await Team.find();

        let team = teams[0];

        const payload = {
            teamId:team._id
        }

        let result = await request(app.app).post(`/api/schedule/fetch/team/tournament`)
            .send(payload)
            .then((res)=>{
                return res;
            },
            (err)=>{
                console.log("error XXX", err);
                throw err;
            });

        assert(result.status == 200);
        assert(result.body.returnObject.length>0)

        });

        it('/schedule/fetch/tournament/active should return all active tournaments that team is particpant in',async ()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockTourn); 

        await cleanUpMatchRoles();
        await cleanUpParticipantRoles();

        let s = await Scheduling.find();
        s=s[0];
        s.active=true;
        await s.save();

        let activeTourns = await Scheduling.find({active:true});

        let result = await request(app.app).get(`/api/schedule/fetch/tournament/active`)
            .then((res)=>{
                return res;
            },
            (err)=>{
                console.log("error XXX", err);
                throw err;
            });



        assert(result.status == 200);
        assert(result.body.returnObject.length==activeTourns.length);

        });

        it('/schedule/fetch/team/tournament/active should return all tournament objects that team is particpant in',async ()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockTourn); 

        await cleanUpMatchRoles();
        await cleanUpParticipantRoles();

        let teams = await Team.find();

        let team = teams[0];

        const payload = {
            teamId:team._id
        }

        let s = await Scheduling.find();
        s=s[0];
        s.active=true;
        await s.save();

        let result = await request(app.app).post(`/api/schedule/fetch/team/tournament/active`)
            .send(payload)
            .then((res)=>{
                return res;
            },
            (err)=>{
                console.log("error XXX", err);
                throw err;
            });

        assert(result.status == 200);
        assert(result.body.returnObject.length>0)

        });

        it('/schedule/fetch/team/tournament/season should return all tournament objects that team is particpant in',async ()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockTourn); 

        await cleanUpMatchRoles();
        await cleanUpParticipantRoles();

        let schedule = await Scheduling.find();
        schedule = schedule[0];


        const payload = {
            teamId:schedule.get("participants")[0],
            season:schedule.season
        }


        let result = await request(app.app).post(`/api/schedule/fetch/team/tournament/season`)
            .send(payload)
            .then((res)=>{
                return res;
            },
            (err)=>{
                console.log("error XXX", err);
                throw err;
            });

        assert(result.status == 200);
        assert(result.body.returnObject.length>0)

        });

        it('/schedule/fetch/tournament return tournament by query params, season',async ()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockTourn); 

        await cleanUpMatchRoles();
        await cleanUpParticipantRoles();

        let schedule = await Scheduling.find();
        schedule = schedule[0];


        const payload = {
            season:schedule.season
        }

        
        let result = await request(app.app).post(`/api/schedule/fetch/tournament`)
            .send(payload)
            .then((res)=>{
                return res;
            },
            (err)=>{
                console.log("error XXX", err);
                throw err;
            });
        assert(result.status == 200);
        assert(Object.keys(result.body.returnObject).length>0)

        });

         it('/schedule/fetch/tournament return tournament by query params, division',async ()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockTourn); 

        await cleanUpMatchRoles();
        await cleanUpParticipantRoles();

        let schedule = await Scheduling.find();
        schedule = schedule[0];
        const div = "testDiv";
        schedule.division=div;
        await schedule.save();


        const payload = {
            division:div
        }

        
        let result = await request(app.app).post(`/api/schedule/fetch/tournament`)
            .send(payload)
            .then((res)=>{
                return res;
            },
            (err)=>{
                console.log("error XXX", err);
                throw err;
            });
        assert(result.status == 200);
        assert(Object.keys(result.body.returnObject).length>0)

        });

        it('/schedule/fetch/tournament return tournament by query params, tournament name',async ()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockTourn); 

        await cleanUpMatchRoles();
        await cleanUpParticipantRoles();

        let schedule = await Scheduling.find();
        schedule = schedule[0];

        const payload = {
            tournamentName:schedule.name
        }
        
        let result = await request(app.app).post(`/api/schedule/fetch/tournament`)
            .send(payload)
            .then((res)=>{
                return res;
            },
            (err)=>{
                console.log("error XXX", err);
                throw err;
            });
        assert(result.status == 200);
        assert(Object.keys(result.body.returnObject).length>0)

        });

        it('/schedule/fetch/tournament return tournament by query params, tournamentIds',async ()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockTourn); 

        await cleanUpMatchRoles();
        await cleanUpParticipantRoles();

        let schedule = await Scheduling.find();
        schedule = schedule[0];

        const payload = {
            tournamentName:schedule.challonge_ref
        }
        
        let result = await request(app.app).post(`/api/schedule/fetch/tournament`)
            .send(payload)
            .then((res)=>{
                return res;
            },
            (err)=>{
                console.log("error XXX", err);
                throw err;
            });
        assert(result.status == 200);
        assert(Object.keys(result.body.returnObject).length>0)

        });

             it('/schedule/fetch/tournament return tournament by query params, all params',async ()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockTourn); 

        await cleanUpMatchRoles();
        await cleanUpParticipantRoles();

        let schedule = await Scheduling.find();
        schedule = schedule[0];
        const div = "testDiv";
        schedule.division=div;
        await schedule.save();

        const payload = {
            season:schedule.season,
            division:schedule.division,
            tournamentName:schedule.name,
            tournamentIds:schedule.challonge_ref
        }
        
        let result = await request(app.app).post(`/api/schedule/fetch/tournament`)
            .send(payload)
            .then((res)=>{
                return res;
            },
            (err)=>{
                console.log("error XXX", err);
                throw err;
            });
        assert(result.status == 200);
        assert(Object.keys(result.body.returnObject).length>0)

        });

});

after(()=>{
    app.server.close();
})

async function cleanUpMatchRoles(){
        let teams = await Team.find().then(r=>{return r});
        let matches = await Match.find().then(r=>{return r});
        teams.forEach(
            team=>{
                matches.forEach(match=>{
                    if(match.home.teamName==team.teamName){
                        match.home.id=team._id;
                    }
                    if(match.away.teamName==team.teamName){
                        match.away.id = team._id;
                    }
                })
            }
        );
        for(var i=0;i<matches.length;i++){
            let iter = matches[i];
            await iter.save();
        }
        return true;
}

async function cleanUpParticipantRoles(){
    let schedules = await Scheduling.find();
    let teams = await Team.find();
    let nt = [];
    teams.forEach(t=>{
        nt.push(utils.objectify(t));
    });

    for(var i = 0; i<schedules.length; i++){

        let schedule = schedules[i];
        
        let np = [];
        schedule.get("participants").forEach(
            part=>{

                let team = _.find(nt,{"oldId":part});

                if(team){
                    np.push(team._id);
                }
            }
        )
        schedule.set("participants", np);
        schedule.markModified('participants');
        
        await schedule.save();

    }
    return true;
}

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