const request = require('supertest');
const assert = require('assert');
require('dotenv').config();
const mongoUnit = require('mongo-unit');
const mockData = require('../../mock-data/standingsData.json');
const utils = require('../../../utils');
const Division = require('../../../models/division-models');

let app;

before(async function(){
    this.timeout(5000);
    const res = await mongoUnit.start(); 
    console.log('fake mongo is started: ', mongoUnit.getUrl())
    process.env.mongoURI = mongoUnit.getUrl()
    app = require('../../../../server');
})

describe("division-routes-get",async function(){

    it('get division by divisionConcat', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let divisions = await Division.find({});
        assert(divisions.length > 0, 'Test data should have divisions');
        let division = divisions[0];

        let requestUrl = '/api/division/get?division=' + encodeURIComponent(division.divisionConcat);

        let result = await request(app.app).get(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            throw err;
        });

        assert(result.status === 200);
        assert(Object.keys(result.body).length > 0);
        assert(result.body.returnObject);
        assert(result.body.returnObject.divisionConcat === division.divisionConcat);

    })

    it('get division returns null when division not found', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let requestUrl = '/api/division/get?division=' + encodeURIComponent('NonExistentDivision');

        let result = await request(app.app).get(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            throw err;
        });

        assert(result.status === 200);
        assert(Object.keys(result.body).length > 0);
        // Should return null or empty object for not found
        assert(result.body.returnObject === null || result.body.returnObject === undefined || Object.keys(result.body.returnObject).length === 0);

    })

    it('get division by teamname', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let divisions = await Division.find({});
        assert(divisions.length > 0, 'Test data should have divisions');
        
        let divisionWithTeam = divisions.find(div => div.teams && div.teams.length > 0);
        assert(divisionWithTeam, 'Test data should have a division with teams');
        
        let teamName = divisionWithTeam.teams[0];
        let requestUrl = '/api/division/get/by/teamname?teamName=' + encodeURIComponent(teamName);

        let result = await request(app.app).get(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            throw err;
        });

        assert(result.status === 200);
        assert(Object.keys(result.body).length > 0);
        assert(result.body.returnObject);
        assert(result.body.returnObject.teams.includes(teamName));

    })

    it('get division by teamname with team not in any division', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let requestUrl = '/api/division/get/by/teamname?teamName=' + encodeURIComponent('NonExistentTeam');

        let result = await request(app.app).get(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            throw err;
        });

        assert(result.status === 200);
        assert(Object.keys(result.body).length > 0);
        // Should return empty object for not found
        assert(Object.keys(result.body.returnObject).length === 0 || result.body.returnObject === null);

    })

    it('get all public divisions', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let requestUrl = '/api/division/get/all';

        let result = await request(app.app).get(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            throw err;
        });

        assert(result.status === 200);
        assert(Object.keys(result.body).length > 0);
        assert(Array.isArray(result.body.returnObject));
        // All returned divisions should be public
        result.body.returnObject.forEach(div => {
            assert(div.public === true, 'All returned divisions should be public');
        });

    })

    it('get division by any search query - display name', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let divisions = await Division.find({});
        assert(divisions.length > 0, 'Test data should have divisions');
        let division = divisions[0];

        let requestUrl = '/api/division/get/any?q=' + encodeURIComponent(division.displayName);

        let result = await request(app.app).get(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            throw err;
        });

        assert(result.status === 200);
        assert(Object.keys(result.body).length > 0);
        assert(result.body.returnObject);
        // Should find the division by displayName
        assert(result.body.returnObject.displayName === division.displayName || 
               result.body.returnObject.divisionName === division.divisionName ||
               result.body.returnObject.divisionConcat === division.divisionConcat);

    })

    it('get division by any search query - division name', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let divisions = await Division.find({});
        assert(divisions.length > 0, 'Test data should have divisions');
        let division = divisions[0];

        let requestUrl = '/api/division/get/any?q=' + encodeURIComponent(division.divisionName);

        let result = await request(app.app).get(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            throw err;
        });

        assert(result.status === 200);
        assert(Object.keys(result.body).length > 0);
        assert(result.body.returnObject);
        // Should find the division by divisionName
        assert(result.body.returnObject.displayName === division.displayName || 
               result.body.returnObject.divisionName === division.divisionName ||
               result.body.returnObject.divisionConcat === division.divisionConcat);

    })

    it('get division by any search query with non-existent query', async function(){

        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 

        let requestUrl = '/api/division/get/any?q=' + encodeURIComponent('NonExistentDivisionQuery');

        let result = await request(app.app).get(requestUrl)
        .then((res)=>{
            return res;
        },
        (err)=>{
            throw err;
        });

        assert(result.status === 200);
        assert(Object.keys(result.body).length > 0);
        // Should return null or empty for not found
        assert(result.body.returnObject === null || 
               result.body.returnObject === undefined || 
               Object.keys(result.body.returnObject).length === 0);

    })



})
