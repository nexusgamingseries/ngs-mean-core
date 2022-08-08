const cluster = require('../../../cluster');
const chai = require('chai');
const chaiHttp = require("chai-http");

const loadConfig = require('/Users/leegrisham/Documents/workspace_personal/ngs_mean_core/loadConfig');
let app;



before(done =>{
    return loadConfig().then(
    res=>{
        console.log('res', res);
        return app = require('../../server');
    }).listen(3000, done);
})

chai.use(chaiHttp);

    describe("team-routes",()=>{

        describe("/team/get/registered", ()=>{
            chai.request(app).get("/team/get/registered").send().end((err,res)=>{
                console.log('err', err);
                console.log('res', res);
            })
        })

    });

after(done=>{
    app.close(done);
})
