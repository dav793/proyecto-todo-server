import { Router } from 'express';
import * as passport from 'passport';
import IndexController from '../controllers/index.controller';
const IUserModel = require('../models/user.model');

export class IndexRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.get('/', (req, res) => {
            res.send('Hello World');
        });
        this.router.post('/login', (req, res) => {
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    res.status(404).json(err);
                    return;
                } else {
                    if (user) {
                        if (user.deleted) { // The user is found
                            res.status(404).json(err);
                        } else { // The user is not found
                            res.status(200).json({token: user.generateJwt() });
                        }
                    } else {
                        // user is not found
                        res.status(401).json(info);
                    }
                }
            });
        });
    }
}

export default new IndexRouter().router;
