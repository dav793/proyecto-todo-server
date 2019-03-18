import * as bodyParser from 'body-parser';
import * as express from 'express';

import IndexRouter from './routes/index.router';
import TodoRouter from './routes/todo.router';
import UserRouter from './routes/user.router';

const mongoose = require('mongoose');
const env = require('../config/environment.template');
const morgan = require('morgan');
const logger = require('./winston');
const passport = require('./passport');

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.database();
        this.middleware();
        this.authentication();
        this.routes();
        this.handleErrors();
    }

    private database() {
        if (process.env.NODE_ENV === 'test') {
            return;
        } else {
            let url;
            if (env.DB_AUTH) {
                url = `mongodb://${env.DB_USER}:${env.DB_PWD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`;
            } else {
                url = `mongodb://${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`;
            }
            mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false });
            // console.log('url ---> ' + url);
            const db = mongoose.connection;
            db.on('error', () => {
                console.error.bind(console, 'connection error:');
            });
            db.on('open', () => {
                console.log('Connection to DB server established');
            });
        }
    }

    private middleware() {
        this.app.use(morgan('dev', { stream: logger.stream }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    // User authentication
    private authentication() {
        require('./passport');
        this.app.use(passport.initialize());

        const expressJwt = require('express-jwt');
        const authenticate = expressJwt({ secret: env.JWT_SECRET });

        // protect api routes
        this.app.use('/users', authenticate, (req, res, next) => { next(); });
    }

    private routes() {
        this.app.use('/', IndexRouter);
        this.app.use('/users', UserRouter);
        this.app.use('/users/todo', TodoRouter);

        this.app.all('*', (req: any, res: any) => {
            console.log(`[TRACE] Server 404 request: ${req.originalUrl}`);
            res.sendStatus(404);
        });
    }

    private handleErrors() {
        this.app.use((err, req, res, next) => {
            logger.error(err.stack);
            if (res.headersSent) {
                return next(err);
            }
            if (process.env.NODE_ENV === 'production') {
                res.status(500).send(err.message);
            } else {
                res.status(500).send(err.stack);
            }
        });
    }
}

export default new App().app;
