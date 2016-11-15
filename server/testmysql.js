const dal = require('./DAL/my-sql.js')

var data = {
  "_id": 4,
  "phase": "complete",
  "name": "paris 2017",
  "organizationID": "test",
  "desc": "Build hospital in paris",
  "start": "2016-01-05",
  "end": "2022-02-15",
}

var cb = function(err,res){
  if(err){
    console.log(err.message)
  }
  if(res){
    console.log(res)
  }
}


dal.listReliefEfforts('','paris 2017',2,cb)
