const util = require('../utils');
const router = require('express').Router();
const passport = require("passport");
const Event = require('../models/event-model');
const Replay = require('../models/replay-parsed-models');
const { s3deleteFile } = require('../methods/aws-s3/delete-s3-file');
const { s3putObject } = require('../methods/aws-s3/put-s3-file');
const { prepImage } = require('../methods/image-upload-common');
const levelRestrict = require("../configs/admin-leveling");
// const playlistCurator = require('../workers/vods-playlist-curator');


router.get('/replay/map/name', (req, res) => {
    const path = 'api/utility/replay/map/name';
    var id = decodeURIComponent(req.query.id);


    Replay.findOne({ systemId: id }).then(
        found => {
            let map = { name: null };
            if (found) {
                map.name = found.match.map;
            }
            res.status(200).send(util.returnMessaging(path, 'Found replay:', null, map, null, null));
        },
        err => {
            res.status(500).send(util.returnMessaging(path, 'Error qeury replays', err, null, null, null));
        }
    )


});


router.get('/leagueOverallStats', (req, res) => {

    const path = '/utility/leagueOverallStats';

    commonResponseHandler(req, res, [], [], async(req, res) => {
        const response = {};
        let query = {
            $and: [{
                    dataName: "leagueRunningFunStats"
                },
                {
                    'data.span': "overall"
                }
            ]
        }

        return System.findOne(query).then(
            found => {
                response.status = 200;
                response.message = utils.returnMessaging(req.originalUrl, 'Found stat', false, found);
                return response;
            },
            err => {
                response.status = 400;
                response.message = utils.returnMessaging(req.originalUrl, 'Error getting stat.', err, null, null);
                return response;
            }
        );

    })


});


router.get('/frontPageStats', async(req, res) => {

    const path = '/utility/frontPageStats';

    const requiredParameters = [{
        name: 'stat',
        type: 'string'
    }]

    commonResponseHandler(req, res, requiredParameters, [], async(req, res, requiredParameters) => {
        const response = {};
        let currentSeasonInfo = await SeasonInfoCommon.getSeasonInfo();
        let query = {
            '$and': [{
                    'dataName': 'TopStatList'
                },
                {
                    'data.span': currentSeasonInfo.value
                },
                {
                    'data.stat': requiredParameters.stat.value
                }
            ]
        }

        return System.findOne(query).then(
            found => {
                response.status = 200
                response.message = utils.returnMessaging(req.originalUrl, 'Found stat', false, found)
                return response;
            },
            err => {
                response.status = 400;
                response.message = utils.returnMessaging(req.originalUrl, 'Error getting stat.', err, null, null);
                return response;
            }
        );
    })

});

//post
// path: /image/upload
// requires id, type, and base64 encoded image
// returns http success or error; json object of updated team if save was successful.
router.post('/image/upload', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const path = 'api/utility/image/upload';
    //TODO - replace this with direct to s3 method?
    //the file name will be the objectID     
    let id = req.body.id;
    let type = req.body.type;

    let dataURI = req.body.image;

    let logObj = {};
    logObj.actor = req.user.displayName;
    logObj.action = 'upload team logo ';
    logObj.target = id;
    logObj.logLevel = 'STD';

    prepImage(dataURI, { id }).then(
        preppedImage => {
            s3putObject(process.env.s3bucketGeneralImages, null, preppedImage.fileName, preppedImage.buffer);
            //this will have to be changed to adjust model depending on the type that has been sent
            if (type == 'event') {
                Event.findById(id).then(
                    foundEvent => {
                        if (foundEvent) {
                            var imageToDelete;
                            if (foundEvent.eventImage) {
                                imageToDelete = foundEvent.eventImage;
                            }
                            if (imageToDelete) {
                                s3deleteFile(process.env.s3bucketImages, null, imageToDelete);
                            }
                            foundEvent.eventImage = preppedImage.fileName;
                            foundEvent.save().then((savedEvent) => {
                                if (savedEvent) {
                                    res.status(200).send(util.returnMessaging(path, "File uploaded", false, savedEvent, null, logObj));
                                }
                            }, (err) => {
                                res.status(500).send(util.returnMessaging(path, "Error uploading file", err, null, null, logObj));
                            })
                        } else {
                            logObj.logLevel = 'ERROR';
                            logObj.error = 'Event was not found';
                            res.status(500).send(util.returnMessaging(path, "Error uploading file", false, null, null, logObj));
                        }
                    },
                    err => {
                        res.status(500).send(util.returnMessaging(path, "Error uploading file", err, null, null, logObj));
                    }
                )
            }
        },
        err => {
            logObj.logLevel = 'ERROR';
            logObj.error = 'File was too big';
            res.status(500).send(util.returnMessaging(path, "File is too big!", false, null, null, logObj));
        }
    );

});


router.post('/get/sys/dat', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  let path = '/team/get/sys/dat'

  try {
    let request = req.body.data;
    sysModels.system.findOne({
      'dataName': request
    }).then(
      (found) => {
        if (found) {
          res.status(200).send(utils.returnMessaging(req.originalUrl, 'Found sys data', false, found))
        } else {
          res.status(404).send(utils.returnMessaging(req.originalUrl, 'Sys data not found', false));
        }
      }, (err) => {
        res.status(500).send(utils.returnMessaging(req.originalUrl, 'error querying data', err));
      }
    )
  } catch (e) {
    res.status(500).send(utils.returnMessaging(req.originalUrl, 'Internal Server Error', e));
  }


});

module.exports = router;