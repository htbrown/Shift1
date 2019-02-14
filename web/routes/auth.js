/**
 * Handles the path specified.
 * @param {*} path
 * @param {*} imports
 */

const log = require('hexalogger');

module.exports.handle = async (path, imports) => {
    log.info(`[auth_route] Handling path '${path}'.`)

    const app = imports.app;
    
    app.get(`${path}/login`, async (req, res) => {
        res.send('Login route for Shift Dashboard | This page is experimental.');
    })
};