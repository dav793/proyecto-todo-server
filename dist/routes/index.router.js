"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport = require("passport");
const userController = require('../controllers/user.controller');
const User = require('../models/user.model');
class IndexRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get('/', (req, res) => {
            res.send('Hello World');
        });
        this.router.post('/login', (req, res, next) => {
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    res.status(404).json(err);
                    return;
                }
                else {
                    if (user) {
                        if (user.deleted) {
                            res.status(404).json(err);
                        }
                        else {
                            res.status(200).json({ token: user.generateJwt() });
                        }
                    }
                    else {
                        res.status(401).json(info);
                    }
                }
            })(req, res, next);
        });
        this.router.post('/createUser', userController.createUser);
    }
}
exports.IndexRouter = IndexRouter;
exports.default = new IndexRouter().router;
//# sourceMappingURL=index.router.js.map