const { Pool } = require('pg');
const cfenv = require('cfenv');
const dotenv = require('dotenv');

dotenv.config()

function getCredentials() {
  let credentials;
   if (process.env.ENVIROMENT === "prd") {
    const env = cfenv.getAppEnv();
    credentials = env.services["postgresql-db"][0].credentials
    return credentials;
   }
   credentials = {
     hostname: process.env.HOSTNAME,
     port: process.env.PORTNUMBER,
     dbname: process.env.DBNAME,
     username: process.env.USERNAME,
     password: process.env.PASSWORD,
   }
   return credentials;
}

const credentials = getCredentials();

const pool = new Pool({
  host: credentials.hostname,
  port: credentials.port,
  database: credentials.dbname,
  user: credentials.username,
  password: credentials.password,
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
});

module.exports = {
  async select(sql) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await pool.query(sql);
        const DBresponse = result.rows.map(row => {
          let str = JSON.stringify(row)
          let parsed = JSON.parse(str);
          return parsed;
        })
        resolve(DBresponse);
      }

      catch (ex) {
        reject("We messed up! " + ex);
      }
    });
  },
  async create(sql) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await pool.query(sql);
        resolve(result.rows[0].id);
      }
      catch (ex) {
        reject("We messed up! " + ex);
      }
    });
  },
  async update(sql) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await pool.query(sql);
        resolve('Record updated!');
      }
      catch (ex) {
        reject("We messed up! " + ex);
      }
    });
  }
};