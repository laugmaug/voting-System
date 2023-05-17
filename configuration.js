const dbConfig = {
    server: "NOXOLOD\\SQLEXPRESS",
    database: "VotingSystem",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true
    }
};
const PORT = 5000;

const httpMsgFormat = "JSON";

module.exports = {
    dbConfig: dbConfig,
    PORT: PORT,
    httpMsgFormat: httpMsgFormat
};




