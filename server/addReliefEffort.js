/*jshint esversion: 6 */
////////////////////
//     NO SQL
////////////////////

// To run program.js from terminal, ensure you are in the correct directory
//  and run the following command:
// $ NODE_ENV=production node addReliefEffort.js

const dalNoSQL = require('./DAL/noSQL.js');

const createReliefEffortDataHugo = {
    "phase": "completed",
    "name": "Hurricane Hugo 1989",
    "organizationID": "Hurricane Helpers",
    "desc": "Purricane Hugo was a powerful Cape Verde-type hurricane that caused widespread damage and loss of life in the Leeward Islands, Puerto Rico, and the Southeast United States in 1989",
    "start": "1989-09-10",
    "end": "1989-09-25",
    "active": true
};



const createReliefEffortDataHaiti2015 = {
    "_id": "relief_St_Phillips_Haiti_2015",
    "type": "relief",
    "phase": "completed",
    "name": "Haiti 2015",
    "organizationID": "St. Phillips",
    "desc": "Build school desks and blackboards at the St. Esprit (Holy Spirit) church and school in the remote village of Gros Mangle in the island of La Gonave, Haiti. Home base is located in the main town of Anse - à - Galets at the St.François d’ Assise church and school.",
    "start": "2015-09-25",
    "end": "2015-10-01",
    "team": [{
        "name": "Steve Ananias",
        "role": "Team Leader",
        "personID": "person_stevean@duke.edu"
    }, {
        "name": "Libby Satterfield",
        "role": "Team member",
        "personID": "person_lsat1972@gmail.com"
    }, {
        "name": "Judy Jones",
        "role": "Team member",
        "personID": "person_judy5555@aol.com"
    }]
};


const createReliefEffortDataHaiti2017 = {
    "type": "relief",
    "phase": "planning",
    "name": "Haiti 2017",
    "organizationID": "St. Phillips",
    "desc": "Provide dental services, education, and supplies to the village of Gros Mangle on the island of La Gonave, Haiti.  Island of La Gonave, Haiti. Home base is located in the main town of Anse - à - Galets at the St.François d’ Assise church and school.The bulk of the mission work will take place at St.Esprit(Holy Spirit) church and school in the remote village of Gros Mangle, Haiti.The team will consist of team leaders, dentists, and dental hygienists.",
    "start": "2016-11-01",
    "end": "2016-11-08",
    "team": [{
        "name": "Steve Harvey",
        "role": "Team Leader",
        "personID": "person_steveharvey1111@gmail.com"
    }, {
        "name": "Libby Satterfield",
        "role": "Team member",
        "personID": "person_lsat1972@gmail.com"
    }, {
        "name": "Jimmy Martin",
        "role": "Team member",
        "personID": "person_JimmyMartinJr@gmail.com"
    }]
}

const createReliefEffortDataKenya2015 = {
    "phase": "completed",
    "name": "Kenya 2015",
    "organizationID": "St. Phillips",
    "desc": "Build school in Kenya",
    "start": "2015-01-05",
    "end": "2015-02-15"
}

const createReliefEffortDataKenya2016 = {
    "type": "relief",
    "phase": "completed",
    "name": "Kenya 2016",
    "organizationID": "St. Phillips",
    "desc": "Build hospital in Kenya",
    "start": "2016-01-05",
    "end": "2016-02-15",
    "active": true
}

//console.log(dalNoSQL.getDBInfo());
