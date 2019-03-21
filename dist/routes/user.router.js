"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.post('/login', user_controller_1.default.login);
        this.router.post('/register', user_controller_1.default.register);
        this.router.post('/', user_controller_1.default.createUser);
        this.router.get('/', user_controller_1.default.getUsers);
        this.router.get('/:id', user_controller_1.default.getUserById);
        this.router.put('/:id', user_controller_1.default.updateUser);
        this.router.delete('/:id', user_controller_1.default.deleteUser);
    }
}
exports.UserRouter = UserRouter;
exports.default = new UserRouter().router;
//# sourceMappingURL=user.router.js.map