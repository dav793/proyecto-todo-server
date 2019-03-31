import { Router } from 'express';
import * as passport from 'passport';

const userController = require('../controllers/user.controller');
const User = require('../models/user.model');

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

        /*
            Se tiene que enviar acorde a lo siguiente:
            {
                "username": "andresnboza",
                "password": "123",
            }  
        */
        this.router.post('/login', (req, res, next) => {
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    res.status(404).json(err);
                    return;
                } else {
                    if (user) {
                        if (user.deleted) {
                            // The user is found
                            res.status(404).json(err);
                        } else {
                            // The user is not found
                            res.status(200).json({ token: user.generateJwt() });
                        }
                    } else {
                        // user is not found
                        res.status(401).json(info);
                    }
                }
            })(req, res, next);
        });

        /*
            Se necesita de todo lo siguiente en el body:
            {
                "firstName": "",
                "lastName": "",
                "username": "",
                "email": "",
                "updatePassword: true,
            }
        */
        this.router.post('/createUser', userController.createUser);
    }
}

export default new IndexRouter().router;
