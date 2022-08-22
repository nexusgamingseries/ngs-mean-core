const mocha = require('mocha');
const chai = require('chai');
const request = require('supertest');
const assert = require('assert');
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


const loadConfig = require('/Users/leegrisham/Documents/workspace_personal/ngs_mean_core/loadConfig');
let app;
let generateNewToken;

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

describe("team-routes",()=>{

        it("/api/schedule/fetch/matches fetch season matches", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 
        let division = await Division.find({}).then(
            found=>{
                return found[0];
            }
        );
        let count = await Match.find({"season":13}).then(found=>{return found.length;})
        let currentSeasonInfo = await SeasonInfoCommon.getSeasonInfo();
        const payload = {
            season: currentSeasonInfo.value
        };
        let result = await request(app.app).post("/api/schedule/fetch/matches")
        // .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        let returnObject = result.body.returnObject;
        assert(Array.isArray(returnObject));
        assert(returnObject.length==count);
        assert(returnObject[0].hasOwnProperty("matchId"));
        assert(result.status==200);
    
    });

            it("/api/schedule/fetch/matches fetch season matches +division+round", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 
        let division = await Division.find({}).then(
            found=>{
                return found[0];
            }
        );
        let currentSeasonInfo = await SeasonInfoCommon.getSeasonInfo();
        let round = 2;
        let count = await Match.find({$and:[{season:currentSeasonInfo.value}, {divisionConcat:division.divisionConcat},{round:round}]}).then(found=>{
            return found.length;
        })
        const payload = {
            season: currentSeasonInfo.value,
            division:division.divisionConcat,
            round:round
        };
        let result = await request(app.app).post("/api/schedule/fetch/matches")
        // .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        let returnObject = result.body.returnObject;
        assert(Array.isArray(returnObject));
        assert(returnObject.length==count);
        assert(returnObject[0].hasOwnProperty("matchId"));
        assert(result.status==200);
    
    });

                it("/api/schedule/get/grandchampions get season finale matches", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 
        let division = await Division.find({}).then(
            found=>{
                return found[0];
            }
        );
        let currentSeasonInfo = await SeasonInfoCommon.getSeasonInfo();
        const payload = {
            season: currentSeasonInfo.value,
            division:division.divisionConcat,
            round:2
        };
        let result = await request(app.app).get("/api/schedule/get/grandchampions")
        // .set({"Authorization": `Bearer ${token}`})
       .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        let returnObject = result.body.returnObject;

        assert(Object.keys(returnObject).length>0);
        assert(result.status==200);
    
    });

          it("/api/schedule/fetch/reported/matches fetch season matches", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 
        let division = await Division.find({}).then(
            found=>{
                return found[0];
            }
        );

        let currentSeasonInfo = await SeasonInfoCommon.getSeasonInfo();
        let count = await Match.find({$and:[{season:currentSeasonInfo.value}, {reported:true}]}).then(found=>{
            return found.length;
        })
        const payload = {
            season: currentSeasonInfo.value
        };
        let result = await request(app.app).post("/api/schedule/fetch/reported/matches")
        // .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        let returnObject = result.body.returnObject;
        assert(Array.isArray(returnObject));
        assert(returnObject.length==count);
        assert(returnObject[0].hasOwnProperty("matchId"));
        assert(result.status==200);
    
    });

              it("/api/schedule/fetch/reported/matches fetch season matches+division", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 
        let division = await Division.find({}).then(
            found=>{
                return found[0];
            }
        );

        let currentSeasonInfo = await SeasonInfoCommon.getSeasonInfo();
        let count = await Match.find(
            {
                $and:[
                    {season:currentSeasonInfo.value}, 
                    {divisionConcat:division.divisionConcat}, 
                    {reported:true}
                ]
            }).then(found=>{
            return found.length;
        })
        const payload = {
            season: currentSeasonInfo.value, 
            division:division.divisionConcat,
        };
        let result = await request(app.app).post("/api/schedule/fetch/reported/matches")
        // .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        let returnObject = result.body.returnObject;
        assert(Array.isArray(returnObject));
        assert(returnObject.length==count);
        assert(result.status==200);
    
    });

    it("/api/schedule/fetch/division/matches fetch season+division", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 
        let division = await Division.find({}).then(
            found=>{
                return found[0];
            }
        );

        let currentSeasonInfo = await SeasonInfoCommon.getSeasonInfo();
        let count = await Match.find(
            {
                $and:[
                    {season:currentSeasonInfo.value}, 
                    {divisionConcat:division.divisionConcat}, 
                ]
            }).then(found=>{
            return found.length;
        })
        const payload = {
            season: currentSeasonInfo.value, 
            division:division.divisionConcat,
        };
        let result = await request(app.app).post("/api/schedule/fetch/division/matches")
        // .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        let returnObject = result.body.returnObject;
        assert(Array.isArray(returnObject));
        assert(returnObject.length==count);
        assert(result.status==200);
    
    });

        it("/api/schedule/fetch/division/matches bad division name", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 
        let division = await Division.find({}).then(
            found=>{
                return found[0];
            }
        );

        let currentSeasonInfo = await SeasonInfoCommon.getSeasonInfo();
        let count = await Match.find(
            {
                $and:[
                    {season:currentSeasonInfo.value}, 
                    {divisionConcat:division.divisionConcat}, 
                ]
            }).then(found=>{
            return found.length;
        })
        const payload = {
            season: currentSeasonInfo.value, 
            division:'fakeDivision',
        };
        let result = await request(app.app).post("/api/schedule/fetch/division/matches")
        // .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        let returnObject = result.body.returnObject;
        assert(Array.isArray(returnObject));
        assert(returnObject.length==0);
        assert(result.status==200);
    
    });

           it("/api/schedule/fetch/matches/all gets all matches ever...", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

        let count = await Match.find(
            {
            }).then(found=>{
            return found.length;
        })
        const user = await User.find().then(u=>{return u[0]});
        const token = generateNewToken.generateNewToken(utils.objectify(user), false);
        const payload = {
        };
        let result = await request(app.app).post("/api/schedule/fetch/matches/all")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        let returnObject = result.body.returnObject;
        assert(Array.isArray(returnObject));
        assert(returnObject.length==count);
        assert(result.status==200);
    
    });

               it("/api/schedule/query/matches accepts custom mongo query...", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

           let division = await Division.find({}).then(
            found=>{
                return found[0];
            }
        );

        let currentSeasonInfo = await SeasonInfoCommon.getSeasonInfo();
        let query = {
                $and:[
                    {season:currentSeasonInfo.value}, 
                    {divisionConcat:division.divisionConcat}, 
                    {reported:true}
                ]
            };
        let count = await Match.find(query).then(found=>{
            return found.length;
        })

        const user = await User.find().then(u=>{return u[0]});
        const token = generateNewToken.generateNewToken(utils.objectify(user), false);
        const payload = query;
        let result = await request(app.app).post("/api/schedule/query/matches")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        let returnObject = result.body.returnObject;
        assert(Array.isArray(returnObject));
        assert(returnObject.length==count);
        assert(result.status==200);
    
    });

                  it("/api/schedule/query/matches accepts custom mongo query fails empty query...", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

           let division = await Division.find({}).then(
            found=>{
                return found[0];
            }
        );

        
        let query = {
                
            };
        let count = await Match.find(query).then(found=>{
            return found.length;
        })

        const user = await User.find().then(u=>{return u[0]});
        const token = generateNewToken.generateNewToken(utils.objectify(user), false);
        const payload = query;
        let result = await request(app.app).post("/api/schedule/query/matches")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        // let returnObject = result.body.returnObject;
        // assert(Array.isArray(returnObject));
        // assert(returnObject.length==count);
        assert(result.status==500);
    
    });

    //TODO: create an error creating query..
    //                   it("/api/schedule/query/matches accepts custom mongo query fails bad query...", async ()=>{
    //     await mongoUnit.dropDb();
    //     await mongoUnit.load(standings); 

    //        let division = await Division.find({}).then(
    //         found=>{
    //             return found[0];
    //         }
    //     );

    //     let currentSeasonInfo = await SeasonInfoCommon.getSeasonInfo();
    //     let query = {season:currentSeasonInfo.value,divisionConcat:division.divisionConcat,reported:true}
    //     let count = await Match.find(query).then(found=>{
    //         return found.length;
    //     })

    //     const user = await User.find().then(u=>{return u[0]});
    //     const token = generateNewToken.generateNewToken(utils.objectify(user), false);
    //     const payload = query;
    //     let result = await request(app.app).post("/api/schedule/query/matches")
    //     .set({"Authorization": `Bearer ${token}`})
    //     .send(payload).then((res)=>{
    //         return res;
    //     },
    //     (err)=>{
    //         console.log("error XXX", err);
    //         throw err;
    //     });
    //     // let returnObject = result.body.returnObject;
    //     // assert(Array.isArray(returnObject));
    //     // assert(returnObject.length==count);
    //     console.log(result);
    //     assert(result.status==500);
    
    // });

    it("/api/schedule/get/matches/casted/playing gets all casted matches currently being played", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

        let match = await Match.find().then(found=>{
            return found[0];
        })

        let time = Date.now();
        time = time - 100;
        match.scheduledTime = {startTime:time, endTime:time+1000}
        await match.save();

        let result = await request(app.app).get("/api/schedule/get/matches/casted/playing")
        // .set({"Authorization": `Bearer ${token}`})
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        let returnObject = result.body.returnObject;
        assert(Array.isArray(returnObject));
        assert(returnObject.length==1);
        assert(result.status==200);
    
    });

        it("/api/schedule/get/matches/casted/playing gets all casted matches currently being played NONE", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

        let result = await request(app.app).get("/api/schedule/get/matches/casted/playing")
        // .set({"Authorization": `Bearer ${token}`})
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        let returnObject = result.body.returnObject;
        assert(Array.isArray(returnObject));
        assert(returnObject.length==0);
        assert(result.status==200);
    
    });

            it("/api/schedule/fetch/matchup/history gets all past team match ups", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

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
        let teamName1 = "TEST assigned daffodils";
        let teamName2 = "TEST woeful impalas";
        let team1Obj = _.find(teams, {teamName:teamName1});
        let team2Obj = _.find(teams, {teamName:teamName2});
        const payload = {
            teamAid:team1Obj._id,
            teamBid:team2Obj._id
        }

        let result = await request(app.app).post("/api/schedule/fetch/matchup/history")
        // .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        let returnObject = result.body.returnObject;
        assert(Array.isArray(returnObject));
        assert(returnObject.length>0);
        assert(result.status==200);
    
    });

            it("/api/schedule/fetch/fetch/matches/team gets all team matches for season", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

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

        let currentSeasonInfo = await SeasonInfoCommon.getSeasonInfo();

        const payload = {
            season:currentSeasonInfo.value,
            team:teams[0].teamName
        };

        let result = await request(app.app).post("/api/schedule/fetch/matches/team")
        // .set({"Authorization": `Bearer ${token}`})
        .send(payload).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        let returnObject = result.body.returnObject;
        assert(Array.isArray(returnObject));
        assert(returnObject.length>0);
        assert(result.status==200);
    
    });


                it("/api/schedule/get/matches/scheduled gets all scheduled matches for season", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 


        let matches = await Match.find().then(r=>{return r});
        let count = 0;
        matches.forEach((match, ind)=>{
            
            if(match.season==13 && ind<5){
                let time = Date.now();
                match.scheduledTime = {startTime:time, endTime:time+1000}
                count++;
            }else{
                match.scheduledTime={};
            }
        })

        for(var i=0;i<matches.length;i++){
            let iter = matches[i];
            await iter.save();
        }


        let result = await request(app.app).get("/api/schedule/get/matches/scheduled")
        // .set({"Authorization": `Bearer ${token}`})
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        let returnObject = result.body.returnObject;
        assert(Array.isArray(returnObject));
        assert(returnObject.length==count);
        assert(result.status==200);
    
    });

                    it("/api/schedule/update/match/time captain can set schedule time", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

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

        let teamName = "TEST sunshine mynah birds"
        let team = _.find(teams, {teamName:teamName});
        let match;
        matches.forEach(m=>{
            if(m.away.teamName == teamName || m.home.teamName == teamName ){
                match = m;
            }
        });

        const payload = {
            matchId:match.matchId,
            scheduledStartTime:Date.now(),
            scheduledEndTime:Date.now()+1000
        }

        let user = await User.find({displayName:team.captain}).then(r=>{return r[0]});
        
        const token = generateNewToken.generateNewToken(utils.objectify(user), false);
        
        let result = await request(app.app).post("/api/schedule/update/match/time")
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
        assert(result.body.message == 'Match schedule saved');
        assert(Object.keys(result.body.returnObject).length>0)
    
    });

                  it("/api/schedule/update/match/time assistant captain can set schedule time", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

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

        let teamName = "TEST sunshine mynah birds"
        let team = _.find(teams, {teamName:teamName});
        let match;
        matches.forEach(m=>{
            if(m.away.teamName == teamName || m.home.teamName == teamName ){
                match = m;
            }
        });

        const payload = {
            matchId:match.matchId,
            scheduledStartTime:Date.now(),
            scheduledEndTime:Date.now()+1000
        }

        let user = await User.find({displayName:team.assistantCaptain[0]}).then(r=>{return r[0]});
        const token = generateNewToken.generateNewToken(utils.objectify(user), false);
        
        let result = await request(app.app).post("/api/schedule/update/match/time")
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
        assert(result.body.message == 'Match schedule saved');
        assert(Object.keys(result.body.returnObject).length>0)
    
    });

    it("/api/schedule/update/match/time unauthorized can not set schedule time", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

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

        let teamName = "TEST sunshine mynah birds"
        let team = _.find(teams, {teamName:teamName});
        let match;
        matches.forEach(m=>{
            if(m.away.teamName == teamName || m.home.teamName == teamName ){
                match = m;
            }
        });

        const payload = {
            matchId:match.matchId,
            scheduledStartTime:Date.now(),
            scheduledEndTime:Date.now()+1000
        }

        let dontPickUser = [team.captain];
        dontPickUser = dontPickUser.concat(team.assistantCaptain);

        let usertoget; 
        team.teamMembers.forEach(
            m=>{
                if(dontPickUser.indexOf(m.displayName)==-1){
                    usertoget = m.displayName
                }
            }
        )

        let user = await User.find({displayName:usertoget}).then(r=>{return r[0]});
        const token = generateNewToken.generateNewToken(utils.objectify(user), false);
        
        let result = await request(app.app).post("/api/schedule/update/match/time")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status==403);
        assert(result.body.message == 'Requester is not authorized');
    
    });

            it("/api/schedule/update/match/time can not schedule all ready scheduled match.", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

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

        let teamName = "TEST sunshine mynah birds"
        let team = _.find(teams, {teamName:teamName});
        let match;
        matches.forEach(m=>{
            if(m.away.teamName == teamName || m.home.teamName == teamName ){
                match = m;
            }
        });

        match.scheduledTime = {
            startTime:Date.now(),
            endTime:Date.now()+1000,
            priorScheduled:true
        };
        await match.save();

        const payload = {
            matchId:match.matchId,
            scheduledStartTime:Date.now(),
            scheduledEndTime:Date.now()+1000
        }

        let user = await User.find({displayName:team.captain}).then(r=>{return r[0]});
        
        const token = generateNewToken.generateNewToken(utils.objectify(user), false);
        
        let result = await request(app.app).post("/api/schedule/update/match/time")
        .set({"Authorization": `Bearer ${token}`})
        .send(payload)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        
        assert(result.status==400);
        assert(result.body.message == 'Match has all ready been scheduled');
    
    });

        it("/api/schedule/fetch/match gets specified match.", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

                let teams = await Team.find().then(r=>{return r});
        let matches = await Match.find().then(r=>{return r});
        
            let match = matches[Math.floor((Math.random()*matches.length))];

        const payload = {
            matchId:match.matchId,
        }


        let result = await request(app.app).post("/api/schedule/fetch/match")
        // .set({"Authorization": `Bearer ${token}`})
        .send(payload)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        
        assert(result.status==200);
        assert(result.body.returnObject!=null)
    
    });


    //TODO: test this route more thouroly with files?
            it("/api/schedule/report/match reports specified match as captain", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

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

        let teamName = "TEST sunshine mynah birds"
        let match = await Match.find({$and:[
            {$or:[
                {"home.teamName":teamName},
                {"away.teamName":teamName}
            ]},
            {season:13},
            {reported:null}
        ]});
        match=match[0];
        

        

        let team = await Team.find({teamName:teamName});



        let captain = await User.find({displayName:team[0].captain});

        match.home.score=2;
        match.away.score=0;

        const token = generateNewToken.generateNewToken(utils.objectify(captain[0]), false);
        let result = await request(app.app).post("/api/schedule/report/match")
        .set({"Authorization": `Bearer ${token}`})
        .send(utils.objectify(match))
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status==200);
        
    });

         it("/api/schedule/report/match reports specified match assistant captain.", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

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

        let teamName = "TEST sunshine mynah birds"
        let match = await Match.find({$and:[
            {$or:[
                {"home.teamName":teamName},
                {"away.teamName":teamName}
            ]},
            {season:13},
            {reported:null}
        ]});
        match=match[0];




        let team = await Team.find({teamName:teamName});



        let captain = await User.find({displayName:team[0].assistantCaptain[0]});

        match.home.score=2;
        match.away.score=0;

        const token = generateNewToken.generateNewToken(utils.objectify(captain[0]), false);
        let result = await request(app.app).post("/api/schedule/report/match")
        .set({"Authorization": `Bearer ${token}`})
        .send(utils.objectify(match))
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status==200);
        
    });

    it("/api/schedule/report/match reports specified match not captain.", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

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

        let teamName = "TEST sunshine mynah birds"
        let match = await Match.find({$and:[
            {$or:[
                {"home.teamName":teamName},
                {"away.teamName":teamName}
            ]},
            {season:13},
            {reported:null}
        ]});
        match=match[0];

        let captain = await User.find({displayName:"TEST lily#3664"});
        match.home.score=2;
        match.away.score=0;

        const token = generateNewToken.generateNewToken(utils.objectify(captain[0]), false);
        let result = await request(app.app).post("/api/schedule/report/match")
        .set({"Authorization": `Bearer ${token}`})
        .send(utils.objectify(match))
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status==500);
        
    });

    it("/api/schedule/report/cast reports cast details", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

        const casterName = "TEST azalea#9539";
        const cocasterName = "TEST zombie#1270";
        const casterReport = {
            "report":
            {
                "coCasters":[cocasterName],
                "coCasterIds":[],
                "vodLinks":["https://youtu.be/RsELrcVNzG0"],
                "matchId":"gd3ud66ail6ftd3vd",
                "casterName": casterName,
                "division":"d-beast",
                "season":13,
                "issues":"This is an issue"
            }
        }

        let caster = await User.find({displayName:casterName});


        const token = generateNewToken.generateNewToken(utils.objectify(caster[0]), false);
        let result = await request(app.app).post("/api/schedule/report/cast")
        .set({"Authorization": `Bearer ${token}`})
        .send(casterReport)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        
        const rObj = result.body.returnObject;
        assert(rObj.casterName == casterName);
        assert(rObj.coCasters[0]==cocasterName);
        assert(result.status==200);
        
    });

    it("/api/schedule/report/cast report fails if caster name is omitted", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

        const casterName = "TEST azalea#9539";
        let caster = await User.find({displayName:casterName});

        const cocasterName = "TEST zombie#1270";
        let cocaster = await User.find({displayName:cocasterName});
        const casterReport = {
            "report":
            {
                "coCasterIds":[cocaster[0]._id],
                "vodLinks":["https://youtu.be/RsELrcVNzG0"],
                "matchId":"gd3ud66ail6ftd3vd",
                "casterId":caster[0]._id,
                "division":"d-beast",
                "season":13,
                "issues":"This is an issue"
            }
        }

        


        const token = generateNewToken.generateNewToken(utils.objectify(caster[0]), false);
        let result = await request(app.app).post("/api/schedule/report/cast")
        .set({"Authorization": `Bearer ${token}`})
        .send(casterReport)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        
        assert(result.status == 500);
        
    });

     it("/api/schedule/report/cast report fails if match id is not found", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

        const casterName = "TEST azalea#9539";
        let caster = await User.find({displayName:casterName});

        const cocasterName = "TEST zombie#1270";
        let cocaster = await User.find({displayName:cocasterName});
        const casterReport = {
            "report":
            {
                "coCasters":[cocasterName],
                "coCasterIds":[],
                "vodLinks":["https://youtu.be/RsELrcVNzG0"],
                "matchId":"gobblygook",
                "casterName": casterName,
                "season":13,
                "issues":"This is an issue"
            }
        }

        


        const token = generateNewToken.generateNewToken(utils.objectify(caster[0]), false);
        let result = await request(app.app).post("/api/schedule/report/cast")
        .set({"Authorization": `Bearer ${token}`})
        .send(casterReport)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 500);
        
    });

    it("/api/schedule/report/cast report should append event if no division attached", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

        const casterName = "TEST azalea#9539";
        let caster = await User.find({displayName:casterName});

        const cocasterName = "TEST zombie#1270";
        let cocaster = await User.find({displayName:cocasterName});
        const casterReport = {
            "report":
            {
                "coCasters":[cocasterName],
                "coCasterIds":[],
                "vodLinks":["https://youtu.be/RsELrcVNzG0"],
                "matchId":"qpbrmznk9bx6anzz",
                "casterName": casterName,
                "season":13,
                "issues":"This is an issue"
            }
        }

        const eventName = "I test when I want to";
       await new Scheduling({
               "type" : "tournament",
                "name" : eventName,
                "matches":[
                    "qpbrmznk9bx6anzz"
                ]
        }).save();

        


        const token = generateNewToken.generateNewToken(utils.objectify(caster[0]), false);
        let result = await request(app.app).post("/api/schedule/report/cast")
        .set({"Authorization": `Bearer ${token}`})
        .send(casterReport)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        const rObj = result.body.returnObject;
        assert(rObj.event == eventName);
        assert(result.status == 200);
        
    });

    it("/api/schedule/report/cast report should error if no division attached and no event found", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

        const casterName = "TEST azalea#9539";
        let caster = await User.find({displayName:casterName});

        const cocasterName = "TEST zombie#1270";
        let cocaster = await User.find({displayName:cocasterName});
        const casterReport = {
            "report":
            {
                "coCasters":[cocasterName],
                "coCasterIds":[],
                "vodLinks":["https://youtu.be/RsELrcVNzG0"],
                "matchId":"qpbrmznk9bx6anzz",
                "casterName": casterName,
                "season":13,
                "issues":"This is an issue"
            }
        }

        


        const token = generateNewToken.generateNewToken(utils.objectify(caster[0]), false);
        let result = await request(app.app).post("/api/schedule/report/cast")
        .set({"Authorization": `Bearer ${token}`})
        .send(casterReport)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 500);
        
    });

    /**
     * {
5:10:09 PM test.1 |    coCasters: [ 'TEST zombie#1270' ],
5:10:09 PM test.1 |    coCasterIds: [ '6302ad40ac6b6720b64360e9' ],
5:10:09 PM test.1 |    vodLinks: [ 'https://youtu.be/RsELrcVNzG0' ],
5:10:09 PM test.1 |    _id: '6302ad41f9095cdae98da6bb',
5:10:09 PM test.1 |    matchId: 'gd3ud66ail6ftd3vd',
5:10:09 PM test.1 |    __v: 0,
5:10:09 PM test.1 |    casterId: '6302ad40ac6b6720b64360e5',
5:10:09 PM test.1 |    casterName: 'TEST azalea#9539',
5:10:09 PM test.1 |    division: 'd-beast',
5:10:09 PM test.1 |    season: 13
5:10:09 PM test.1 |  }
     */

 it("/api/schedule/report/cast get caster report by match ID", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

        const casterName = "TEST azalea#9539";
        let caster = await User.find({displayName:casterName});

        let matchId = 'gd3ud66ail6ftd3vd';

        const saved = await new CasterReport.CasterReport({
            coCasters: [ 'TEST zombie#1270' ],
            coCasterIds: [ '6302ad40ac6b6720b64360e9' ],
             vodLinks: [ 'https://youtu.be/RsELrcVNzG0' ],
             matchId: matchId,
             casterId: '6302ad40ac6b6720b64360e5',
             casterName: 'TEST azalea#9539',
             division: 'd-beast',
             season: 13
        }).save();


        const token = generateNewToken.generateNewToken(utils.objectify(caster[0]), false);
        let result = await request(app.app).get(`/api/schedule/report/cast?matchId=${matchId}`)
        .set({"Authorization": `Bearer ${token}`})
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 200);
        assert(Object.keys(result.body.returnObject).length>0);
        assert(result.body.returnObject.matchId == matchId);
        
    });

    it("/api/schedule/report/cast get empty object with bad ID", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

        const casterName = "TEST azalea#9539";
        let caster = await User.find({displayName:casterName});

        let matchId = 'gobbldygook';


        const token = generateNewToken.generateNewToken(utils.objectify(caster[0]), false);
        let result = await request(app.app).get(`/api/schedule/report/cast?matchId=${matchId}`)
        .set({"Authorization": `Bearer ${token}`})
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 200);
        assert(result.body.hasOwnProperty("returnObject")==false);
        
    });

        it("/api/schedule/match/add/caster add caster to match", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

        const casterName = "TEST azalea#9539";
        let caster = await User.find({displayName:casterName});

        let match = await Match.find();

        match = match[0];

        const casterUrl = "casterurl.url";

        const payload = {
            matchId:match.matchId,
            casterName:casterName,
            casterUrl: casterUrl
        };

                const obj = {};

        obj.adminId = caster[0]._id;
        obj.CASTER = true;

        await new AdminLevel(obj).save();


        const token = generateNewToken.generateNewToken(utils.objectify(caster[0]), false);
        let result = await request(app.app).post(`/api/schedule/match/add/caster`)
        .set({"Authorization": `Bearer ${token}`})
        .send(payload)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });


        assert(result.status == 200);
        assert(result.body.returnObject.casterName == casterName);
        assert(result.body.returnObject.casterUrl == casterUrl);
        
        
    });

      it("/api/schedule/match/add/caster should fail if user does not have caster permissions", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

        const casterName = "TEST azalea#9539";
        let caster = await User.find({displayName:casterName});

        let match = await Match.find();

        match = match[0];

        const casterUrl = "casterurl.url";

        const payload = {
            matchId:match.matchId,
            casterName:casterName,
            casterUrl: casterUrl
        };


        const token = generateNewToken.generateNewToken(utils.objectify(caster[0]), false);
        let result = await request(app.app).post(`/api/schedule/match/add/caster`)
        .set({"Authorization": `Bearer ${token}`})
        .send(payload)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });


        assert(result.status == 403);
        
        
    });

    it("/api/schedule/match/add/caster should fail if match id not found", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

        const casterName = "TEST azalea#9539";
        let caster = await User.find({displayName:casterName});

        let match = await Match.find();

        match = match[0];

        const casterUrl = "casterurl.url";

        const payload = {
            matchId:"gobbledygook",
            casterName:casterName,
            casterUrl: casterUrl
        };

                        const obj = {};

        obj.adminId = caster[0]._id;
        obj.CASTER = true;

        await new AdminLevel(obj).save();

        const token = generateNewToken.generateNewToken(utils.objectify(caster[0]), false);
        let result = await request(app.app).post(`/api/schedule/match/add/caster`)
        .set({"Authorization": `Bearer ${token}`})
        .send(payload)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 400);
        
    });

    it("/api/schedule/match/fetch/mycasted should get matches casted by user", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

        const casterName = "TEST azalea#9539";
        let caster = await User.find({displayName:casterName});

        caster = caster[0];

        caster.casterName = casterName;
        const casterUrl = "testtwitch.tv/asdf";
        caster.twitch = casterUrl;

        await caster.save();

        let matches = await Match.find();

        let currentSeasonInfo = await SeasonInfoCommon.getSeasonInfo();

        matches = _.filter(matches, {season:currentSeasonInfo.value});

        for(var ind = 0; ind<matches.length; ind++)
        {
            let m = matches[ind];
                if(ind<2){
                    m.casterUrl = casterUrl;
                    m.casterName = casterName;
                    await m.save();
                }
                if(ind>=2&&ind<4){
                    m.casterUrl = casterUrl;
                    await m.save();
                }
                if(ind>=4&&ind<6){
                    m.casterName = casterName;
                    await m.save();
                }
        }

        const obj = {};

        obj.adminId = caster._id;
        obj.CASTER = true;

        await new AdminLevel(obj).save();

        const token = generateNewToken.generateNewToken(utils.objectify(caster), false);
        let result = await request(app.app).post(`/api/schedule/match/fetch/mycasted`)
        .set({"Authorization": `Bearer ${token}`})
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 200);
        assert(result.body.returnObject.length == 6);
        
    });

    it("/api/schedule/match/fetch/mycasted no caster permission not allowed", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

        const casterName = "TEST azalea#9539";
        let caster = await User.find({displayName:casterName});

        caster = caster[0];

        caster.casterName = casterName;
        const casterUrl = "testtwitch.tv/asdf";
        caster.twitch = casterUrl;

        await caster.save();

        const token = generateNewToken.generateNewToken(utils.objectify(caster), false);
        let result = await request(app.app).post(`/api/schedule/match/fetch/mycasted`)
        .set({"Authorization": `Bearer ${token}`})
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 403);
        
    });

    it("/api/schedule/match/add/caster/occ should add caster info to match", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

        const casterName = "TEST azalea#9539";
        let caster = await User.find({displayName:casterName});
        caster = caster[0];
        caster.casterName = casterName;
        const casterUrl = "testtwitch.tv/asdf";
        caster.twitch = casterUrl;

        await caster.save();

        let matches = await Match.find();

        match = matches[0];

        const obj = {};

        obj.adminId = caster._id;
        obj.CASTER = true;

        await new AdminLevel(obj).save();

        const payload = {
            matchId:match.matchId
        }

        const token = generateNewToken.generateNewToken(utils.objectify(caster), false);
        let result = await request(app.app).post(`/api/schedule/match/add/caster/occ`)
        .set({"Authorization": `Bearer ${token}`})
        .send(payload)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 200);
        assert(result.body.returnObject.casterName == casterName);
        assert(result.body.returnObject.casterUrl == casterUrl);
        
    });

    it("/api/schedule/match/add/caster/occ should fail if no caster info on profile", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

        const casterName = "TEST azalea#9539";
        let caster = await User.find({displayName:casterName});
        caster = caster[0];
        caster.casterName = casterName;
        const casterUrl = "testtwitch.tv/asdf";
        caster.twitch = casterUrl;

        

        let matches = await Match.find();

        match = matches[0];

        const obj = {};

        obj.adminId = caster._id;
        obj.CASTER = true;

        await new AdminLevel(obj).save();

        const payload = {
            matchId:match.matchId
        }

        const token = generateNewToken.generateNewToken(utils.objectify(caster), false);
        let result = await request(app.app).post(`/api/schedule/match/add/caster/occ`)
        .set({"Authorization": `Bearer ${token}`})
        .send(payload)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 500);
        
    });

    it("/api/schedule/match/add/caster/occ should fail if no caster permissions", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

        const casterName = "TEST azalea#9539";
        let caster = await User.find({displayName:casterName});
        caster = caster[0];
        caster.casterName = casterName;
        const casterUrl = "testtwitch.tv/asdf";
        caster.twitch = casterUrl;

        

        let matches = await Match.find();

        match = matches[0];

        const payload = {
            matchId:match.matchId
        }

        const token = generateNewToken.generateNewToken(utils.objectify(caster), false);
        let result = await request(app.app).post(`/api/schedule/match/add/caster/occ`)
        .set({"Authorization": `Bearer ${token}`})
        .send(payload)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 403);
        
    });

    it("/api/schedule/match/add/caster/occ should fail with bad match Id", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

        const casterName = "TEST azalea#9539";
        let caster = await User.find({displayName:casterName});
        caster = caster[0];
        caster.casterName = casterName;
        const casterUrl = "testtwitch.tv/asdf";
        caster.twitch = casterUrl;

        await caster.save();

        const obj = {};

        obj.adminId = caster._id;
        obj.CASTER = true;

        await new AdminLevel(obj).save();

        const payload = {
            matchId:"gobbeldygook"
        }

        const token = generateNewToken.generateNewToken(utils.objectify(caster), false);
        let result = await request(app.app).post(`/api/schedule/match/add/caster/occ`)
        .set({"Authorization": `Bearer ${token}`})
        .send(payload)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 400);
        
    });

    it("/api/schedule/check/valid returns false if schedule is existing", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

        const casterName = "TEST azalea#9539";
        let caster = await User.find({displayName:casterName});
        caster = caster[0];
        caster.casterName = casterName;
        const casterUrl = "testtwitch.tv/asdf";
        caster.twitch = casterUrl;

        await caster.save();

        const obj = {};

        obj.adminId = caster._id;
        obj.SCHEDULEGEN = true;

        let season = 4;

        await new AdminLevel(obj).save();

               await new Scheduling({
               "type" : "seasonal",
                "season":season,
                "matches":[
                    "qpbrmznk9bx6anzz"
                ]
        }).save();

        const payload = {
            season:season
        }

        const token = generateNewToken.generateNewToken(utils.objectify(caster), false);
        let result = await request(app.app).post(`/api/schedule/check/valid`)
        .set({"Authorization": `Bearer ${token}`})
        .send(payload)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 200);
        assert(result.body.returnObject.valid == false);
        
    })

    it("/api/schedule/check/valid returns true if schedule is not existing", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

        const casterName = "TEST azalea#9539";
        let caster = await User.find({displayName:casterName});
        caster = caster[0];
        caster.casterName = casterName;
        const casterUrl = "testtwitch.tv/asdf";
        caster.twitch = casterUrl;

        await caster.save();

        const obj = {};

        obj.adminId = caster._id;
        obj.SCHEDULEGEN = true;

        await new AdminLevel(obj).save();

        let season = 4;

        const payload = {
            season:season
        }

        const token = generateNewToken.generateNewToken(utils.objectify(caster), false);
        let result = await request(app.app).post(`/api/schedule/check/valid`)
        .set({"Authorization": `Bearer ${token}`})
        .send(payload)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 200);
        assert(result.body.returnObject.valid == true);
        
    })

    it("/api/schedule/check/valid error if user does not have schedule gen permission", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(standings); 

        const casterName = "TEST azalea#9539";
        let caster = await User.find({displayName:casterName});


        let season = 4;
        const payload = {
            season:season
        }

        const token = generateNewToken.generateNewToken(utils.objectify(caster), false);
        let result = await request(app.app).post(`/api/schedule/check/valid`)
        .set({"Authorization": `Bearer ${token}`})
        .send(payload)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        
        assert(result.status == 401);
        
        
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