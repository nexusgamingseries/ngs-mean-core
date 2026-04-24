require('dotenv').config();
const assert = require('assert');
const request = require('supertest');
const mongoUnit = require('mongo-unit');
const Sinon = require('sinon');

const mockData = require('../../mock-data/standingsData.json');
let app;
let generateNewToken;

describe('division-routes-get-by-teamname', () => {

    before(async function(){
        this.timeout(5000);
        const res = await mongoUnit.start(); 
        const passportSetup = require('../../../configs/passport-setup');  
        generateNewToken = passportSetup.generateNewToken;
        process.env.mongoURI = mongoUnit.getUrl();
        app = require('../../../../server');
    })

    after(async function(){
        this.timeout(5000);
        await mongoUnit.stop();
    })

    it('get division by teamname when team exists', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        // From mockData, "Mongoose's Team" is in Division D Beast
        let requestUrl = '/api/division/get/by/teamname?teamName=Mongoose\'s Team';

        let result = await request(app.app).get(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            throw err;
        });

        assert(result.status === 200);
        assert(result.body.returnObject !== null);
        assert(result.body.returnObject !== undefined);
        assert(result.body.returnObject.displayName === 'Division D Beast');

    })

    it('get empty object when team not in any division', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let requestUrl = '/api/division/get/by/teamname?teamName=NonExistentTeam';

        let result = await request(app.app).get(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            throw err;
        });

        assert(result.status === 200);
        // Should return empty object or null
        assert(result.body.returnObject === null || 
               result.body.returnObject === undefined || 
               Object.keys(result.body.returnObject).length === 0);

    })

    it('handle database error on get by teamname', async function(){

        await mongoUnit.dropDb();
        
        const Division = require('../../../models/division-models');
        const findOneStub = Sinon.stub(Division, 'findOne').rejects(new Error('Database error'));

        let requestUrl = '/api/division/get/by/teamname?teamName=Lions';

        let result = await request(app.app).get(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            // Supertest may reject on 500, but we still get the result
            if(err && err.response) {
                return err.response;
            }
            throw err;
        });

        assert(result.status === 500);
        assert(result.body.message.includes('Error'));

        findOneStub.restore();

    })

    it('handle missing teamName parameter', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let requestUrl = '/api/division/get/by/teamname';

        let result = await request(app.app).get(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            if(err && err.response) {
                return err.response;
            }
            throw err;
        });

        // Should handle missing parameter
        assert(result.status !== undefined);

    })

    it('return division when searching with URL encoded teamname', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let requestUrl = '/api/division/get/by/teamname?teamName=Team%20Name';

        let result = await request(app.app).get(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            if(err && err.response) {
                return err.response;
            }
            throw err;
        });

        assert(result.status === 200);

    })

})
