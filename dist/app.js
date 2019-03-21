"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const index_router_1 = require("./routes/index.router");
const todo_router_1 = require("./routes/todo.router");
const user_router_1 = require("./routes/user.router");
const mongoose = require('mongoose');
const env = require('../config/environment.template');
const morgan = require('morgan');
const logger = require('./winston');
const passport = require('./passport');
class App {
    constructor() {
        this.app = express();
        this.database();
        this.middleware();
        this.authentication();
        this.routes();
        this.handleErrors();
    }
    database() {
        if (process.env.NODE_ENV === 'test') {
            return;
        }
        else {
            let url;
            if (env.DB_AUTH) {
                url = `mongodb://${env.DB_USER}:${env.DB_PWD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`;
            }
            else {
                url = `mongodb://${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`;
            }
            mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false });
            const db = mongoose.connection;
            db.on('error', () => {
                console.error.bind(console, 'connection error:');
            });
            db.on('open', () => {
                console.log('Connection to DB server established');
            });
        }
    }
    middleware() {
        this.app.use(morgan('dev', { stream: logger.stream }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    authentication() {
        require('./passport');
        this.app.use(passport.initialize());
        const expressJwt = require('express-jwt');
        const authenticate = expressJwt({ secret: env.JWT_SECRET });
        this.app.use('/users', authenticate, (req, res, next) => { next(); });
    }
    routes() {
        this.app.use('/', index_router_1.default);
        this.app.use('/users', user_router_1.default);
        this.app.use('/users/todo', todo_router_1.default);
        this.app.all('*', (req, res) => {
            console.log(`[TRACE] Server 404 request: ${req.originalUrl}`);
            res.sendStatus(404);
        });
    }
    handleErrors() {
        this.app.use((err, req, res, next) => {
            logger.error(err.stack);
            if (res.headersSent) {
                return next(err);
            }
            if (process.env.NODE_ENV === 'production') {
                res.status(500).send(err.message);
            }
            else {
                res.status(500).send(err.stack);
            }
        });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map