const cluster = require('cluster');
const worker = require('./worker');
const loadConfig = require("./loadConfig");

var WORKERS = process.env.WEB_CONCURRENCY || 1;


loadConfig().then(
    function(){
                    if (cluster.isMaster) {

                        //testing with two clusters until proofed in heroku
                        worker.init();

                        for (var i = 0; i < WORKERS; i++) {
                            console.log('forking cluster')
                            cluster.fork();
                        }

                        cluster.on('exit', function (worker) {
                            console.log('cleaning up fork');
                            cluster.fork();
                        })

                    } else {
                        require('./server');
                    }
    }
);

 