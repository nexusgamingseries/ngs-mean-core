const mocha = require('mocha');
const chai = require('chai');
const request = require('supertest');
const assert = require('assert');
const mongoUnit = require('mongo-unit');
const mockData = require('../../mock-data/dataForTeamDelete.json');
const utils = require('../../../utils');
const _ = require('lodash');
const SeasonInfoCommon = require('../../../methods/seasonInfoMethods');
const User = require('../../../models/user-models');
const Team = require('../../../models/team-models');
const Message = require('../../../models/message-models');
const Admin = require('../../../models/admin-models');
const sinon = require('sinon');
const hpAPI = require('../../../methods/heroesProfileAPI');
const Avatar = require('../../../methods/avatarUpload');


const loadConfig = require('/Users/leegrisham/Documents/workspace_personal/ngs_mean_core/loadConfig');
const message = require('../../../subroutines/message-subs');
let app;
let generateNewToken;
var uploadAvatarStub;


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

        it("/api/user/get return user profile by displayName", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let users = await User.find();

        let user = users[0];

        
        let requestUrl = `/api/user/get?user=${encodeURIComponent(user.displayName)}`
        
        let result = await request(app.app).get(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        assert(result.status==200);
        assert(result.body.returnObject);
    });

            it("/api/user/get return user profile by userId", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let users = await User.find();

        let user = users[0];

        
        let requestUrl = `/api/user/get?userId=${encodeURIComponent(user._id)}`
        
        let result = await request(app.app).get(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        assert(result.status==200);
        assert(result.body.returnObject);
    });

                it("/api/user/get return user profile by multiple userId", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let users = await User.find();

        let user = users[0];
        let user2 = users[1];

        let arr = [user._id, user2._id];

        
        let requestUrl = `/api/user/get?userIds=${encodeURIComponent(arr.join())}`

        let result = await request(app.app).get(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        assert(result.status==200);
        assert(result.body.returnObject.length>0);
    });

                    it("/api/user/get return user profile by multiple displayName", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let users = await User.find();

        let user = users[0];
        let user2 = users[1];

        let arr = [user.displayName, user2.displayName];

        
        let requestUrl = `/api/user/get?users=${encodeURIComponent(arr.join())}`

        let result = await request(app.app).get(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        assert(result.status==200);
        assert(result.body.returnObject.length>0);
    });

                        it("/api/user/get bad input", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let bad = "BOXO#0000"
        
        let requestUrl = `/api/user/get?users=${encodeURIComponent(bad)}`

        let result = await request(app.app).get(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        assert(result.status==200);
        assert(result.body.returnObject.length==0);
        
    });

    it("/api/user/delete", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let user = await User.find({displayName:"TEST lily#3664"});
        user = user[0];

        const token = generateNewToken.generateNewToken(utils.objectify(user));
        let result = await request(app.app).get("/api/user/delete")
        .set({"Authorization": `Bearer ${token}`})
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        assert(result.status==200);
        assert(result.body.returnObject);
        let userAfter = await User.find({displayName:"TEST lily#3664"});
        assert(userAfter.length==0);
        
    });

        it("/api/user/delete delete team captain not permited", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let user = await User.find({displayName:"TEST azalea#9539"});
        user = user[0];

        const token = generateNewToken.generateNewToken(utils.objectify(user));
        let result = await request(app.app).get("/api/user/delete")
        .set({"Authorization": `Bearer ${token}`})
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        assert(result.status==500);
        let userAfter = await User.find({displayName:"TEST azalea#9539"});
        assert(userAfter.length==1);
        
    });

        it("/api/user/save.discordid update user profile with discord UUID via displayname", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let user = await User.find({displayName:"TEST azalea#9539"});
        user = user[0];

        const payload = {
            displayName:user.displayName,
            discordId:"discordUUID"
        }

        const token = generateNewToken.generateNewToken(utils.objectify(user));
        let result = await request(app.app).post("/api/user/save/discordid")
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
        let userAfter = await User.find({displayName:"TEST azalea#9539"});
        userAfter=userAfter[0];
        assert(userAfter.discordId.length>0);
        
    });

    it("/api/user/save.discordid update user profile with discord UUID via ID", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let user = await User.find({displayName:"TEST azalea#9539"});
        user = user[0];

        const payload = {
            userId:user._id,
            discordId:"discordUUID"
        }

        const token = generateNewToken.generateNewToken(utils.objectify(user));
        let result = await request(app.app).post("/api/user/save/discordid")
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
        let userAfter = await User.find({displayName:"TEST azalea#9539"});
        userAfter=userAfter[0];
        assert(userAfter.discordId.length>0);
        
    });

        it("/api/user/save update user profile", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let user = await User.find({displayName:"TEST azalea#9539"});
        user = user[0];

        let lfg = true;
        user.lookingForGroup = lfg;

        let competitiveLevel = 5;
        user.competitiveLevel = competitiveLevel;

        let descriptionOfPlay = "this is how I play.";
        user.descriptionOfPlay = descriptionOfPlay;

        let role = {tank:true, healer:true};
        user.role = role;

        let timezone = -5;
        user.timeZone = timezone;

        let discordtag = "bozo111";
        user.discordTag = discordtag;

        let discordid = "123456";
        user.discordId = discordid;

        let hlRankMetal = "gold";
        user.hlRankMetal = hlRankMetal;

        let hlRankDivision = 3;
        user.hlRankDivision = hlRankDivision;

        let twitch = "twitch.tv/asdf";
        user.twitch = twitch;

        let twitter = "twitter.com/twit";
        user.twitter = twitter;

        let youtube = "youtube.com/asdf";
        user.youtube = youtube;

        let casterName = "hahaha";
        user.casterName = casterName;


        const payload = utils.objectify(user);

        const token = generateNewToken.generateNewToken(utils.objectify(user));
        let result = await request(app.app).post("/api/user/save")
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
        let userAfter = await User.find({displayName:"TEST azalea#9539"});
        userAfter=userAfter[0];
        
        assert(userAfter.lookingForGroup==lfg);
        assert(userAfter.competitiveLevel == competitiveLevel);
        assert(userAfter.descriptionOfPlay == descriptionOfPlay);
        assert(Object.keys(userAfter.role).length == Object.keys(role).length);
        assert(userAfter.timeZone == timezone);
        assert(userAfter.discordTag == discordtag);
        assert(userAfter.discordId == discordid);
        assert(userAfter.hlRankMetal == hlRankMetal);
        assert(userAfter.hlRankDivision == hlRankDivision);
        assert(userAfter.twitch == twitch);
        assert(userAfter.twitter = twitter);
        assert(userAfter.youtube == youtube);
        assert(userAfter.casterName == casterName);
        
    });

    it("/api/user/get/casters ", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

          let userAfter = await User.find({displayName:"TEST azalea#9539"});
        userAfter=userAfter[0];
        userAfter.casterName = "bozoCasterMan";
        userAfter.twitter = "hhhh.hh/ttt"
        await userAfter.save();

        userAfter = await User.find({displayName:"TEST lily#3664"});
        userAfter=userAfter[0];
        userAfter.casterName = "bozoCasterMan";
        userAfter.twitch = "bozo.tv/bozo";
        await userAfter.save();



        let result = await request(app.app).get("/api/user/get/casters")
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        assert(result.status==200);
        assert(result.body.returnObject.length>0);
        
    });

        it("/api/user/hero-profile/path ", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        var stub = sinon.stub(hpAPI, "playerProfile").resolves({link:"resolvelink"});

          
        let userAfter = await User.find();
        userAfter=userAfter[0];


        let result = await request(app.app).get(`/api/user/hero-profile/path?displayName=${encodeURIComponent(userAfter.displayName)}`)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        assert(result.status==200);
        
    });

            it("/api/user/update/mmr ", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        const mmrData = require('../../mock-data/heroesProfileMmrReturn.json');
       

          
        let user = await User.find();
        user=user[0];

         var stub = sinon.stub(hpAPI, "playerMmrAPI").resolves(mmrData);

        const token = generateNewToken.generateNewToken(utils.objectify(user));
        let result = await request(app.app).get(`/api/user/update/mmr`)
        .set({"Authorization": `Bearer ${token}`})
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

                let userAfter = await User.find({displayName:user.displayName});
        userAfter=userAfter[0];

        assert(result.status==200);
        assert(result.body.returnObject.additional.heroesProfileMmr > 0);
        assert(userAfter.heroesProfileMmr == result.body.returnObject.additional.heroesProfileMmr );


        
    });

        it("/api/user/upload/avatar ", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        const fileName = "resolvedFilename";
        uploadAvatarStub = sinon.stub(Avatar, "uploadAvatar").resolves({fileName:fileName});

          
        let userAfter = await User.find();
        userAfter=userAfter[0];

        const payload = {
            logo:"logodatastring"
        }

        const token = generateNewToken.generateNewToken(utils.objectify(userAfter));
        let result = await request(app.app).post(`/api/user/upload/avatar`)
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
        let queue = await Admin.PendingAvatarQueue.find();
        queue=queue[0];
        assert(queue.userId == userAfter._id);
        assert(queue.fileName == fileName);
        
    });

      it("/api/user/upload/avatar - replaces existing avatar queue.", async ()=>{
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        // uploadAvatarStub.reset();
        const fileName = "resolvedFilename";
        // uploadAvatarStub = sinon.stub(Avatar, "uploadAvatar").resolves({fileName:fileName});
        var stubDel = sinon.stub(Avatar, "deleteAvatar").resolves(true);
          
        let userAfter = await User.find();
        userAfter=userAfter[0];

        const payload = {
            logo:"logodatastring"
        }

        const token = generateNewToken.generateNewToken(utils.objectify(userAfter));
        let result = await request(app.app).post(`/api/user/upload/avatar`)
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
        let queue = await Admin.PendingAvatarQueue.find();
        queue=queue[0];
        assert(queue.userId == userAfter._id);
        assert(queue.fileName == fileName);

        uploadAvatarStub.reset();
        const fileName2 = "secondFilename"
        uploadAvatarStub.resolves({fileName:fileName2});
        let secondResult = await request(app.app).post(`/api/user/upload/avatar`)
        .set({"Authorization": `Bearer ${token}`})
        .send(payload)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(secondResult.status==200);
        queue = await Admin.PendingAvatarQueue.find();
        queue=queue[0];
        assert(queue.userId == userAfter._id);
        assert(queue.fileName == fileName2);
        
    });

});

after(()=>{
    app.server.close();
})