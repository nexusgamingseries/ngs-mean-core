const mocha = require('mocha');
const chai = require('chai');
const request = require('supertest');
const assert = require('assert');
const mongoUnit = require('mongo-unit');
const dataForTeamDelete = require('../mock-data/dataForTeamDelete.json');
const utils = require('../../utils');
const _ = require('lodash');

const Team = require('../../models/team-models');
const User = require('../../models/user-models');
const Division = require('../../models/division-models');
const Admin = require('../../models/admin-models');

const mongoose = require('mongoose');

const loadConfig = require('/Users/leegrisham/Documents/workspace_personal/ngs_mean_core/loadConfig');
let app;
let generateNewToken;

before(() =>{
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

    //TODO: I am not totally satisfied that this is not passing because of timing... although it should work properly on the server.
        it("/api/team/save good data", async ()=>{
            let testTeamName = "TEST sunshine mynah birds";
        await mongoUnit.dropDb();
        await mongoUnit.load(dataForTeamDelete); 
        let captain = await User.find({"displayName":"TEST azalea#9539"}).then(
            found=>{
                return found[0];
            }
        );
        let team = await Team.find({}).then(res=>{return res[0]});
        const token = generateNewToken.generateNewToken(utils.objectify(captain), false);
        team = utils.objectify(team);
        let lookingForMore = true;
        delete team.captain;
        team.lookingForMore = lookingForMore;
        let competitiveLevel = 5;
        team.competitiveLevel = competitiveLevel;
        let descriptionOfTeam = "description";
        team.descriptionOfTeam = descriptionOfTeam;
        let roles = {
        "tank" : true,
        "meleeassassin" : false,
        "rangedassassin" : false,
        "support" : true,
        "offlane" : false,
        "flex" : false
    };
    team.rolesNeeded = roles;
    let timezone = -5;
    team.timeZone = timezone;
    let twitch = "twitchtest"
    team.twitch=twitch;
    let twitter = "twittertest";
    team.twitter = twitter;
    let youtube = "testyoutube";
    team.youtube = youtube;
    let ticker = "zzzz"
    team.ticker = ticker;
    let oldAssCap = team.assistantCaptain[0];
    let assCap = ["TEST hyena#4375"];
    team.assistantCaptain = assCap;
        
        let result = await request(app.app).post("/api/team/save")
        .set({"Authorization": `Bearer ${token}`})
        .send(team).then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        
        assert(result.status==200);
        
        let teamAfterSave = await Team.find({}).then(res=>{return res[0];});
        assert(_.isEqual(teamAfterSave.get("assistantCaptain"),assCap));
        assert(teamAfterSave.get("lookingForMore"));
        assert(teamAfterSave.get("competitiveLevel")==competitiveLevel);
        assert(teamAfterSave.get("descriptionOfTeam")==descriptionOfTeam);
        assert(_.isEqual(teamAfterSave.get("rolesNeeded"),roles));
        assert(teamAfterSave.get("twitch")==twitch);
        assert(teamAfterSave.get("youtube")==youtube);
        assert(teamAfterSave.get("ticker")==ticker);
        assert(teamAfterSave.get("timeZone")==timezone);

        let oldAssCapObj = await User.find({displayName:oldAssCap}).then(res=>{return res[0]});
        
        assert(oldAssCapObj.isCaptain==false);

        let newAssCapObj = await User.find({displayName:assCap[0]}).then(res=>{return res[0]});
        assert(newAssCapObj.get("isCaptain"));
        
    });

});

after(()=>{
    app.server.close();
})