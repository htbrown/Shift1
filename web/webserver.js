/*
    Shift WebServer
    ---------------
    Backend: Hydrogen
    Frontend: Hayden/Hexabyte
    ---------------
    (c) Hydrogen.
    ---------------
    Routing must be handled through the appropriate file in the routes folder.
    If no file matches your use case, please create a new file with the same structure.
    Thank you.
*/

const express = require('express');
const app = express();
const log = require('hexalogger');
const ejs = require('ejs');
const config = require('../config.json');

module.exports.boot = () => {
    app.use(express.urlencoded());
    app.use(express.json());
    app.use(express.static(`${__dirname}/static`));


    const indexRoute = require('./routes/index.js');
    indexRoute.handle('/', { app, config });

    const authRoute = require('./routes/auth.js');
    authRoute.handle('/auth', { app, config });

    const dashRoute = require('./routes/dashboard.js');
    dashRoute.handle('/', { app, config });


    app.listen(config.web.port, async () => {
        log.success(`Webserver has launched on port/interface ${config.web.port}.`);
    });
}
