const http = require('http');
const users = require('./controllers/userscontroller');
const configfile = require('./configuration');

http.createServer(function (req, res) { 
    switch (req.method) {
        case "GET":
            if (req.url === "/") {
                res.end();
            } else if (req.url === "/users") { 
                users.getUsers(req, res);
            }
            break;
        default:
            break;
    }
}).listen(configfile.PORT, function () {
    console.log("Server is listening on PORT:", configfile.PORT); 
});

