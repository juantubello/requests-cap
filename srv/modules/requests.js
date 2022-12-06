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
            const fields = `name, differenciators, benchmark, price_from, tec_spec, hs_code, image, expected, market_obj, market_exp, channel, market_dif, nif, country, email, telephone, empl_num, sales_from, sales_to, industry, target, status, type, date`;
            const values = `'${request.name}', '${request.differenciator}', '${request.benchmark}', '${request.price_from}', '${request.tec_spec}','${request.hs_code}','${request.image}','${request.expected}','${request.market_obj}','${request.market_exp}','${request.channel}','${request.market_dif}','${request.nif}','${request.country}','${request.email}','${request.telephone}','${request.empl_num}','${request.sales_from}','${request.sales_to}','${request.industry}','${request.target}','${request.status}','${request.type}','${request.date}'`;
            const dbdata = await database.create(`INSERT INTO requests ( ${fields} ) VALUES ( ${values} );`);
            request.id = "1234";
            resolve(request)
        });
    },

}