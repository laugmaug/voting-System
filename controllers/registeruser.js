const db = require('./dbconnection');
const httpMsg = require('./httpmessages');
const util = require('util');

function getUsers(req, res) {
  db.executeSql("SELECT * FROM Users", function (data, err) {
    if (err) {
      httpMsg.show500Error(req, res, err);
    } else {
      httpMsg.sendJson(req, res, data);
      let jsonObject = JSON.parse(data);

      console.log(jsonObject);

      const resArray = [];
      for (const [key, value] of Object.entries(data)) {
        resArray.push([`${key}`, `${value}`]);
      }

      console.log(data);
      // console.log(jsonObject);
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
        console.log(sql);

        db.executeSql(sql, function (data, err) {
          if (err) {
            httpMsg.show500Error(req, res, err);
          } else {
            httpMsg.show200(req, res);
          }
        });
      } else {
        throw new Error("Invalid input");
      }
    }
  } catch (ex) {
    httpMsg.show500Error(req, res, ex);
  }
}

function loginUser(req, res, idNumber, password) {
    const sql = `SELECT * FROM Users WHERE IDNumber = '${idNumber}' AND Password = '${password}'`;
      executeSql(sql, function (data, err) {

      if (err) {
        httpMsg.show500Error(req, res, err);
      } else {
        if (data && data.recordset.length > 0) {
          httpMsg.show200(req, res, "Login successful");
        } else {
          httpMsg.show401Error(req, res, "Invalid credentials");
        }
      }
    });
  }
  

module.exports = { getUserById, getUsers, registerUser };
