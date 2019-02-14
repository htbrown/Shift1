/**
 * Handles the path specified.
 * @param {*} path
 * @param {*} imports
 */

const log = require('hexalogger');

module.exports.handle = async (path, imports) => {
    log.info(`[index_route] Handling path '${path}'.`)

    const app = imports.app;
    
    app.get(path, async (req, res) => {
        res.send('Shift Dashboard | This page is experimental');
    })
};