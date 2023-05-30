const db = require('./dbconnection');
const httpMsgs = require('./httpmessages');
const util = require('util');

async function getParties(req, res) {
  try {
      const data = await new Promise((resolve, reject) => {
        db.executeSql("SELECT PartyAbv FROM PoliticalParty", function (data, err) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
  
      httpMsgs.sendJson(req, res, data);
    
  } catch (err) {
    console.log(err);
    httpMsgs.show500Error(req, res, err);
  }
}

function castVote(req,res,reqBody){
  let userId = reqBody.split("#")[1];
  let partyAbv = reqBody.split("#")[0];

  //Append to DB 
  try {
    if (userId && partyAbv) {
        let sql = "INSERT INTO VoterCasts (IDNumber, PartyAbv) Values (";
        sql += util.format("'%s','%s'", userId, partyAbv) + ")";
        console.log(sql);
       
        db.executeSql(sql, function (data, err) {
          if (err) {
            httpMsgs.show500Error(req, res, err);
          } else {
            httpMsgs.sendJson(req,res,{message: "succesfully voted"});
          }
        });
      } else {
        throw new Error("Invalid input");
      }
    }
  catch (ex) {
    httpMsgs.show500Error(req, res, ex);
  }
}

async function uservoted(req, res, id){
  const sql = `SELECT * From VoterCasts Where IDNumber = '${id}'`;

  console.log(sql);

  //get records from db with userId
  const dbData = await new Promise((resolve, reject) => {
    db.executeSql(sql, function (data, err) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
        console.log(data);
      }
    });
  });
  
  if (dbData.recordset.length > 0) {
    //create a session here
    console.log(dbData.recordset);
    httpMsgs.sendJson(req, res, { message: "User voted already" });

    res.end();
  }
  else{
    httpMsgs.sendJson(req, res, { message: "New User" });
  }
}


module.exports = { getParties, castVote, uservoted };
