const { prop, forEach } = require('ramda');
const PouchDB = require('pouchdb-http');
const db = new PouchDB("http://127.0.0.1:5984/relief-tracker")

function getDocById(id,cb){
  console.log(id)
  db.get(id).then(function(res){
    return cb(null, res)
  }).catch(function(err){
    return cb(err)
  })
}


function getPerson(id,cb){
  getDocById(id,cb)
}

function getReliefEffort(id,cb){
  getDocById(id,cb)
}


module.exports = {
  person: getPerson,
  reliefEffort: getReliefEffort
}
