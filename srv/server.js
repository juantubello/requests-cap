const cds = require("@sap/cds");
const proxy = require("@sap/cds-odata-v2-adapter-proxy");
const cors = require('cors');

const PORT = 8080;
const HOST = '0.0.0.0';

cds.on("bootstrap", app => {
    app.use(cors());
    app.use(proxy({ path: "v2", port: PORT }));
})

module.exports = cds.server;