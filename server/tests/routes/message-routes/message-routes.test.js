const mocha = require('mocha');
const chai = require('chai');
const request = require('supertest');
const assert = require('assert');
const mongoUnit = require('mongo-unit');
const mockData = require('../../mock-data/mvpMock.json');
const utils = require('../../../utils');
const _ = require('lodash');
const SeasonInfoCommon = require('../../../methods/seasonInfoMethods');
const User = require('../../../models/user-models');
const Team = require('../../../models/team-models');
const Notes = require('../../../models/notes-models');
const Message = require('../../../models/message-models');
const Admin = require('../../../models/admin-models');
const sinon = require('sinon');
const hpAPI = require('../../../methods/heroesProfileAPI');
const Avatar = require('../../../methods/avatarUpload');
const { AdminLevel } = require('../../../models/admin-models');


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

describe("mvp-routes",()=>{
    it('api/mvp/get returns mvp by match id',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
       
        let requestUrl = `/api/mvp/get?type=match_id&id=g3g51pqrk7xpbf77`;

        let result = await request(app.app).get(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 200);
        assert(result.body != null);
    });
   it('api/mvp/get returns mvp by player id',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
       
        let requestUrl = `/api/mvp/get?type=player_id&id=5e726ffe341a0a3861fa165d`;

        let result = await request(app.app).get(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 200);
        assert(result.body != null);
    });
    it('api/mvp/get returns mvp list by player id',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
       
        let requestUrl = `/api/mvp/get?type=player_id&list=5e726ffe341a0a3861fa165d,5e726ffd341a0a3861fa1646`;

        let result = await request(app.app).get(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 200);
        assert(result.body != null);
        assert(result.body.returnObject.length>0);
    });
     it('api/mvp/get returns mvp list by match id',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
       
        let requestUrl = `/api/mvp/get?type=match_id&list=g3g51pqrk7xpbf74,g3g51pqrk7xpbf77`;

        let result = await request(app.app).get(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 200);
        assert(result.body != null);
        assert(result.body.returnObject.length>0);
    });
    it('api/mvp/get returns mvp list by season',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
       
        let requestUrl = `/api/mvp/get?season=9`;

        let result = await request(app.app).get(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 200);
        assert(result.body != null);
        assert(result.body.returnObject.length>0);
    });

        it('api/mvp/upsert creates new mvp entry',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        const mvpObject =   {
            "match_id": "ttttt",
            "player_id": "player_ID",
            "potg_link": "clips.twitch.tv/embed?clip=PowerfulPoorArmadilloOpieOP&autoplay=false&autoplay=false&autoplay=false&autoplay=false&autoplay=false",
            "timeStamp": Date.now()
        };
       
       
        let requestUrl = `/api/mvp/upsert`;

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];
        const token = generateNewToken.generateNewToken(utils.objectify(admin), false);

        let result = await request(app.app).post(requestUrl)
        .set({"Authorization": `Bearer ${token}`})
        .send(mvpObject)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 200);
        assert(result.body != null);
        
    });

     it('api/mvp/upsert updates existing mvp entry',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let getRequestUrl = `/api/mvp/get?type=match_id&id=g3g51pqrk7xpbf77`;

        let getResult = await request(app.app).get(getRequestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        let mvp = getResult.body.returnObject;

        mvp.potg_link = "CHANGED";
       
        let requestUrl = `/api/mvp/upsert`;

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];
        const token = generateNewToken.generateNewToken(utils.objectify(admin), false);
        

        let result = await request(app.app).post(requestUrl)
        .set({"Authorization": `Bearer ${token}`})
        .send(mvp)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 200);
        assert(result.body != null);
        assert(result.body.returnObject.potg_link == "CHANGED")
        
    });

         it('api/mvp/like increments like count of specific mvp object',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
       
        let requestUrl = `/api/mvp/like`;

        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];
        const token = generateNewToken.generateNewToken(utils.objectify(admin), false);

        let getRequestUrl = `/api/mvp/get?type=match_id&id=g3g51pqrk7xpbf77`;

        let getResult = await request(app.app).get(getRequestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        let mvp = getResult.body.returnObject;

        let result = await request(app.app).post(requestUrl)
        .set({"Authorization": `Bearer ${token}`})
        .send({id:mvp._id})
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        
        assert(result.status == 200);
        assert(result.body != null);
        
    });
})