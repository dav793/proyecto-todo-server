"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController = require('../controllers/user.controller');
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get('/', userController.getUsers);
        this.router.get('/:id', userController.getUserById);
    }
}
exports.UserRouter = UserRouter;
exports.default = new UserRouter().router;
//# sourceMappingURL=user.router.js.map