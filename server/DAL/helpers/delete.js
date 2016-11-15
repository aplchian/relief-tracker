const { prop, forEach } = require('ramda');
const PouchDB = require('pouchdb-http');
const db = new PouchDB("http://127.0.0.1:5984/relief-tracker")

function deleteDoc(doc, cb) {
    if (prop('_rev')(doc) === undefined || prop('_id')(doc) === undefined) {
        return cb(new Error('400 _rev or _id is missing'))
    }
    db.remove(doc).then(function(res) {
        console.log('success!', res)
        return cb(null, res)
    }).catch(function(err) {
        console.log('failure!', err)
        return cb(err)
    })
}

function deletePerson(person,cb){
  deleteDoc(person,cb)

}

function deleteReliefEffort(effort,cb){
  deleteDoc(effort,cb)
}

module.exports = {
  person: deletePerson,
  reliefEffort: deleteReliefEffort
}
