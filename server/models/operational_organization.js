const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const operationalOrganizationSchema = new Schema({
   "orgId": String,
   "name": String,
   "abbreviation": String
});

const operationalOrganization = mongoose.model('operationalOrganization', operationalOrganizationSchema);


module.exports = operationalOrganization;