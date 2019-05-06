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
const passport = require('passport');
const Strategy = require('passport-discord').Strategy;
const session = require('express-session');

module.exports.boot = (client) => {
    app.use(express.urlencoded());
    app.use(express.json());
    app.set('view engine', 'ejs');
    app.engine('ejs', ejs.renderFile);
    app.use(express.static(`${__dirname}/Public`));
    app.set('views', `${__dirname}/Views`);
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({
        secret: 'Shift | By Hayden and Hydrogen | very gey amirite | this is a very secure secret very cool | clap clap',
        resave: false,
        saveUninitialized: false
    }));

    let scopes = ['identify', 'guilds'];

    const isAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.redirect('/login');
    };

    app.get('/', (req, res) => {
        res.render('index', { req });
    });

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });

    passport.use(new Strategy({
        clientID: config.id,
        clientSecret: config.secret,
        callbackURL: `http://localhost/login/callback`,
        scope: scopes
    }, (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
            return done(null, profile);
        });
    }));

    app.get('/login', passport.authenticate('discord', { scopes }));

    app.get('/login/callback', passport.authenticate('discord', { failureRedirect: '/error' }), (req, res) => {
        res.redirect('/');
    });

    app.get('/logout', (req, res) => {
        req.logout();
    });

    app.get('/dashboard', isAuthenticated, (req, res) => {
        res.json({
            jeff: 'jeff'
        })
    })

    app.listen(config.web.port, async () => {
        log.success(`Webserver has launched on port/interface ${config.web.port}.`);
    });
}
