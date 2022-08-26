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
var sandbox;

const challongeCreateSeasonResponse = require('../../mock-data/newTournament-season.json');
const challongeBulkSeasonParticpantsAddResponse = require('../../mock-data/addParticipants-season.json');
const challongeStartSeasonResponse = require('../../mock-data/startStatus-season.json');
const challongeShowSeasonResponse = require('../../mock-data/showTournament-season.json');





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

        it('/api/schedule/generate/schedules should generate schedule', async()=>{
            await mongoUnit.dropDb();
            await mongoUnit.load(standings); 

            var challongeCreateTournament = sandbox.stub(challonge,'createTournament').resolves(Promise.resolve(challongeCreateSeasonResponse));
            var challongeBulkParticpantsAdd = sandbox.stub(challonge,'bulkParticpantsAdd').resolves(Promise.resolve(challongeBulkSeasonParticpantsAddResponse));
            var challongeStartTournament = sandbox.stub(challonge,'startTournament').resolves(Promise.resolve(challongeStartSeasonResponse));
            var challongeShowTournament = sandbox.stub(challonge,'showTournament').resolves(Promise.resolve(challongeShowSeasonResponse));

            const casterName = "TEST azalea#9539";
            let caster = await User.find({displayName:casterName});
            caster=caster[0];

            const obj = {};

            obj.adminId = caster._id;
            obj.SCHEDULEGEN = true;

            let division = await Division.find();

            division=division[0];

            division.DRR=false;

            await division.save();

            await new AdminLevel(obj).save();
                
            let teams = await Team.find();

            const payload = {
                season:14,
                teams:teams
            }

            const token = generateNewToken.generateNewToken(utils.objectify(caster), false);
            let result = await request(app.app).post("/api/schedule/generate/schedules")
                .set({"Authorization": `Bearer ${token}`})
                .send(payload).then((res)=>{
                    return res;
                },
                (err)=>{
                    console.log("error XXX", err);
                    throw err;
                });

                let fun = new Promise( resolve=>{
                    setTimeout(
                        ()=>{
                            Scheduling.find().then(
                                res=>{
                                    resolve(res[0]);
                                }
                            )
                        }
                    ),1000
                } );

                let schedule =  await Scheduling.find().then(
                                res=>{
                                    return res[0];
                                }
                            )

              let matches = await Match.find({$and:[{season:14},{type:"seasonal"}]});

              assert(result.status == 200);
              assert(schedule!=null);
              assert(schedule.division["d-beast"].matches.length==matches.length);
              assert(schedule.division["d-beast"].matches.length==(challongeShowSeasonResponse.tournament.matches.length));
            
        });

         it('/api/schedule/generate/schedules should generate schedule DRR', async()=>{
            await mongoUnit.dropDb();
            await mongoUnit.load(standings); 

            var challongeCreateTournament = sandbox.stub(challonge,'createTournament').resolves(Promise.resolve(challongeCreateSeasonResponse));
            var challongeBulkParticpantsAdd = sandbox.stub(challonge,'bulkParticpantsAdd').resolves(Promise.resolve(challongeBulkSeasonParticpantsAddResponse));
            var challongeStartTournament = sandbox.stub(challonge,'startTournament').resolves(Promise.resolve(challongeStartSeasonResponse));
            var challongeShowTournament = sandbox.stub(challonge,'showTournament').resolves(Promise.resolve(challongeShowSeasonResponse));

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
            let result = await request(app.app).post("/api/schedule/generate/schedules")
                .set({"Authorization": `Bearer ${token}`})
                .send(payload).then((res)=>{
                    return res;
                },
                (err)=>{
                    console.log("error XXX", err);
                    throw err;
                });


                let schedule = await Scheduling.find().then(
                    res=>{
                        return res[0];
                    }
                )

              let matches = await Match.find({$and:[{season:14},{type:"seasonal"}]});

              assert(result.status == 200);
              assert(schedule!=null);
              assert(schedule.division["d-beast"].matches.length==matches.length);
              assert(schedule.division["d-beast"].matches.length==(challongeShowSeasonResponse.tournament.matches.length*2));
            
        });

        it('/api/schedule/generate/schedules should generate schedule error', async()=>{
            await mongoUnit.dropDb();
            await mongoUnit.load(standings); 

            var challongeCreateTournament = sandbox.stub(challonge,'createTournament').resolves(Promise.reject("Error"));
            var challongeBulkParticpantsAdd = sandbox.stub(challonge,'bulkParticpantsAdd').resolves(Promise.resolve(challongeBulkSeasonParticpantsAddResponse));
            var challongeStartTournament = sandbox.stub(challonge,'startTournament').resolves(Promise.resolve(challongeStartSeasonResponse));
            var challongeShowTournament = sandbox.stub(challonge,'showTournament').resolves(Promise.resolve(challongeShowSeasonResponse));

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
            let result = await request(app.app).post("/api/schedule/generate/schedules")
                .set({"Authorization": `Bearer ${token}`})
                .send(payload).then((res)=>{
                    return res;
                },
                (err)=>{
                    console.log("error XXX", err);
                    throw err;
                });

              let schedule = await Scheduling.find().then(
                    res=>{
                        return res[0];
                    }
                )

              let matches = await Match.find({$and:[{season:14},{type:"seasonal"}]});
              
              assert(result.status == 500);
              assert(schedule==null);
              assert(matches.length==0);
              
        });

        it('/api/schedule/generate/schedules should generate schedule error', async()=>{
            await mongoUnit.dropDb();
            await mongoUnit.load(standings); 

            // var challongeCreateTournament = sandbox.stub(challonge,'createTournament').resolves(challongeCreateSeasonResponse);
            // var challongeBulkParticpantsAdd = sandbox.stub(challonge,'bulkParticpantsAdd').resolves(Promise.resolve(Promise.reject("Error")));
            // var challongeStartTournament = sandbox.stub(challonge,'startTournament').resolves(Promise.resolve(challongeStartSeasonResponse));
            // var challongeShowTournament = sandbox.stub(challonge,'showTournament').resolves(Promise.resolve(challongeShowSeasonResponse));

            var challongeCreateTournament = sandbox.stub(challonge,'createTournament').resolves(challongeCreateSeasonResponse);
            var challongeBulkParticpantsAdd = sandbox.stub(challonge,'bulkParticpantsAdd').resolves(Promise.resolve(Promise.reject("Error")));
            var challongeStartTournament = sandbox.stub(challonge,'startTournament').resolves(Promise.resolve(challongeStartSeasonResponse));
            var challongeShowTournament = sandbox.stub(challonge,'showTournament').resolves(Promise.resolve(challongeShowSeasonResponse));

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
            let result = await request(app.app).post("/api/schedule/generate/schedules")
                .set({"Authorization": `Bearer ${token}`})
                .send(payload).then((res)=>{
                    return res;
                },
                (err)=>{
                    console.log("error XXX", err);
                    throw err;
                });

              let schedule = await Scheduling.find().then(
                    res=>{
                        return res[0];
                    }
                )

              let matches = await Match.find({$and:[{season:14},{type:"seasonal"}]});
              
              assert(result.status == 500);
              assert(schedule==null);
              assert(matches.length==0);
              
        });

        it('/api/schedule/generate/schedules should generate schedule error', async()=>{
            await mongoUnit.dropDb();
            await mongoUnit.load(standings); 

            // var challongeCreateTournament = sandbox.stub(challonge,'createTournament').resolves(challongeCreateSeasonResponse);
            // var challongeBulkParticpantsAdd = sandbox.stub(challonge,'bulkParticpantsAdd').resolves(Promise.resolve(Promise.reject("Error")));
            // var challongeStartTournament = sandbox.stub(challonge,'startTournament').resolves(Promise.resolve(challongeStartSeasonResponse));
            // var challongeShowTournament = sandbox.stub(challonge,'showTournament').resolves(Promise.resolve(challongeShowSeasonResponse));

            var challongeCreateTournament = sandbox.stub(challonge,'createTournament').resolves(challongeCreateSeasonResponse);
            var challongeBulkParticpantsAdd = sandbox.stub(challonge,'bulkParticpantsAdd').resolves(Promise.resolve(challongeBulkSeasonParticpantsAddResponse));
            var challongeStartTournament = sandbox.stub(challonge,'startTournament').resolves(Promise.resolve(Promise.reject("Error")));
            var challongeShowTournament = sandbox.stub(challonge,'showTournament').resolves(Promise.resolve(challongeShowSeasonResponse));

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
            let result = await request(app.app).post("/api/schedule/generate/schedules")
                .set({"Authorization": `Bearer ${token}`})
                .send(payload).then((res)=>{
                    return res;
                },
                (err)=>{
                    console.log("error XXX", err);
                    throw err;
                });

              let schedule = await Scheduling.find().then(
                    res=>{
                        return res[0];
                    }
                )

              let matches = await Match.find({$and:[{season:14},{type:"seasonal"}]});
              
              assert(result.status == 500);
              assert(schedule==null);
              assert(matches.length==0);
              
        });

        it('/api/schedule/generate/schedules should generate schedule error', async()=>{
            await mongoUnit.dropDb();
            await mongoUnit.load(standings); 

            var challongeCreateTournament = sandbox.stub(challonge,'createTournament').resolves(challongeCreateSeasonResponse);
            var challongeBulkParticpantsAdd = sandbox.stub(challonge,'bulkParticpantsAdd').resolves(Promise.resolve(challongeBulkSeasonParticpantsAddResponse));
            var challongeStartTournament = sandbox.stub(challonge,'startTournament').resolves(Promise.resolve(challongeStartSeasonResponse));
            var challongeShowTournament = sandbox.stub(challonge,'showTournament').resolves(Promise.resolve(Promise.reject("Error")));

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
            let result = await request(app.app).post("/api/schedule/generate/schedules")
                .set({"Authorization": `Bearer ${token}`})
                .send(payload).then((res)=>{
                    return res;
                },
                (err)=>{
                    console.log("error XXX", err);
                    throw err;
                });

              let schedule = await Scheduling.find().then(
                    res=>{
                        return res[0];
                    }
                )

              let matches = await Match.find({$and:[{season:14},{type:"seasonal"}]});
              
              assert(result.status == 500);
              assert(schedule==null);
              assert(matches.length==0);
              
        });

});

after(()=>{
    app.server.close();
})