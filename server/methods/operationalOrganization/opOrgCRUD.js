const logger = require('../../subroutines/sys-logging-subs').logger;
const OpOrg = require('../../models/operational_organization');
const utils = require('../../utils');
const uniqid = require('uniqid');
const lodash = require('lodash');

async function saveOpOrg(org){
    console.log('a')
    if (utils.isNullEmptyOrUndefined(org.orgId)) {
        org.orgId = uniqid();
    }

    return OpOrg.findOneAndUpdate({
        orgId:org.orgId
    }, org, {
        new:true,
        upsert:true
    }).then(
        saved=>{
            console.log('b')
            try{
                            let loggerObj = {};
                            loggerObj.logLevel = 'ADMIN';
                            loggerObj.location = 'saveOpOrg';
                            loggerObj.action = 'upsert oporg: success';
                            loggerObj.timeStamp = Date.now();
                            logger(loggerObj);
            }catch(e){
                console.log(e);
            }

            return saved;
        },err=>{
            console.log('c')
            let loggerObj = {};
            loggerObj.logLevel = 'ERR:ADMIN';
            loggerObj.location = 'saveOpOrg';
            loggerObj.action = 'upsert oporg: failed';
            loggerObj.error = err;
            loggerObj.timeStamp =  Date.now();
            logger(loggerObj)
            throw err;
        }
    )
}

async function findOrgBy(criteriaObject){
    const refactoredQuery = {};

    lodash.forEach(criteriaObject, (v,k)=>{
        refactoredQuery[k]={
            '$regex': new RegExp(v, "i")
        }
    });
   return OpOrg.find(refactoredQuery).then(
        found=>{
            return found;
        },
        err=>{
            throw err;
        }
    )
}

async function getAllOrgs(){
    try{
              return OpOrg.find({}).lean().then(
                  found => {
                      return found;
                  },
                  err => {
                      throw err;
                  }
              )
    }catch(e){console.log(e)}

}

module.exports = {
    saveOpOrg: saveOpOrg,
    findOrgBy: findOrgBy,
    getAllOrgs: getAllOrgs
}