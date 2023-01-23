const cds = require("@sap/cds");
const dotenv = require('dotenv')
const requestModule = require('./modules/requests');
dotenv.config()

async function createRequest(req) {
    // name: req.data.name
    const params = req.data 
    params.date = new Date().toLocaleString().split(',')[0];
    // params.request.date = new Date().toLocaleString().split(',')[0];
    params.status = 'P';
    const id = await requestModule.createRequest(params)
    req.data.id = id;
    return req.data;
}
async function getRequest(req) {
    const id = req.data.id
    const response = await requestModule.getRequests(id)
    return response;
}
async function getProducts(req) {
    const id = req.data.id
    const response = await requestModule.getProducts(id)
    return response;
}
async function getCompanies(req) {
    const id = req.data.id
    const response = await requestModule.getCompanies(id)
    return response;
}
async function updateRequest(req) {
    const params = {
        id: req.data.id,
        status: req.data.status
    }
    const response = await requestModule.updateRequest(params);
    return req.data;
}
module.exports = (srv) => {
    srv.on('READ', 'requests', async req => {
        return getRequest(req)
    })
    srv.on('READ', 'companies', async req => {
        return getCompanies(req)
    })
    srv.on('READ', 'products', async req => {
        return getProducts(req)
    })
    srv.on('INSERT', 'requests', async req => {
        return createRequest(req)
    })
    srv.on('UPDATE', 'requests', async req => {
        return updateRequest(req)
    })
}