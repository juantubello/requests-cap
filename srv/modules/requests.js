const dotenv = require('dotenv');
const database = require('./database');
const ADMIN = 'ADMIN'
const USER = 'USER'

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

/**
 * Esta función toma una cadena de texto que representa una consulta con formato OData,
 * extrae los componentes de la consulta (campo, operador y valor), y devuelve un array
 * de objetos que contienen estos componentes.
 *
 * El regex utilizado busca palabras de caracteres de palabra seguidas por el operador "eq"
 * y una cadena de caracteres entre comillas simples, o un número entero. Los componentes
 * encontrados se almacenan en objetos y se agregan a un array de salida.
 *
 * @param {string} input - La cadena de texto que representa la consulta.
 * @returns {Object[]} - Un array de objetos que contienen los componentes de la consulta.
 */
function parseInput(input) {
    const regex = /(\w+)\s(eq)\s('.*?'|\d+)/g;
    const matches = input.matchAll(regex);
    const output = [];

    for (const match of matches) {
        const field = match[1];
        const operator = match[2];
        let value = match[3].replace(/'/g, '');
        if (!isNaN(value)) {
            value = parseInt(value);
        }
        output.push({ field, operator, value });
    }

    return output;
}

/**
 * Esta función recibe un arreglo de objetos que contienen los campos "field", "operator" y "value",
 * y devuelve el objeto que cumple con la condición de tener el campo "field" igual a "email".
 * Si no encuentra ningún objeto que cumpla la condición, devuelve null.
 */
function getFilterValues(input, field) {
    for (let i = 0; i < input.length; i++) {
        if (input[i].field === field) {
            return input[i];
        }
    }
    return null;
}

function getUserCategory(email) {
    const emailLength = email.length;
    const emailTrim = email.trim().length;
    const category = emailLength - emailTrim;
    if (category === 1) {
        return "Access Denied. You don't have authorization";
    }
    if (category === 0) {
        return USER;
    }
    if (category === 2) {
        return ADMIN;
    }
}

module.exports = {
    async getRequest(data) {
        return new Promise(async function (resolve, reject) {
            let dbdata;
            const category = getUserCategory(data.email)
            if (category === ADMIN || category === USER) {
                dbdata = await database.select(`SELECT * FROM requestsv2 where id = ${data.id}`);
            }
            resolve(dbdata)
        });
    },
    async getRequests(request) {
        return new Promise(async function (resolve, reject) {
            let query = '';
            let isWithFilters = false
            const parsedRequest = parseInput(request)
            const id = getFilterValues(parsedRequest, 'id');
            const email = getFilterValues(parsedRequest, 'email');

            if (id !== null) {
                isWithFilters = true
            }

            const category = getUserCategory(email.value)

            switch (category) {
                case ADMIN:
                    if (isWithFilters) {
                        query = `SELECT * FROM requestsv2 where id = ${id.value}`
                    }
                    else {
                        query = 'SELECT * FROM requestsv2 ORDER BY id'
                    }
                    break

                case USER:
                    if (isWithFilters) {
                        query = `SELECT * FROM requestsv2 where id = ${id.value} and email = '${email.value.trim()}'`
                    }
                    else {
                        query = `SELECT * FROM requestsv2 where email = '${email.value.trim()}' ORDER BY id`
                    }
                    break
            }
            if (query.length < 1) {
                reject(category)
            }
            const dbdata = await database.select(query);
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
    },
    async getCountries() {
        return new Promise(async (resolve, reject) => {
            let dbdata
            try {
                dbdata = await database.select(`SELECT * FROM countries`)
                resolve(dbdata)
            } catch (err) { reject(err) }
        })
    },
    async getIndustries() {
        return new Promise(async (resolve, reject) => {
            let dbdata
            try {
                dbdata = await database.select(`SELECT * FROM industries`)
                resolve(dbdata)
            } catch (err) { reject(err) }
        })
    }
}