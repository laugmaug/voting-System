const db = require('./dbconnection');
const httpMsg = require('./httpmessages');
const util = require('util');

function loginUser(req, res, idNumber, password) {
    if (password && idNumber) {

        let sql = "select IDNumber, Password from Users where IDNumber = ";
        sql += util.format("'%s'", idNumber);
        sql+= "and Password =";
        sql+= util.format("'%s'",password);

        console.log(sql);
        db.executeSql(sql, function (data, err) {
            if (err) {
                httpMsg.show500Error(req, res, err);
            } else {
                httpMsg.sendJson(req, res, data);
                return data;
            }
        });
    }
}

module.exports = {
    loginUser: loginUser
};
