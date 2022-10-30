const mocha = require('mocha');
const chai = require('chai');
const request = require('supertest');
const assert = require('assert');
const mongoUnit = require('mongo-unit');
const mockData = require('../../mock-data/historical-routes.json');
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


before((done) =>{
    loadConfig().then(
    res=>{
       mongoUnit.start().then(() => {
        generateNewToken = require('../../../configs/passport-setup');
        console.log('fake mongo is started: ', mongoUnit.getUrl())
        process.env.mongoURI = mongoUnit.getUrl() // this var process.env.DATABASE_URL = will keep link to fake mongo
        app = require('../../../../server');
        // mocha.run() // this line start mocha tests
        done();
        });
    });
})

describe("historical-routes",()=>{
    it('api/history/seasons returns past seasons data',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
       
        let requestUrl = `/api/history/seasons`;

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
        it('api/history/season/division requires season input',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
       
        let requestUrl = `/api/history/season/division`;

        let result = await request(app.app).get(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 500);
        assert(result.body != null);
        assert(result.body.message.length>0);
    });
            it('api/history/season/division returns historical data for season',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
       
        let requestUrl = `/api/history/season/division?season=10`;

        let result = await request(app.app).get(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        let restypes = [];
        result.body.returnObject.forEach(
            (iter)=>{
                if(restypes.indexOf(iter.type)==-1){
                    restypes.push(iter.type);
                }
            }
        );
        assert(result.status == 200);
        assert(result.body != null);
        assert(result.body.returnObject.length>0);
        assert(restypes.length == 1 && restypes[0]=='division');
    });

                it('api/history/season/all returns historical data for season',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
       
        let requestUrl = `/api/history/season/all?season=10`;

        let result = await request(app.app).get(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        let restypes = [];
        result.body.returnObject.forEach(
            (iter)=>{
                if(restypes.indexOf(iter.type)==-1){
                    restypes.push(iter.type);
                }
            }
        );
        assert(result.status == 200);
        assert(result.body != null);
        assert(result.body.returnObject.length>0);
        assert(restypes.length == 2);
    });

                    it('api/history/season/teams requires season',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
       
        let requestUrl = `/api/history/season/teams?season=10`;
        const postBody = {
            
        }

        let result = await request(app.app).post(requestUrl)
        .send(postBody)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        // let restypes = [];
        // result.body.returnObject.forEach(
        //     (iter)=>{
        //         if(restypes.indexOf(iter.type)==-1){
        //             restypes.push(iter.type);
        //         }
        //     }
        // );

                assert(result.status == 500);
        assert(result.body != null);
        assert(result.body.message.length>0);

        // assert(result.status == 200);
        // assert(result.body != null);
        // assert(result.body.returnObject.length>0);
        // assert(restypes.length == 1 && restypes[0]=='teams');
    });

             it('api/history/season/teams returns team history for specified season',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
       
        let requestUrl = `/api/history/season/teams?season=10`;
        const postBody = {
            "season":10
        };

        let result = await request(app.app).post(requestUrl)
        .send(postBody)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        let restypes = [];
        result.body.returnObject.forEach(
            (iter)=>{
                if(restypes.indexOf(iter.type)==-1){
                    restypes.push(iter.type);
                }
            }
        );
        assert(result.status == 200);
        assert(result.body != null);
        assert(result.body.returnObject.length>0);
        assert(restypes.length == 1 && restypes[0]=='team');
    });

    
      it('api/history/season/teams returns team history for specified season and team',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
       
       
        let requestUrl = `/api/history/season/teams?season=10`;
        const postBody = {
            "season":10,
            "teams":["TEST left-footed camels"]
        };

        let result = await request(app.app).post(requestUrl)
        .send(postBody)
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });
        let restypes = [];
        result.body.returnObject.forEach(
            (iter)=>{
                if(restypes.indexOf(iter.type)==-1){
                    restypes.push(iter.type);
                }
            }
        );
        assert(result.status == 200);
        assert(result.body != null);
        assert(result.body.returnObject.length==1);
        assert(restypes.length == 1 && restypes[0]=='team');
    });

})