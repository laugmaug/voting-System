const config = require('../configuration');

function show500Error(req, res, err) {
    if (config.httpMsgFormat === "HTML") {
        res.writeHead(500, "Internal error occurred", { "Content-Type": "text/html" });
        res.write("<html><head><title>500</title></head><body>500: Internal error occurred " + err + "</body></html>");
        res.end();
    } else {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ data: "Internal error occurred " + err }));
        res.end();
    }
}

function sendJson(req, res, data) {
    res.writeHead(200, { "Content-Type": "application/json" });
    if (data) {
        res.write(JSON.stringify(data));
    }

    res.end();
}

function show200 (req,res){
    res.writeHead(200,{"Content-Type":"application/json"});
    res.end();
}

function show404(req, res) {
    if (config.httpMsgFormat === "HTML") {
        res.writeHead(404, "Page not found", { "Content-Type": "text/html" });
        res.write("<html><head><title>404</title></head><body>404: Page not found </body></html>");
        res.end();
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ data: "Page not found" }));
        res.end();
    }
}

function show405(req, res) {
    if (config.httpMsgFormat === "HTML") {
        res.writeHead(405, "Method not supported", { "Content-Type": "text/html" });
        res.write("<html><head><title>405</title></head><body>405: Method not supported</body></html>");
        res.end();
    } else {
        res.writeHead(405, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ data: "Method not supported "}));
        res.end();
    }
}

function show413(req,res){
    if (config.httpMsgFormat === "HTML") {
        res.writeHead(413, "Request entity too large", { "Content-Type": "text/html" });
        res.write("<html><head><title>413</title></head><body>413: Request entity too large</body></html>");
        res.end();
    } else {
        res.writeHead(413, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ data: "Request entity too large"}));
        res.end();
    }
}

module.exports = { show500Error, sendJson, show200, show404,show405, show413 };

