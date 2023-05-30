const http = require('http');
const users = require('./controllers/registeruser');
const configfile = require('./configuration');
const httpMsgs = require('./controllers/httpmessages');
const login = require('./controllers/loginuser');
const vote = require('./controllers/votingpage');
const pParty = require('./controllers/dashboardcontroller');

function enableCors(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Max-Age', '86400');
    return httpMsgs.show200(req, res);
  }

  next();
}

const server = http.createServer(function (req, res) {
  enableCors(req, res, () => {
    if (req.url === '/registeruser' && req.method === 'POST') {
      let reqBody = '';
      req.on('data', function (data) {
        reqBody += data;
        if (reqBody.length > 1e7) {
          httpMsgs.show413(req, res);
        }
      });
      req.on('end', function () {
        users.registerUser(req, res, reqBody);
      });
    } else if (req.url === '/loginuser' && req.method === 'POST') {
      let reqBody = '';
      req.on('data', function (data) {
        reqBody += data;
        if (reqBody.length > 1e7) {
          httpMsgs.show413(req, res);
        }
      });
      req.on('end', function () {
        login.loginUser(req, res, reqBody);
      });
    }
    else if (req.url === '/affirm' && req.method === 'POST') {
      let reqBody = '';
      req.on('data', function (data) {
        reqBody += data;
        if (reqBody.length > 1e7) {
          httpMsgs.show413(req, res);
        }
      });
      req.on('end', function () {
        vote.uservoted(req, res, reqBody);
      });

    }
    else if (req.url === '/votingpage' && req.method === 'POST') {
      let reqBody = '';
      req.on('data', function (data) {
        reqBody += data;
        if (reqBody.length > 1e7) {
          httpMsgs.show413(req, res);
        }
      });
      req.on('end', function () {
        vote.castVote(req, res, reqBody);
      });
    }
    else if (req.url === '/getparties' && req.method === 'GET') {
      vote.getParties(req, res);
    }
    else if (req.url === '/getPolicalparties' && req.method === 'GET') {
      pParty.getPoliticalParty(req, res);
    }
    else if(req.url === '/getPoliticalPartyVotes' && req.method === 'POST'){
      let reqBody = '';
      req.on('data', function (data) {
        reqBody += data;
        if (reqBody.length > 1e7) {
          httpMsgs.show413(req, res);
        }
      });
      req.on('end', function () {
        pParty.getPoliticalPartyVotes(req, res, reqBody);
      });
    }
    else if(req.url === '/getPercentage' && req.method === 'POST'){
      let reqBody = '';
      req.on('data', function (data) {
        reqBody += data;
        if (reqBody.length > 1e7) {
          httpMsgs.show413(req, res);
        }
      });
      req.on('end', function () {
        pParty.getPercentage(req, res, reqBody);
      });
    }
    else {
      httpMsgs.show404(req, res);
    }
  });
});

server.listen(configfile.PORT, function () {
  console.log('Server is listening on PORT:', configfile.PORT);
});

