"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoController = require('../controllers/todo.controller');
class TodoRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.post('/', todoController.createTodo);
        this.router.get('/', todoController.getAllTodo);
        this.router.get('/:id', todoController.getTodoById);
        this.router.put('/:id', todoController.updateTodo);
        this.router.delete('/:id', todoController.deleteTodo);
    }
}
exports.TodoRouter = TodoRouter;
exports.default = new TodoRouter().router;
//# sourceMappingURL=todo.router.js.map