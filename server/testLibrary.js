/*jshint esversion: 6 */
const dalNoSQL = require('./DAL/noSQL.js');

const path = require('path');
const PouchDB = require('pouchdb-http');
PouchDB.plugin(require('pouchdb-mapreduce'));
const fetchConfig = require('zero-config');
//const uuid = require('node-uuid');

var config = fetchConfig(path.join(__dirname, '.'), {
    dcValue: 'test'
});

const couch_base_uri = config.get("couch.baseURI") + ':' + config.get("couch.port") + "/";
const couch_dbname = config.get("couch.dbName");
const db = new PouchDB(couch_base_uri + couch_dbname);

function removeDoc(data) {
    var removeDoc = {
        _id: data.id,
        _rev: data.rev
    }

    db.remove(removeDoc, function(err, response) {
        if (err) console.log(err);
    });
}

function missingPersonDataTest(data, withOrWithout, test, number, remove) {
    dalNoSQL.createPerson(data, function callback(err, response) {
        if (err) {
            console.log("Test #", number, ": Success --> createPerson() prevented me from adding a person ", withOrWithout, test, ". Message: ", err.message);
        }
        if (response && response.ok === true) {
            console.log("Test #", number, ": Fail --> createPerson() allowed me to add ", response.id, " to the database ", withOrWithout, test);
            if (remove) {
                removeDoc(response);
            }
        }
    });
}

function missingPersonDataRemoveTest(data, withOrWithout, test, number) {
    dalNoSQL.deletePerson(data, function callback(err, response) {
        if (err) {
            console.log("Test #", number, ": Success --> deletePerson() prevented me from deleting a person", withOrWithout, test, ". Message: ", err.message);
        }
        if (response && response.ok === true) {
            console.log("Test #", number, ": Fail --> deletePerson() allowed me to delete ", response.id, " from the database ", withOrWithout, test);
        }
    });
}

function missingPersonDataUpdateTest(data, withOrWithout, test, number) {
    dalNoSQL.updatePerson(data, function callback(err, response) {
        if (err) {
            console.log("Test #", number, ": Success --> updatePerson() prevented me from updating a person", withOrWithout, test, ". Message: ", err.message);
        }
        if (response && response.ok === true) {
            console.log("Test #", number, ": Fail --> updatePerson() allowed me to update ", response.id, " from the database ", withOrWithout, test);
        }
    });
}

function AddPersonTest(data, number, remove) {
    dalNoSQL.createPerson(data, function callback(err, response) {
        if (err) {
            console.log("Test #", number, ": Fail --> createPerson() did not add person to the database.", data);
        }
        if (response && response.ok === true) {
            console.log("Test #", number, ": Success --> createPerson() allowed me to add ", response.id, " to the database. ");
            if (remove) {
                removeDoc(response);
            }
        }
    });
}

function removePersonTest(data, number) {
    dalNoSQL.deletePerson(data, function callback(err, response) {
        if (err) {
            console.log("Test #", number, ": Fail --> deletePerson() was unable to delete the person: ", err.message);
        }
        if (response && response.ok === true) {
            console.log("Test #", number, ": Success --> deletePerson() deleted the person with an _id: ", data._id);
        }
    });
}

function updatePersonTest(data, number) {
    dalNoSQL.updatePerson(data, function callback(err, response) {
        if (err) {
            console.log("Test #", number, ": Fail --> updatePerson() was unable to update the person: ", err.message);
        }
        if (response && response.ok === true) {
            console.log("Test #", number, ": Success --> updatePerson() updated the person with an _id: ", data._id);
            db.remove({
                _id: response.id,
                _rev: response.rev
            }, function(deleteErr, deleteResponse) {
                if (deleteErr) return console.log("removing test data... delete error!", deleteErr);

            })
        }
    });
}




function missingReliefEffortDataTest(data, withOrWithout, test, number, remove) {
    dalNoSQL.createReliefEffort(data, function callback(err, response) {
        if (err) {
            console.log("Test #", number, ": Success --> createReliefEffort() prevented me from adding a relief effort ", withOrWithout, test, ". Message: ", err.message);
        }
        if (response && response.ok === true) {
            console.log("Test #", number, ": Fail --> createReliefEffort() allowed me to add ", response.id, " to the database ", withOrWithout, test);
            if (remove) {
                removeDoc(response);
            }
        }
    });
}

function missingReliefEffortDataRemoveTest(data, withOrWithout, test, number) {
    dalNoSQL.deleteReliefEffort(data, function callback(err, response) {
        if (err) {
            console.log("Test #", number, ": Success --> deleteReliefEffort() prevented me from deleting a relief effort ", withOrWithout, test, ". Message: ", err.message);
        }
        if (response && response.ok === true) {
            console.log("Test #", number, ": Fail --> deleteReliefEffort() allowed me to delete ", response.id, " from the database ", withOrWithout, test);
        }
    });
}

function missingReliefEffortDataUpdateTest(data, withOrWithout, test, number) {
    dalNoSQL.updateReliefEffort(data, function callback(err, response) {
        if (err) {
            console.log("Test #", number, ": Success --> updateReliefEffort() prevented me from updating a relief effort", withOrWithout, test, ". Message: ", err.message);
        }
        if (response && response.ok === true) {
            console.log("Test #", number, ": Fail --> updateReliefEffort() allowed me to update ", response.id, " from the database ", withOrWithout, test);
        }
    });
}

function AddReliefEffortTest(data, number, remove) {
    dalNoSQL.createReliefEffort(data, function callback(err, response) {
        if (err) {
            console.log("Test #", number, ": Fail --> createReliefEffort() did not add relief effort to the database.", data);
        }
        if (response && response.ok === true) {
            console.log("Test #", number, ": Success --> createReliefEffort() allowed me to add ", response.id, " to the database. ");
            if (remove) {
                removeDoc(response);
            }
        }
    });
}

function removeReliefEffortTest(data, number) {
    dalNoSQL.deleteReliefEffort(data, function callback(err, response) {
        if (err) {
            console.log("Test #", number, ": Fail --> deleteReliefEffort() was unable to delete the relief effort: ", err.message);
        }
        if (response && response.ok === true) {
            console.log("Test #", number, ": Success --> deleteReliefEffort() deleted the relief effort with an _id: ", data._id);
        }
    });
}

function updateReliefEffortTest(data, number) {
    dalNoSQL.updateReliefEffort(data, function callback(err, response) {
        if (err) {
            console.log("Test #", number, ": Fail --> updateReliefEffort() was unable to update the relief effort: ", err.message);
        }
        if (response && response.ok === true) {
            console.log("Test #", number, ": Success --> updateReliefEffort() updated the relief effort with an _id: ", data._id);
            db.remove({
                _id: response.id,
                _rev: response.rev
            }, function(deleteErr, deleteResponse) {
                if (deleteErr) return console.log("removing test data... delete error!", deleteErr);

            })
        }
    });
}





//////////////////
// Test Library
//////////////////
function createPerson() {

    const PersonWithMissingEmail = {
        type: "person",
        firstName: "Jeff",
        lastName: "Cave",
        phone: "843 333-1111"
    };

    const PersonWithMissingFirst = {
        type: "person",
        lastName: "Tucker",
        phone: "843 123-4567",
        email: "tuckerT@comcast.net"
    };

    const PersonWithMissingLast = {
        type: "person",
        firstName: "T",
        phone: "843 123-4567",
        email: "tuckerT@comcast.net"
    };

    const PersonWith_id = {
        _id: "someid",
        type: "person",
        firstName: "T",
        lastName: "Tucker",
        phone: "843 123-4567",
        email: "tuckerT@comcast.net"
    };

    const PersonWithNoProblems = {
        type: "person",
        firstName: "George",
        lastName: "Washington",
        phone: "843 323-3434",
        email: "george@yahoo.com"
    };

    missingPersonDataTest(PersonWithMissingEmail, "without", "Email", 1, true);
    missingPersonDataTest(PersonWithMissingFirst, "without", "First Name", 2, true);
    missingPersonDataTest(PersonWithMissingLast, "without", "Last Name", 3, true);
    missingPersonDataTest(PersonWith_id, "with", "_id", 4, true);
    AddPersonTest(PersonWithNoProblems, 5, true)
}

function createReliefEffort() {

    const ReliefEffortWithMissingName = {
        "phase": "completed",
        "organizationID": "Disaster Helpers",
        "desc": "Disaster 1",
        "start": "2005-08-23",
        "end": "2005-09-31",
        "active": true
    };

    const ReliefEffortWithMissingOrgID = {
        "phase": "completed",
        "name": "Disaster 2",
        "desc": "Disaster 2",
        "start": "2005-08-23",
        "end": "2005-09-31",
        "active": true
    };

    const ReliefEffortWithMissingPhase = {
        "organizationID": "Disaster Helpers",
        "name": "Disaster 3",
        "desc": "Disaster 3",
        "start": "2005-08-23",
        "end": "2005-09-31",
        "active": true
    };

    const ReliefEffortWith_id = {
        "_id": "someid",
        "phase": "completed",
        "organizationID": "Disaster Helpers",
        "name": "Disaster 3",
        "desc": "Disaster 3",
        "start": "2005-08-23",
        "end": "2005-09-31",
        "active": true
    };

    const ReliefEffortNoProblems = {
        "phase": "completed",
        "name": "Hurricane Camille 1968",
        "organizationID": "Hurricane Helpers",
        "desc": "Provide water purification systems. Hurricane Camille was a storm.",
        "start": "2005-08-23",
        "end": "2005-09-31",
        "active": true
    };

    const createReliefEffortDataKatrina = {
        "phase": "completed",
        "name": "Hurricane Katrina 2005",
        "organizationID": "Hurricane Helpers",
        "desc": "Provide water purification systems. Hurricane Katrina was the eleventh named storm and fifth hurricane of the 2005 Atlantic hurricane season. It was the costliest natural disaster, as well as one of the five deadliest hurricanes, in the history of the United States.",
        "start": "2005-08-23",
        "end": "2005-09-31",
        "active": true
    };

    missingReliefEffortDataTest(ReliefEffortWithMissingName, "without", "Name", 1, true);
    missingReliefEffortDataTest(ReliefEffortWithMissingOrgID, "without", "Organization ID", 2, true);
    missingReliefEffortDataTest(ReliefEffortWithMissingPhase, "without", "Phase", 3, true);
    missingReliefEffortDataTest(ReliefEffortWith_id, "with", "_id", 4, true);
    AddReliefEffortTest(ReliefEffortNoProblems, 5, true);
}


function deleteReliefEffort() {

    const reliefEfforts = [{
        "phase": "completed",
        "name": "Hurricane Camille 1968",
        "organizationID": "Hurricane Helpers",
        "desc": "Provide water purification systems. Hurricane Camille was a storm.",
        "start": "2005-08-23",
        "end": "2005-09-31",
        "active": true
    }, {
        "phase": "completed",
        "name": "Hurricane Katrina 2005",
        "organizationID": "Hurricane Helpers",
        "desc": "Provide water purification systems. Hurricane Katrina was the eleventh named storm and fifth hurricane of the 2005 Atlantic hurricane season. It was the costliest natural disaster, as well as one of the five deadliest hurricanes, in the history of the United States.",
        "start": "2005-08-23",
        "end": "2005-09-31",
        "active": true
    }];

    db.bulkDocs(reliefEfforts, function(err, response) {
        if (err) {
            return console.log(err);
        }
        // handle result
        if (response) {
            //console.log(response)
            missingReliefEffortDataRemoveTest({
                //_id: response[0].id,
                _rev: response[0].rev
            }, "without", "_id", 1)
            missingReliefEffortDataRemoveTest({
                _id: response[0].id,
                //_rev: response[0].rev
            }, "without", "_rev", 2)
            removeReliefEffortTest({
                _id: response[0].id,
                _rev: response[0].rev
            }, 3)
            removeReliefEffortTest({
                _id: response[1].id,
                _rev: response[1].rev
            }, 4)
        }
    });

}


function deletePerson() {

    const peoples = [{
        firstName: "Monique",
        lastName: "Martin",
        phone: "404 357-2222",
        email: "monique@gmail.com",
        type: "person",
        active: true
    }, {
        firstName: "Steve",
        lastName: "Martin",
        phone: "303 400-6000",
        email: "wildandcrazyguy@gmail.com",
        type: "person",
        active: true
    }];

    db.bulkDocs(peoples, function(err, response) {
        if (err) {
            return console.log(err);
        }
        // handle result
        if (response) {
            //console.log(response)
            missingPersonDataRemoveTest({
                //_id: response[0].id,
                _rev: response[0].rev
            }, "without", "_id", 1)
            missingPersonDataRemoveTest({
                _id: response[0].id,
                //_rev: response[0].rev
            }, "without", "_rev", 2)
            removePersonTest({
                _id: response[0].id,
                _rev: response[0].rev
            }, 3)
            removePersonTest({
                _id: response[1].id,
                _rev: response[1].rev
            }, 4)
        }
    });
}


function updatePerson() {
    const peoples = [{
        _id: "person_debby@wahwaaah.com",
        firstName: "Debby",
        lastName: "Downer",
        phone: "404 357-3416",
        email: "debby@wahwaaah.com",
        type: "person",
        active: true
    }, {
        _id: "person_patjeffriesjr1987@gmail.com",
        firstName: "Pat",
        lastName: "Jeffries",
        phone: "303 400-6000",
        email: "patjeffriesjr1987@gmail.com",
        type: "person",
        active: true
    }];

    db.bulkDocs(peoples, function(err, response) {
        if (err) {
            return console.log(err);
        }
        // handle result
        if (response) {
            const debbyUpdateData = {
                _rev: response[0].rev,
                firstName: "Debby",
                lastName: "Downer",
                phone: "404 357-3416",
                email: "debby@downer.com",
                type: "person",
                active: true
            }

            const patUpdateData = {
                _id: response[1].id,
                firstName: "Pat",
                lastName: "Jeffries",
                phone: "303 400-9999",
                email: "patjeffriesjr1989@gmail.com",
                type: "person",
                active: true
            }

            missingPersonDataUpdateTest(debbyUpdateData,
                "without",
                "_id", 1)
            missingPersonDataUpdateTest(patUpdateData,
                "without",
                "_rev",
                2)

            debbyUpdateData._id = response[0].id
            patUpdateData._rev = response[1].rev
            updatePersonTest(debbyUpdateData, 3)
            updatePersonTest(patUpdateData, 4)
        }
    });
}


function updateReliefEffort() {
    const reliefEfforts = [{
        _id: "relief_St_Phillips_Kenya_2013",
        type: "relief",
        phase: "completed",
        name: "Kenya 2013",
        organizationID: "St. Phillips",
        desc: "Build school in Kenya",
        start: "2013-01-05",
        end: "2013-02-15"
    },{
        _id: "relief_St_Phillips_Kenya_2012",
        type: "relief",
        phase: "completed",
        name: "Kenya 2012",
        organizationID: "St. Phillips",
        desc: "Build school in Kenya",
        start: "2012-01-05",
        end: "2012-02-15"
    }];

    db.bulkDocs(reliefEfforts, function(err, response) {
        if (err) {
            return console.log(err);
        }
        // handle result
        if (response) {

            console.log("Adding test reliefEfforts: ", response)
            const kenya2013Data = {
                _rev: response[0].rev,
                type: "relief",
                phase: "completed",
                name: "Kenya 2013",
                organizationID: "St. Phillips",
                desc: "Build school in Kenya",
                start: "2013-01-22",
                end: "2013-02-29"
            }

            const kenya2012Data ={
                _id: response[1].id,
                type: "relief",
                phase: "completed",
                name: "Kenya 2012",
                organizationID: "St. Phillips",
                desc: "Build school in Kenya",
                start: "2012-01-05",
                end: "2012-02-15"
            }

            missingReliefEffortDataUpdateTest(kenya2013Data,
                "without",
                "_id", 1)
            missingReliefEffortDataUpdateTest(kenya2012Data,
                "without",
                "_rev",
                2)

            kenya2013Data._id = response[0].id
            kenya2012Data._rev = response[1].rev
            updateReliefEffortTest(kenya2013Data, 3)
            updateReliefEffortTest(kenya2012Data, 4)
        }
    });
}

var testLibrary = {
    createPerson: createPerson,
    updatePerson: updatePerson,
    deletePerson: deletePerson,
    createReliefEffort: createReliefEffort,
    updateReliefEffort: updateReliefEffort,
    deleteReliefEffort: deleteReliefEffort
};

module.exports = testLibrary;
