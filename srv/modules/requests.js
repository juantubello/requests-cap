const dotenv = require('dotenv');
const database = require('./database');
dotenv.config();

module.exports = {

    async getRequests(request) {
        return new Promise(async function (resolve, reject) {
            const dbdata = await database.select('SELECT * FROM requests');
            resolve(dbdata)
        });
    },

    async createRequest(request) {
        return new Promise(async function (resolve, reject) {
            const dbdata = await database.create(`INSERT INTO requests (id, status, description, cuit, name) VALUES (${request.id}, '${request.status}', '${request.description}', '${request.cuit}', '${request.name}');`);
            resolve(request)
        });
    },

}