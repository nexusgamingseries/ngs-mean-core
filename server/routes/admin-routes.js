const util = require('../utils');
const router = require('express').Router();
const passport = require("passport");
const System = require("../models/system-models");
const levelRestrict = require("../configs/admin-leveling");
const seasonInfoCommon = require("../methods/seasonInfoMethods");
const OpOrg = require('../methods/operationalOrganization/opOrgCRUD');
const { commonResponseHandler } = require("../commonResponseHandler");

router.post('/upsertOpOrg', passport.authenticate('jwt', {
    session: false
}), levelRestrict.scheduleGenerator, (req, res)=>{

    const route = '/admin/upsertOpOrg';

    let requiredParameters = [{
        name:'opOrg',
        type:'object'
    }]


    commonResponseHandler(req, res, requiredParameters, [], async (req, res, requiredParameters) => {
        let response = {};
        //log object
        let logObj = {};
        logObj.actor = req.user.displayName;
        logObj.action = 'upsert operational organization';
        logObj.target = requiredParameters.opOrg.value.name;
        logObj.logLevel = 'ADMIN';
        console.log('1')
        await OpOrg.saveOpOrg(requiredParameters.opOrg.value).then(
            saved=>{
                console.log('2')
                console.log('saved', saved);
                response.status = 200;
                response.message = util.returnMessaging(req.originalUrl, "Success", false, saved, null, logObj)
            },err=>{
                response.status=400;
                response.message=util.returnMessaging(req.originalUrl, 'failure to upsert', err, null, null, logObj)
            }
        )
        return response;
    })

})

router.post('/upsertSeasonInfo', passport.authenticate('jwt', {
    session: false
}), levelRestrict.scheduleGenerator, (req, res) => {

    const path = '/admin/upsertSeasonInfo';

    let seasonInfoObj = req.body;

    console.log('seasonInfoObj', seasonInfoObj);

    try {
        seasonInfoObj = util.validateInputs.object(seasonInfoObj);

        if (seasonInfoObj.valid) {
            let logObj = {};
            logObj.actor = '/upsertSeasonInfo';
            logObj.action = 'upserting season info';
            logObj.target = 'System table: season info :' + seasonInfoObj.value.value;
            logObj.logLevel = 'STD';
            logObj.timeStamp = Date.now();

            let scheduleQuery = {
                $and: [{
                        'dataName': 'seasonInfo'
                    },
                    {
                        'data.value': seasonInfoObj.value.value
                    }
                ]
            };
            let postedInfo = {
                'dataName': 'seasonInfo',
                'data': seasonInfoObj.value
            };

            System.system.findOneAndUpdate(
                scheduleQuery, postedInfo, {
                    new: true,
                    upsert: true
                }
            ).then(
                saved => {
                    res.status(200).send(util.returnMessaging(path, "Upserted the season schedule.", false, saved, null, logObj));
                },
                err => {
                    res.status(500).send(util.returnMessaging(path, "Upsert season schedule failed.", err, null, null, logObj));
                }
            );
        } else {
            //bad inputs
            let message = 'Error: ';

            message += 'value (number) is required!';

            res.status(500).send(util.returnMessaging(path, message));
        }
    } catch (e) {
        console.log(e);
        util.errLogger(path, e);
        res.status(500).send(util.returnMessaging(path, 'Internal Server Error', e));
    }


});

router.get('/getSeasonInfo', (req, res) => {

    const path = '/admin/getSeasonInfo';

    let specificSeason = req.query.season;
    specificSeason = util.validateInputs.number(specificSeason);


    if (specificSeason.valid) {
        try {
            seasonInfoCommon.getSeasonInfo(specificSeason.value).then(
                process => {
                    res.status(200).send(util.returnMessaging(path, "Found the season schedule.", false, process, null));
                }
            )
        } catch (e) {
            util.errLogger(path, e);
            res.status(500).send(util.returnMessaging(path, "Error in node", err, null, null));
        }
    } else {
        try {
            seasonInfoCommon.getSeasonInfo().then(
                process => {
                    if (process) {
                        res.status(200).send(util.returnMessaging(path, "Found the season schedule.", false, process, null));
                    } else {
                        res.status(500).send(util.returnMessaging(path, "Error finding season schedule.", false, null, null));
                    }
                }
            )
        } catch (e) {
            util.errLogger(path, e);
            res.status(500).send(util.returnMessaging(path, "Error in node", err, null, null));
        }
    }

})

module.exports = router;