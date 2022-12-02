const cds = require("@sap/cds");
const dotenv = require('dotenv')
const requestModule = require('./modules/requests');
dotenv.config()

async function createRequest(req) {
    const params = {
        id: req.data.id,
        status: req.data.status,
        description: req.data.description,
        cuit: req.data.cuit,
        name: req.data.name
    }
    const response = await requestModule.createRequest(params)
    return response;
}

async function getRequest(req) {
    const response = await requestModule.getRequests()
    return response;
}

module.exports = cds.service.impl(async function () {
    const { requets } = this.entities;
    this.on("INSERT", requets, createRequest);
    this.on("READ", requets, getRequest);
});