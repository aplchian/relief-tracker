const express = require('express')
const app = express()
const port = process.env.PORT || 4040
const HTTPerror = require('node-http-error')
// const mySQLdal = require('../DAL/my-sql.js')
const dal = require('../DAL/no-sql.js')
const bodyParser = require('body-parser')


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function BuildResponseError(err) {

    const statuscheck = isNaN(err.message.substring(0, 3)) === true ? "400" : err.message.substring(0, 3)
    const status = err.status ? Number(err.status) : Number(statuscheck)
    const message = err.status ? err.message : err.message.substring(3)
    const reason = message
    const error = status === 400 ? "Bad Request" : err.name
    const name = error

    var errormsg = {}
    errormsg.error = error
    errormsg.reason = reason
    errormsg.name = name
    errormsg.status = status
    errormsg.message = message

    console.log("BuildResponseError-->", errormsg)
    return errormsg
}

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.get('/', function(err, res) {
    res.send('hello world!')
})

app.get('/bad', function(req, res, next) {
    var badErr = new HTTPerror(500, 'bad req', {
        the: 'request is bad'
    })
    next(badErr)
})

app.get('/reliefefforts/:effortID', function(req, res, next) {
    dal.getReliefEffort(req.params.effortID, function(err, body) {
        if (err) {
            var reliefErr = BuildResponseError(err)
            next(reliefErr)
        }
        if (body) {
            res.send(body)
        }
    })
})

app.get('/persons/:personId', function(req, res, next) {
    dal.getPerson(req.params.personId, function(err, body) {
        if (err) {
            var personErr = BuildResponseError(err)
            next(personErr)
        }
        if (res) {
            res.send(body)
        }
    })
})

app.get('/persons', function(req, res) {
    const sortByParam = req.query.sortby || 'email'
        // const sortBy = getPersonSortBy(sortByParam, dalModule)
    const sortBy = sortByParam
    const sortToken = req.query.sorttoken || ''
    const limit = req.query.limit || 30

    dal.listPersons(sortBy, sortToken, limit, function callback(err, data) {
        if (err) {
            return console.log(err.message)
        }
        if (data) {
            res.send(data)
        }
    })
})

app.get('/reliefefforts', function(req, res) {
    const sortByParam = req.query.sortby || 'reliefefforts'
        // const sortBy = getPersonSortBy(sortByParam, dalModule)
    const sortBy = sortByParam
    const sortToken = req.query.sorttoken || ''
    const limit = req.query.limit || 5

    dal.listReliefEfforts(sortBy, sortToken, limit, function callback(err, data) {
        if (err) {
            return console.log(err.message)
        }
        if (data) {
            res.send(data)
        }
    })
})


app.post('/persons', function(req, res, next) {
  console.log('req',req.body)
    dal.createPerson(req.body, function(err, body) {
        if (err) {
            var personErr = BuildResponseError(err)
            next(personErr)
        } else {
            res.send(body)
        }
    })
})

app.post('/reliefefforts', function(req, res, next) {
    dal.createReliefEffort(req.body, function(err, body) {
        if (err) {
            var personErr = BuildResponseError(err)
            next(personErr)
        } else {
            res.send(body)
        }
    })
})

app.put('/persons/:personId', function(req, res, next) {
    dal.updatePerson(req.body, function(err, body) {
        if (err) {
            var putErr = BuildResponseError(err)
            next(putErr)
        } else {
            res.send(body)
        }
    })
})

app.put('/reliefefforts/:reliefId', function(req, res, next) {
    dal.updateReliefEffort(req.body, function(err, body) {
        if (err) {
            var putErr = BuildResponseError(err)
            next(putErr)
        } else {
            res.send(body)
        }
    })
})



app.delete('/persons/:personId', function(req, res, next) {
    dal.getPerson(req.params.personId, function(err, body) {
        if (err) {
            var personErr = BuildResponseError(err)
            next(personErr)
        } else {
            dal.deletePerson(body, function(err, body) {
                if (err) {
                    var deleteErr = BuildResponseError(err)
                    next(deleteErr)
                } else {
                    res.send(body)
                }
            })
        }
    })
})

app.delete('/reliefEffort/:reliefId', function(req, res, next) {
    dal.getReliefEffort(req.params.reliefId, function(err, body) {
        if (err) {
            var reliefErr = BuildResponseError(err)
            next(reliefErr)
        } else {
            dal.deleteReliefEffort(body, function(err, body) {
                if (err) {
                    var deleteErr = BuildResponseError(err)
                    next(deleteErr)
                } else {
                    res.send(body)
                }
            })
        }
    })
})

app.listen(port, function(err, res) {
    if (!err) {
        console.log(`app listening on port ${port}`)
    }
})

app.use(function(err, req, res, next) {
    res.send(err)
})
