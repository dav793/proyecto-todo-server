"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_controller_1 = require("../controllers/todo.controller");
class TodoRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.post('/', todo_controller_1.default.createTodo);
        this.router.get('/', todo_controller_1.default.getAllTodo);
        this.router.get('/:id', todo_controller_1.default.getTodoById);
        this.router.put('/:id', todo_controller_1.default.updateTodo);
        this.router.delete('/:id', todo_controller_1.default.deleteTodo);
    }
}
exports.TodoRouter = TodoRouter;
exports.default = new TodoRouter().router;
//# sourceMappingURL=todo.router.js.map