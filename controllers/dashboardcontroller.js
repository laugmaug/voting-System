const db = require('./dbconnection');
const httpMsg = require('./httpmessages');
const util = require('util');

function getPoliticalParty(req, res) {
    db.executeSql("SELECT * FROM PoliticalParty", function (data, err) {
        if (err) {
            httpMsg.show500Error(req, res, err);
        } else {
            //ID, Logo, Name, Abbr, Votes, Percentage
            httpMsg.sendJson(req, res, data);
        }
    });
}

function getPoliticalPartyVotes(req, res, abbr){
    db.executeSql("SELECT Count(PartyAbv) as votes FROM VoterCasts Where PartyAbv = '" + abbr +  "'", function (data, err) {
        if (err) {
            httpMsg.show500Error(req, res, err);
        } else {
            //ID, Logo, Name, Abbr, Votes, Percentage
            httpMsg.sendJson(req, res, data);
        }
    });
}

function getPercentage(req, res, votes){
    db.executeSql("SELECT Count(PartyAbv) as votes FROM VoterCasts", function (data, err) {
        if (err) {
            httpMsg.show500Error(req, res, err);
        } else {
            //ID, Logo, Name, Abbr, Votes, Percentage
            let total = data["recordset"][0]["votes"];
            let Percentage = ((votes/total)*100);
            httpMsg.sendJson(req, res, {percentage: Percentage});
        }
    });
}

module.exports = { getPoliticalParty, getPoliticalPartyVotes, getPercentage};