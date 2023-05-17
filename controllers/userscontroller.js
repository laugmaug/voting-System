const { error } = require('console');
const db = require('./dbconnection');
const httpMsg = require('./httpmessages');
const util = require('util');

function getUsers(req, res) {
    db.executeSql("SELECT * FROM Users", function (data, err) {
        if (err) {
            httpMsg.show500Error(req, res, err);
        } else {
            httpMsg.sendJson(req, res, data);
        }
    });
}

function getUserById(req, res, id) {
    db.executeSql("SELECT * FROM Users Where UserID = " + id, function (data, err) {
        if (err) {
            httpMsg.show500Error(req, res, err);
        } else {
            httpMsg.sendJson(req, res, data);
        }
        res.end();
    });

}

function registerUser(req, res, reqBody) {
    try {
        if (reqBody) {
            let data = JSON.parse(reqBody);
            if (data) {
                let sql = "INSERT INTO Users(FirstName, LastName, Email, Password, IDNumber) Values (";
                sql += util.format("'%s','%s', '%s','%s','%s'", data.FirstName, data.LastName, data.Email, data.Password, data.IDNumber) + ")";
                console.log( sql);
                db.executeSql(sql, function (data, err) {
                    if (err) {
                        httpMsg.show500Error(req, res, err);
                    } else {
                        httpMsg.show200(req,res);
                    }
                });
            }
            else {
                throw new error("Invalid input");
            }
        }

    }
    catch (ex) {
        httpMsg.show500Error(req, res, ex)
    }
}

module.exports = { getUserById, getUsers, registerUser }


