const cds = require("@sap/cds");
const dotenv = require('dotenv')
// const requestModule = require('./modules/requests');
// dotenv.config()

async function createRequest(req) {
    // const params = req.data
    // params.date = new Date().toLocaleString().split(',')[0];
    // params.status = 'P';
    // const id = await requestModule.createRequest(params)
    // req.data.id = id;
    // return req.data;
}
async function getRequest(req) {
    // console.log(req.headers.email)
    // const id = req.data.id
    // const email = req.data.email
    // console.log(email)
    // const response = await requestModule.getRequest(id)
    // return response;
}
async function getRequests(req) {
    // let isEntity = false, response
    // if (req.data.hasOwnProperty("id")) {
    //     isEntity = true
    // }
    // try {
    //     if (isEntity) {
    //         response = await requestModule.getRequest(req.data)
    //     }
    //     else {
    //         response = await requestModule.getRequests(req._query.$filter)
    //     }
    //     return response;
    // }
    // catch (err) {
    //     return err
    // }
}
async function getProducts(req) {
    // const id = req.data.id
    // const response = await requestModule.getProducts(id)
    // return response;
}
async function getCompanies(req) {
    // const id = req.data.id
    // const response = await requestModule.getCompanies(id)
    // return response;
}
async function updateRequest(req) {
    // const params = {
    //     id: req.data.id,
    //     status: req.data.status
    // }
    // const response = await requestModule.updateRequest(params);
    // return req.data;
}
async function getCountries(req) {
    // const data = await requestModule.getCountries()
    // return data
}
async function getIndustries(req) {
    // const data = await requestModule.getIndustries()
    // return data
}
module.exports = (srv) => {
    srv.on('READ', 'requests', async req => {
        return {id:1234,email:"test@test", date:"06/07/2023"}
    })
    srv.on('READ', 'companies', async req => {
        // return getCompanies(req)
    })
    srv.on('READ', 'products', async req => {
        // return getProducts(req)
    })
    srv.on('INSERT', 'requests', async req => {
        // return createRequest(req)
    })
    srv.on('UPDATE', 'requests', async req => {
        // return updateRequest(req)
    })
    srv.on('READ', 'countries', async req => {
        // return getCountries(req)
    })
    srv.on('READ', 'industries', async req => {
        // return getIndustries(req)
    })
}