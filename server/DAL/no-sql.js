/*jshint esversion: 6 */
const path = require('path');
const PouchDB = require('pouchdb-http');
PouchDB.plugin(require('pouchdb-mapreduce'));
const fetchConfig = require('zero-config');
const {
    prop,
    forEach,
    map
} = require('ramda');
var config = fetchConfig(path.join(__dirname, '..'), {
    dcValue: 'test'
});
const urlFormat = require('url').format;
const db = new PouchDB(urlFormat(config.get("couch")));
const rm = require('./helpers/delete.js')
const createPerson = require('./helpers/createPerson.js')
const createReliefEffort = require('./helpers/createReliefEffort.js')
const get = require('./helpers/get.js')
const update = require('./helpers/update.js')
const queryDb = require('./helpers/queryDb.js')


var dal = {

    createPerson: createPerson,
    createReliefEffort: createReliefEffort,
    deletePerson: rm.person,
    deleteReliefEffort: rm.reliefEffort,
    getPerson: get.person,
    getReliefEffort: get.reliefEffort,
    updatePerson: update.person,
    updateReliefEffort: update.reliefEffort,
    listReliefEfforts: queryDb,
    listPersons: queryDb

}

module.exports = dal
