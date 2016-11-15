var ddoc = {
    "_id": "_design/relief-test",
    "views": {
        "viewname": {
            "map": "function(doc) { ... }",
            "reduce": "function(keys, values) { ... }"
        }
    }
}

pouch.put(ddoc).then(function(){
  //success
}).catch(function(err){
  console.log(err)
})

db.query('my_index/by_name').then(function (res) {
  // got the query results
}).catch(function (err) {
  // some error
});


function myMapFunction(doc) {
  if (doc.type === 'pokemon') {
    if (doc.name === 'Pikachu') {
      emit('Pika pi!');
    } else {
      emit(doc.name);
    }
  }
}


// find pokemon with name === 'Pika pi!'
pouch.query(myMapFunction, {
  key          : 'Pika pi!',
  include_docs : true
}).then(function (result) {
  // handle result
}).catch(function (err) {
  // handle errors
});

// find the first 5 pokemon whose name starts with 'P'
pouch.query(myMapFunction, {
  startkey     : 'P',
  endkey       : 'P\uffff',
  limit        : 5,
  include_docs : true
}).then(function (result) {
  // handle result
}).catch(function (err) {
  // handle errors
});
