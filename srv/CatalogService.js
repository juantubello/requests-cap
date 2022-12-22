const cds = require("@sap/cds");
const dotenv = require('dotenv')
const requestModule = require('./modules/requests');
dotenv.config()

async function createRequest(req) {
    const params = {
        name: req.data.name,
        differenciators: req.data.differenciators,
        benchmark: req.data.benchmark,
        price_from: req.data.price_from,
        tec_spec: req.data.tec_spec,
        hs_code: req.data.hs_code,
        image: req.data.image,
        expected: req.data.expected,
        market_obj: req.data.market_obj,
        market_exp: req.data.market_exp,
        channel: req.data.channel,
        market_dif: req.data.market_dif,
        nif: req.data.nif,
        country: req.data.country,
        email: req.data.email,
        telephone: req.data.telephone,
        empl_num: req.data.empl_num,
        sales_from: req.data.sales_from,
        sales_to: req.data.sales_to,
        industry: req.data.industry,
        target: req.data.target,
        status: req.data.status,
        type: req.data.type,
        date: req.data.date
    }
    const id = await requestModule.createRequest(params)
    req.data.id = id;
    return req.data;
}
async function getRequest(req) {
    const id = req.data.id
    const response = await requestModule.getRequests(id)
    return response;
}
async function getClients(req) {
    // const id = req.data.id
    // const response = await requestModule.getRequests(id)
    return {
        id: 12345,
        name: "ClientName"
    };
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
    srv.on('READ', 'clients', async req => {
        return getClients(req)
    })
    srv.on('INSERT', 'requests', async req => {
        return createRequest(req)
    })
    srv.on('UPDATE', 'requests', async req => {
        return updateRequest(req)
    })
}