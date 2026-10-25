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


const loadConfig = require('../../../../loadConfig');
const message = require('../../../subroutines/message-subs');
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

describe("message-routes",()=>{
    async function seed(){
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData);
        const user = (await User.find({}))[0];
        await new Message({recipient: String(user._id), sender: String(user._id), subject:'s1', content:'c1', timeStamp: Date.now(), notSeen: true}).save();
        await new Message({recipient: String(user._id), sender: String(user._id), subject:'s2', content:'c2', timeStamp: Date.now(), notSeen: false}).save();
        const token = generateNewToken.generateNewToken(utils.objectify(user), false);
        return {user, token};
    }

    it('/api/messageCenter/get/message returns the recipient messages',async()=>{
        const {user, token} = await seed();
        const result = await request(app.app).post('/api/messageCenter/get/message')
            .set({"Authorization": `Bearer ${token}`})
            .send({recipient: String(user._id)});
        assert(result.status == 200);
        assert(result.body.returnObject.length == 2);
    });

    it('/api/messageCenter/get/message/numbers counts unseen messages',async()=>{
        const {user} = await seed();
        const result = await request(app.app).post('/api/messageCenter/get/message/numbers')
            .send({recipient: String(user._id)});
        assert(result.status == 200);
        assert(result.body.returnObject == 1);
    });

    it('/api/messageCenter/mark/message/seen marks a message seen',async()=>{
        const {token} = await seed();
        const msg = await Message.findOne({notSeen: true});
        const result = await request(app.app).post('/api/messageCenter/mark/message/seen')
            .set({"Authorization": `Bearer ${token}`})
            .send({message: String(msg._id)});
        assert(result.status == 200);
        assert((await Message.findById(msg._id)).notSeen == false);
    });

    it('/api/messageCenter/delete/message deletes a message',async()=>{
        const {token} = await seed();
        const msg = await Message.findOne();
        const result = await request(app.app).post('/api/messageCenter/delete/message')
            .set({"Authorization": `Bearer ${token}`})
            .send({message: String(msg._id)});
        assert(result.status == 200);
        assert((await Message.find()).length == 1);
    });

    it('/api/messageCenter/get/message requires authentication',async()=>{
        const result = await request(app.app).post('/api/messageCenter/get/message').send({recipient: 'x'});
        assert(result.status == 401);
    });
})

after(()=>{
    app.server.close();
})