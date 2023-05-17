const http = require('http');
const users = require('./controllers/userscontroller');
const configfile = require('./configuration');
const httpMsgs = require('./controllers/httpmessages');

http.createServer(function (req, res) {
    switch (req.method) {
        case "GET":
            if (req.url === "/") {
                res.end();
            } else if (req.url === "/users") {
                users.getUsers(req, res);
            } else {
                let userIdPath = "[0-9]+"; 
                let path = new RegExp("/users/" + userIdPath);
                if (path.test(req.url)) {
                    path =new RegExp(userIdPath);
                    let userId = path.exec(req.url);
                    users.getUserById(req, res, userId);
                } else {
                    httpMsgs.show404(req, res);
                }
            }
            break;
        case "POST":
            if (req.url === "/users") {
                let reqBody = "";
                req.on("data", function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7) {
                        httpMsgs.show413(req, res);
                    }
                });
                req.on("end", function () {
                    users.registerUser(req, res, reqBody);
                });
            } else {
                httpMsgs.show404(req, res);
            }
            break;
        default:
            httpMsgs.show405(req, res);
            break;
    }
}).listen(configfile.PORT, function () {
    console.log("Server is listening on PORT:", configfile.PORT);
});
