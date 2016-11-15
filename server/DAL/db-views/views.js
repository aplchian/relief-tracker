const createView = require('./addView.js')



var email = {
  _id: "_design/emailtest",
  views: {
    emailtest: {
      map: function(doc) {
        if(doc.type === 'person'){
          emit(null,doc.firstName+ " "+doc.email)
        }
      }.toString()
    }
  }
}

var reliefEfforts = {
  _id: "_design/reliefefforts",
  views: {
    reliefefforts: {
      map: function(doc) {
        if(doc.type === 'relief'){
          emit(null,doc.firstName+ " "+doc.email)
        }
      }.toString()
    }
  }
}




createView(email)
