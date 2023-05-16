const configs = require('../configuration');
const sqlDb = require('mssql/msnodesqlv8');

const executeSql = function (sql, callback) {
    let conn = new sqlDb.ConnectionPool(configs.dbConfig);
    conn.connect()
        .then(function () {
            let request = new sqlDb.Request(conn);

            request.query(sql)
                .then(function (dbData) {
                    callback(dbData);
                })
                .catch(function (err) {
                    console.log(err);
                    callback(null, err);
                });
        })
        .catch(function (err) {
            console.log(err);
            callback(null, err);
        });
};

module.exports = {executeSql};