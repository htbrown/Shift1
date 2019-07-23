const express = require('express');
const session = require('express-session');
const config = require('../config.json');
const passport = require('passport');
const { Strategy } = require('passport-discord');
const ejs = require('ejs');
const app = express();
const logger = require('hexalogger');

module.exports = (client, guilds) => {
    app.set('view engine', 'ejs');
    app.engine('ejs', ejs.renderFile);
    app.set('views', `${__dirname}/Views`);
    app.use(express.static(`${__dirname}/Public`));
    app.use(express.urlencoded());
    app.use(express.json());

    let scopes = ['identify', 'guilds'];

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });

    passport.use(new Strategy({
        clientID: require('../config.json').id,
        clientSecret: require('../config.json').secret,
        callbackURL: `http://dash.shiftbot.xyz:2020/login/callback`,
        scope: scopes
    }, (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
            return done(null, profile);
        });
    }));

    app.use(session({
        secret: 'iris is much gay this is worlds best secret for encryption shift best bot all devs gay i mean hi person maintaining my code',
        resave: false,
        saveUninitialized: false
    }));

    const checkAuth = (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.redirect('/login');
    };

    app.use(passport.initialize());
    app.use(passport.session());

    app.listen(config.web.port, '0.0.0.0', () => {
        console.log('[web] Web Server has launched.')
    })

    /* Main pages */
    app.get('/', (req, res) => {
        res.render('index', {
            req,
            res,
            client,
            guilds,
            user: req.user
        });
    })
    
    app.get('/error', (req, res) => {
        res.render('error', {
            req,
            res,
            client,
            guilds,
            error: 'user-initiated'
        });
    })
    /* - Main pages */

    /* Dashboard pages */
    app.get('/login', passport.authenticate('discord', { scopes }));

    app.get('/login/callback', passport.authenticate('discord', { failureRedirect: '/error' }), (req, res) => {
        res.redirect('/dashboard');
    });

    app.get('/dashboard', checkAuth, (req, res) => {
        res.render('server-select', { client, user: req.user, req });
    })

    app.get('/dashboard/:serverID', checkAuth, (req, res) => {
        res.redirect(`/dashboard/${req.params.serverID}/info`)
    })

    app.get('/dashboard/:serverID/:page', checkAuth, (req, res) => {
        if (client.guilds.get(req.params.serverID).members.get(req.user.id).hasPermission('MANAGE_GUILD')) {
            try {
                const URLS = {
                    prefix: `http://localhost/dashboard/${req.params.serverID}/prefix`
                };

                logger.info(`DASHBOARD ROUTE REQUESTED: ${req.params.page}`);
                res.render(`server-${req.params.page}`, { guilds, client, user: req.user, req, guild: client.guilds.get(req.params.serverID), version: require('../package.json').version, URLS });
            } catch(e) {
                res.render('error', { error: 'DASHBOARD_SERVER_PAGE_LOAD_FAIL' });
                logger.warn('DASHBOARD_SERVER_PAGE_LOAD_FAIL (0x2020)');
            }
        }

    })

    app.post('/api/prefix', checkAuth, (req, res) => {
        prefix = req.body.prefix;
        console.log(prefix);
        let guild = guilds.get(req.params.serverID);
        guild.prefix = prefix;
        guilds.set(req.params.serverID, guild);
    })

    app.post('/api/rmstrike', checkAuth, (req, res) => {
        let strikeID = req.body.strikeID;
        let userID = req.body.userID;
        let guildID = req.body.guildID;

        delete guilds.get(guildID).strikes[userID][strikeID];
    })

    app.get('/logout', checkAuth, (req, res) => {
        req.logout();
        res.redirect('/');
    })
    /* - Dashboard pages */
};
