const mysql = require('mysql')
const {map} = require('ramda')
const connection =  mysql.createConnection({
    host: "0.0.0.0",
    user: "root",
    password: "mypassword",
    database: "relieftracker"
})


function prepDataForDB(data) {
    if (data.hasOwnProperty('active') === true) {
        data.active = data.active === true ? 1 : 0
    }
    if (data.hasOwnProperty('type') === true) {
        delete data.type
    }
    if (data.hasOwnProperty('_id') === true) {
        delete data._id
    }
    return data;
}



function createPerson(data,cb){
  //todo:data validation - check the incoming data to ensure nothing is missing or not needed
  if(typeof data == "undefined" || data === null){
    return cb(new Error('400Missing data for create'))
  } else if (data.hasOwnProperty('_id') === true ){
    return cb(new Error('400unnecessary id property within data'))
  } else if (data.hasOwnProperty('lastName') !== true ){
    return cb(new Error('400Missing lastName property within data'))
  } else if (data.hasOwnProperty('firstName') !== true ){
    return cb(new Error('400Missing firstName property within data'))
  } else if (data.hasOwnProperty('email') !== true ){
    return cb(new Error('400missing email property within data'))
  }

  connection.query('INSERT INTO person SET ? ', prepDataForDB(data), function(err,res){
    if(err){
      cb(err)
    }
    if(typeof res !== 'undefined' && res.insertId !== 'undefined'){
      return cb(null, {
        ok: true,
        id: res.insertId
      })
    }
  })

  connection.end(function(err){
    if(err) return err
  })

}

function createReliefEffort(data,cb){
  console.log(prepDataForDB(data))
  if(typeof data == "undefined" || data === null){
    return cb(new Error('400Missing data for create'))
  } else if (data.hasOwnProperty('_id') === true ){
    return cb(new Error('400unnecessary id property within data'))
  } else if (data.hasOwnProperty('name') !== true ){
    return cb(new Error('400Missing name property within data'))
  } else if (data.hasOwnProperty('desc') !== true ){
    return cb(new Error('400Missing description property within data'))
  } else if (data.hasOwnProperty('organizationID') !== true ){
    return cb(new Error('400missing email property within data'))
  }else if (data.hasOwnProperty('active') === true ){
    return cb(new Error('400unnecessary active property within data'))
  }

  connection.query('INSERT INTO relief SET ? ', prepDataForDB(data), function(err,res){
    if(err){
      cb(err)
    }
    if(typeof res !== 'undefined' && res.insertId !== 'undefined'){
      return cb(null, {
        ok: true,
        id: res.insertId
      })
    }
  })

  connection.end(function(err){
    if(err) return err
  })
}

function updatePerson(data,cb){
  if(typeof data === 'undefined' || data === null){
    return cb(new Error('400Missing data for update'))
  }else if (data.hasOwnProperty('_id') !== true){
    return cb(new Error('400Missing id property'))
  }else {
    var ID = data._id

    connection.query('UPDATE person set ? where ID ='+ [ID], prepDataForDB(data), function(err,res){
      if(err){
        cb(err)
      }
      if(res){
        cb(null,{
          ok: true,
        })
      }
    })

    connection.end(function(err){
      if(err) return err
    })
  }
}

function updateReliefEffort(data,cb){
  if(typeof data === 'undefined' || data === null){
    return cb(new Error('400Missing data for update'))
  }else if (data.hasOwnProperty('_id') !== true){
    return cb(new Error('400Missing id property'))
  }else {
    var ID = data._id

    connection.query('UPDATE relief set ? where ID ='+[ID], prepDataForDB(data), function(err,res){
      if(err){
        cb(err)
      }
      if(res){
        cb(null,{
          ok: true,
        })
      }
    })

    connection.end(function(err){
      if(err) return err
    })
  }
}




function deleteItem(type,id,cb){
  if(typeof id === 'undefined' || id === null){
    return cb(new Error('400Missing data for update'))
  }else {
    connection.query('DELETE FROM ' + connection.escapeId(type) + ' WHERE ID = ' + id,function(err,res){
      if(err){
        cb({
          error: 'not_found',
          reason: 'missing',
          name: 'not_found',
          status: 404,
          message: 'missing'
        })
      }
      if(res){
        cb(null,{
          ok: true,
          id: id
        })
      }
    })
  }

  connection.end(function(err){
    if(err) return err
  })
}

function convertPerson(data){
  console.log(data)
  var output = {
    "_id": `person_${data.email}`,
    "firstName": data.firstName,
    "lastName": data.lastName,
    "phone": data.phone,
    "email": data.email,
    "type": "person",
    "active": data.active === 1 ? true : false
  }
  return output
}


function getDocById(type,id,cb){
  if(typeof id === 'undefined' || id === null){
    return cb(new Error('400Missing Id'))
  }else {
    connection.query('Select * FROM ' + connection.escapeId(type) + ' WHERE ID = ' + [id],function(err,res){
      if(err){
        cb(err)
      }
      if(res){
        res = type === 'person' ? convertPerson(res[0]) : convertReliefEffort(res[0])
        cb(null,res)
      }
    })
  }

  connection.end(function(err){
    if(err) return err
  })
}

function listPersons(tableName,sortBy,limit,cb){

  const connection =  mysql.createConnection({
      host: "0.0.0.0",
      user: "root",
      password: "mypassword",
      database: "relieftracker"
  })

  connection.query('SELECT * from vPerson WHERE sortToken > \'' + [sortBy] + '\' ORDER by sortToken LIMIT ' + [limit],function(err,res){
    if(err){
      return cb(err)
    }
    if(res){
      return cb(null,res)
    }
  })
  connection.end(function(err){
    if(err) return err
  })
}


function addTeam(item){

  function cb(err,res){
    if(err){
      console.log(err)
    }
    if(res) {
      console.log(res)
    }
  }
  var id = item.ID


  connection.query("select * from vreliefEffort where ID = " + [id],cb)

}

function listReliefEfforts(tableName,sortBy,limit,cb){

  const connection =  mysql.createConnection({
      host: "0.0.0.0",
      user: "root",
      password: "mypassword",
      database: "relieftracker"
  })
  connection.query('SELECT * from vRelief WHERE sortToken > \'' + [sortBy] + '\' ORDER by sortToken LIMIT ' + [limit],function(err,res){
    if(err){
      return cb(err)
    }
    if(res){
        var completeTeam = map(addTeam,res)

  connection.end(function(err){
    if(err) return err
  })
}

function getPerson(data,cb){
  getDocById('person', data._id, cb)
}

function getReliefEffort(data,cb){
  getDocById('relief', data._id, cb)
}

function deletePerson(data,cb){
  deleteItem('person',data._id,cb)
}

function deleteReliefEffort(data,cb){
  deleteItem('relief',data._id,cb)
}



  //todo: change the data before the query to the databsae is run. - remove the type key in json
  // todo: create a connection to mysql
  // todo: query the db by performing a sql insert into statment
  // todo: chanage the json from mysql to the spec from our app
  // todo: call the callback tell the api that we are done.


var dal = {

    createPerson: createPerson,
    createReliefEffort: createReliefEffort,
    deletePerson: deletePerson,
    deleteReliefEffort: deleteReliefEffort,
    getPerson: getPerson,
    getReliefEffort: getReliefEffort,
    updatePerson: updatePerson,
    updateReliefEffort: updateReliefEffort,
    listReliefEfforts: listReliefEfforts,
    listPersons: listPersons
}


module.exports = dal
