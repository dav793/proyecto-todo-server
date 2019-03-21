"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const User = require('../models/user.model');
class UserController {
    constructor() {
        this.logger = require('../winston');
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = new User({
                age: req.body.age,
                birthday: req.body.birthday,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            });
            yield user.save();
            res.json({
                status: 'Employee saved!!',
            });
        });
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const users = yield User.find();
            res.json(users);
        });
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield User.findById(req.params.id);
            res.json(user);
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = {
                age: req.body.age,
                birthday: req.body.birthday,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            };
            yield User.findByIdAndUpdate(id, { $set: user }, { new: true });
            res.json({ status: 'Employee updated' });
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield User.findByIdAndRemove(req.params.id);
            res.json({ status: 'Employee deleted' });
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    res.status(404).json(err);
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
            });
        });
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
        });
    }
}
exports.UserController = UserController;
exports.default = new UserController();
//# sourceMappingURL=user.controller.js.map