const mocha = require('mocha');
const chai = require('chai');
const request = require('supertest');
const assert = require('assert');
const mongoUnit = require('mongo-unit');
const mockData = require('../../mock-data/notesMock.json');
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

describe("notes-routes",()=>{
    it('api/admin/notes/fetch/user return notes on user',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
        let user = await User.find({"displayName": "TEST lily#3664"});
        user=user[0];
        let notes = await Notes.find();
        for(var i = 0; i<notes.length; i++){
            let note = notes[i];
            note.subjectId=user._id;
            await note.save();
        }
        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

                const obj = {};

        obj.adminId = admin._id;
        obj.USER = true;
 
        await new AdminLevel(obj).save();

        const payload = {
            subjectId:user._id
        };
        let requestUrl = `/api/admin/notes/fetch/user?subjectId=${user._id}`

        const token = generateNewToken.generateNewToken(utils.objectify(admin), false);
        let result = await request(app.app).get(requestUrl)
        .set({"Authorization": `Bearer ${token}`})
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 200);
        assert(result.body.returnObject.length>0)
    });
    it('api/admin/notes/fetch/user non-admin may not see',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
        let user = await User.find({"displayName": "TEST lily#3664"});
        user=user[0];
        let notes = await Notes.find();
        for(var i = 0; i<notes.length; i++){
            let note = notes[i];
            note.subjectId=user._id;
            await note.save();
        }
        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];


        const payload = {
            subjectId:user._id
        };
        let requestUrl = `/api/admin/notes/fetch/user?subjectId=${user._id}`

        const token = generateNewToken.generateNewToken(utils.objectify(admin), false);
        let result = await request(app.app).get(requestUrl)
        .set({"Authorization": `Bearer ${token}`})
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 403);
        // assert(result.body.returnObject.length>0)
    });
        it('api/admin/notes/fetch/user non-admin may not see',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
        let user = await User.find({"displayName": "TEST lily#3664"});
        user=user[0];
        let notes = await Notes.find();
        for(var i = 0; i<notes.length; i++){
            let note = notes[i];
            note.subjectId=user._id;
            await note.save();
        }
        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];


        const payload = {
            subjectId:user._id
        };
        let requestUrl = `/api/admin/notes/fetch/user?subjectId=${user._id}`

        const token = generateNewToken.generateNewToken(utils.objectify(admin), false);
        let result = await request(app.app).get(requestUrl)
        .set({"Authorization": `Bearer ${token}`})
        .then((res)=>{
            return res;
        },
        (err)=>{
            console.log("error XXX", err);
            throw err;
        });

        assert(result.status == 403);
        // assert(result.body.returnObject.length>0)
    });

    it('api/admin/notes/create/user create a user note',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
        let user = await User.find({"displayName": "TEST lily#3664"});
        user=user[0];
        let notes = await Notes.find();
        for(var i = 0; i<notes.length; i++){
            let note = notes[i];
            note.subjectId=user._id;
            await note.save();
        }
        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};

        obj.adminId = admin._id;
        obj.USER = true;
 
        await new AdminLevel(obj).save();

        const note = "This is a test note.";
        const payload = {
            subjectId:user._id,
            authorId: admin._id,
            note:note,
            timeStamp: Date.now()
        };
        let requestUrl = `/api/admin/notes/create/user`

        const token = generateNewToken.generateNewToken(utils.objectify(admin), false);
        let result = await request(app.app).post(requestUrl)
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
        assert(result.body.returnObject.note==note);
    });

        it('api/admin/notes/create/user create a user note fails for non-admin',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
        let user = await User.find({"displayName": "TEST lily#3664"});
        user=user[0];
        let notes = await Notes.find();
        for(var i = 0; i<notes.length; i++){
            let note = notes[i];
            note.subjectId=user._id;
            await note.save();
        }
        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const note = "This is a test note.";
        const payload = {
            subjectId:user._id,
            authorId: admin._id,
            note:note,
            timeStamp: Date.now()
        };
        let requestUrl = `/api/admin/notes/create/user`

        const token = generateNewToken.generateNewToken(utils.objectify(admin), false);
        let result = await request(app.app).post(requestUrl)
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
        // assert(result.body.returnObject.note==note);
    });

    it('api/admin/notes/delete delete a user note',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
        let user = await User.find({"displayName": "TEST lily#3664"});
        user=user[0];
        let notes = await Notes.find();
        for(var i = 0; i<notes.length; i++){
            let note = notes[i];
            note.subjectId=user._id;
            await note.save();
        }
        let deleteNote = notes[0];
        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const obj = {};

        obj.adminId = admin._id;
        obj.USER = true;
 
        await new AdminLevel(obj).save();

        const payload = {
            noteId:deleteNote._id
        };
        let requestUrl = `/api/admin/notes/delete`;

        const token = generateNewToken.generateNewToken(utils.objectify(admin), false);
        let result = await request(app.app).post(requestUrl)
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
        assert(result.body.returnObject._id == deleteNote._id);
        
    });

    it('api/admin/notes/delete delete a user note - fails for non-admin',async()=>{
        
        await mongoUnit.dropDb();
        await mongoUnit.load(mockData); 
        let user = await User.find({"displayName": "TEST lily#3664"});
        user=user[0];
        let notes = await Notes.find();
        for(var i = 0; i<notes.length; i++){
            let note = notes[i];
            note.subjectId=user._id;
            await note.save();
        }
        let deleteNote = notes[0];
        let admin = await User.find({"displayName": "TEST azalea#9539"});
        admin = admin[0];

        const payload = {
            noteId:deleteNote._id
        };
        let requestUrl = `/api/admin/notes/delete`;

        const token = generateNewToken.generateNewToken(utils.objectify(admin), false);
        let result = await request(app.app).post(requestUrl)
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
})