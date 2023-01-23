const dotenv = require('dotenv');
const database = require('./database');

dotenv.config();

function createFields(query) {
    return Object.keys(query);
}

function createValues(query) {
    let values = Object.values(query)
    const formattedValues = values.map(value => {
        if (typeof value === "string") {
            value = `'${value}'`
        }
        return value
    });
    return formattedValues
}

module.exports = {
    async getRequests(id) {
        return new Promise(async function (resolve, reject) {
            let dbdata;
            const isWithFilters = id ? true : false
            if (isWithFilters) {
                dbdata = await database.select(`SELECT * FROM requestsv2 where id = ${id}`);
            } else {
                dbdata = await database.select('SELECT * FROM requestsv2 ORDER BY id');
            }
            resolve(dbdata)
        });
    },
    async getProducts(id) {
        return new Promise(async function (resolve, reject) {
            let dbdata;
            const isWithFilters = id ? true : false
            if (isWithFilters) {
                dbdata = await database.select(`SELECT * FROM products where id = ${id}`);
            } else {
                dbdata = await database.select('SELECT * FROM products ORDER BY id');
            }
            resolve(dbdata)
        });
    },
    async createRequest(data) {
        return new Promise(async function (resolve, reject) {
            const fields = createFields(data)
            const values = createValues(data)
            const sql = `INSERT INTO requestsv2 ( ${fields} ) VALUES ( ${values} ) RETURNING id;`
            const id = await database.create(sql);
            resolve(id)
        });
    },
    async updateRequest(request) {
        return new Promise(async (resolve, reject) => {
            const QUERY = `UPDATE requestsv2 SET status = '${request.status}' WHERE id = ${request.id};`;
            const id = await database.update(QUERY);
            resolve("Record updated!")
        });
    },
    async getCompanies(id) {
        return new Promise(async function (resolve, reject) {
            let dbdata;
            const isWithFilters = id ? true : false
            if (isWithFilters) {
                dbdata = await database.select(`SELECT * FROM company_profile where id = ${id}`);
            } else {
                dbdata = await database.select('SELECT * FROM company_profile ORDER BY id');
            }
            resolve(dbdata)
        });
    }
}