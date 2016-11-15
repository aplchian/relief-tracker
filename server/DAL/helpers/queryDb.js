const {
    prop,
    forEach,
    map
} = require('ramda');
const PouchDB = require('pouchdb-http');
const db = new PouchDB("http://127.0.0.1:5984/relief-tracker")

function convertPerson(item) {
    item.doc.startKey = item.id
    return item.doc
}

function queryDb(sortBy, sortToken, limit, cb) {
    var options = {
        limit: limit,
        include_docs: true,
        startkey: sortToken
    }

    db.query(sortBy, options, function(err, res) {
        if (err) {
            cb(err, null)
        }
        if (res) {
            cb(null, map(convertPerson, res.rows))
        }
    })

}

module.exports = queryDb
