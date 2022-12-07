const dotenv = require('dotenv');
const database = require('./database');
dotenv.config();

module.exports = {

    async getRequests(id) {
        return new Promise(async function (resolve, reject) {
            let dbdata;
            const isWithFilters = id ? true : false
            if (isWithFilters) {
                dbdata = await database.select(`SELECT * FROM requests where id = ${id}`);
            } else {
                dbdata = await database.select('SELECT * FROM requests');
            }
            resolve(dbdata)
        });
    },
    async createRequest(request) {
        return new Promise(async function (resolve, reject) {
            const fields = `name, differenciators, benchmark, price_from, tec_spec, hs_code, image, expected, market_obj, market_exp, channel, market_dif, nif, country, email, telephone, empl_num, sales_from, sales_to, industry, target, status, type, date`;
            const values = `'${request.name}', '${request.differenciator}', '${request.benchmark}', '${request.price_from}', '${request.tec_spec}','${request.hs_code}','${request.image}','${request.expected}','${request.market_obj}','${request.market_exp}','${request.channel}','${request.market_dif}','${request.nif}','${request.country}','${request.email}','${request.telephone}','${request.empl_num}','${request.sales_from}','${request.sales_to}','${request.industry}','${request.target}','${request.status}','${request.type}','${request.date}'`;
            const id = await database.create(`INSERT INTO requests ( ${fields} ) VALUES ( ${values} ) RETURNING id;`);
            resolve(id)
        });
    },
    async updateRequest(request) {
        return new Promise(async (resolve, reject) => {
            const id = await database.update(`UPDATE requests SET status = '${request.status}' WHERE id = ${request.id};`);
            resolve("Record updated!")        
        });
    }
}