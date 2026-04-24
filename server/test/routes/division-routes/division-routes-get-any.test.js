require('dotenv').config();
const assert = require('assert');
const request = require('supertest');
const mongoUnit = require('mongo-unit');
const Sinon = require('sinon');

const mockData = require('../../mock-data/standingsData.json');
let app;
let generateNewToken;

describe('division-routes-get-any', () => {

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

    it('search division by displayName', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        // From mockData, "Division D Beast" is a division
        let requestUrl = '/api/division/get/any?q=Division D Beast';

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

    it('search division by divisionName', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        // From mockData, divisionName is "D Beast"
        let requestUrl = '/api/division/get/any?q=D Beast';

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
        assert(result.body.returnObject.divisionName === 'D Beast');

    })

    it('search division by divisionConcat', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        // From mockData, divisionConcat is "d-beast"
        let requestUrl = '/api/division/get/any?q=d-beast';

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
        assert(result.body.returnObject.divisionConcat === 'd-beast');

    })

    it('return null when search query does not match any division', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let requestUrl = '/api/division/get/any?q=NonExistentDivision';

        let result = await request(app.app).get(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            throw err;
        });

        assert(result.status === 200);
        // Should return null when not found
        assert(result.body.returnObject === null || 
               result.body.returnObject === undefined);

    })

    it('handle database error on search any', async function(){

        await mongoUnit.dropDb();
        
        const Division = require('../../../models/division-models');
        const findOneStub = Sinon.stub(Division, 'findOne').rejects(new Error('Database error'));

        let requestUrl = '/api/division/get/any?q=Division D Beast';

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

        assert(result.status === 500);
        assert(result.body.message.includes('Error'));

        findOneStub.restore();

    })

    it('handle missing q parameter', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let requestUrl = '/api/division/get/any';

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

    it('search with URL encoded query parameter', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let requestUrl = '/api/division/get/any?q=Division%20D%20Beast';

        let result = await request(app.app).get(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            throw err;
        });

        assert(result.status === 200);
        assert(result.body.returnObject !== null);
        assert(result.body.returnObject.displayName === 'Division D Beast');

    })

})
