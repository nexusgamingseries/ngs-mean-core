const utils = require('../utils');
const router = require('express').Router();
const OpOrg = require('../methods/operationalOrganization/opOrgCRUD');
const {
    commonResponseHandler
} = require("../commonResponseHandler");

router.post('/fetch/oporg', (req, res) => {
    const path = '/api/opOrg/fetch/oporg';
    // const query = Admin.PendingQueue.find();
    // let queue = req.body.queue;

    let requiredInputs = [{
        name: 'query',
        type: 'object'
    }]

    commonResponseHandler(req, res, requiredInputs, [], async (req, res, validatedRequiredInputs) => {
        //log object

        const response = {};

        await OpOrg.findOrgBy(validatedRequiredInputs.query.value).then(
            found=>{
                if(found){
                    response.status = 200;
                    response.message = utils.returnMessaging(req.originalUrl, 'Found Op Org', false, found);
                    // return response;
                }else{
                    response.status = 200;
                    response.message = utils.returnMessaging(req.originalUrl, 'No matching op org found', false, found);
                    // return response;
                }

            },
            err=>{
                response.status = 500;
                response.message = utils.returnMessaging(req.originalUrl, 'Org Not Found', err);
                // return response;
            }
        )

        return response;

    })

});

router.get('/get/alloporgs', (req, res) => {
    const path = '/api/opOrg/get/alloporgs';

                commonResponseHandler(req, res, [], [], async (req, res) => {
                    //log object
                    const response = {};

                    await OpOrg.getAllOrgs().then(
                        found => {
                            if (found) {
                                response.status = 200;
                                response.message = utils.returnMessaging(req.originalUrl, 'Found Op Org', false, found);
                                // return response;
                            } else {
                                response.status = 200;
                                response.message = utils.returnMessaging(req.originalUrl, 'No matching op org found', false, found);
                                // return response;
                            }

                        },
                        err => {
                            response.status = 500;
                            response.message = utils.returnMessaging(req.originalUrl, 'Org Not Found', err);
                            // return response;
                        }
                    )

                    return response;

                })


})

module.exports = router;