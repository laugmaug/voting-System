const db = require('./dbconnection');
const httpMsgs = require('./httpmessages');

async function loginUser(req, res, reqBody) {
  const { IDNumber, Password } = JSON.parse(reqBody);
  console.log(reqBody);

  const sql = `SELECT IDNumber, Password FROM Users WHERE IDNumber = '${IDNumber}' AND Password = '${Password}'`;

  console.log(sql);

  try {
    const dbData = await new Promise((resolve, reject) => {
      db.executeSql(sql, function (data, err) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    if (dbData.recordset.length > 0) {
      //create a session here
      res.setHeader('Set-Cookie', 'myCookie=' + '${IDNumber}' + '; Path=/; Max-Age=3600');

      httpMsgs.sendJson(req, res, { message: "Successfully logged in" });
      console.log(dbData);
      
    } else {
      httpMsgs.show401Error(req, res);
    }
  } catch (err) {
    httpMsgs.show500Error(req, res, err);
  }
}

module.exports = { loginUser };
