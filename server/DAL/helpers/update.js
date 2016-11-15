const { prop, forEach } = require('ramda');
const PouchDB = require('pouchdb-http');
const db = new PouchDB("http://127.0.0.1:5984/relief-tracker")

function updateDoc(doc, cb) {
    if (prop('_rev')(doc) === undefined || prop('_id')(doc) === undefined) {
        return cb(new Error('400 _rev or _id is missing'))
    }

    db.put(doc).then(function(res) {
        console.log('success!', res)
        return cb(null, res)
    }).catch(function(err) {
        console.log('failure!', err)
        return cb(err)
    })

}

function updatePerson(person,cb){
  updateDoc(person,cb)

}

function updateReliefEffort(effort,cb){
  updateDoc(effort,cb)
}

module.exports = {
  person: updatePerson,
  reliefEffort: updateReliefEffort
}
