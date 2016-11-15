const PouchDB = require('pouchdb-http');
const db = new PouchDB("http://127.0.0.1:5984/relief-tracker")



module.exports = function(doc){

  db.put(doc,function(err,res){
    if(err) console.log(err.message)
    if(res) console.log(res)
  })

}
