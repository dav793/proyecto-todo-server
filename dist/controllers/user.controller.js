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
const User = require('../models/user.model').User;
class UserController {
    constructor() {
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                email: req.body.email,
                updatePassword: req.body.updatePassword
            });
            if (req.body.password) {
                user.setPassword(req.body.password);
                yield user.save();
                const token = user.generateJwt();
                res.json({
                    'Token': token
                });
            }
            else {
                res.json({
                    'status': 'user not saved something, password is missing'
                });
            }
        });
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const users = yield User.find();
            res.json(users);
        });
    }
}
exports.UserController = UserController;
module.exports = new UserController();
//# sourceMappingURL=user.controller.js.map