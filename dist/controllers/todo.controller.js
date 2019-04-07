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
const Todo = require('../models/todo.model').Todo;
class TodoController {
    constructor() {
        this.createTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const todo = new Todo({
                body: req.body.body,
                done: req.body.done,
                userId: req.body.userId
            });
            yield todo.save();
            res.json({
                status: 'Todo saved!!',
            });
        });
        this.getAllTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const allTodo = yield Todo.find();
            res.json(allTodo);
        });
        this.getTodoById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const todo = yield Todo.findById(req.params.id);
            res.json(todo);
        });
        this.updateTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const todo = {
                body: req.body.body,
                done: req.body.done,
                userId: req.body.userId,
            };
            yield Todo.findByIdAndUpdate(id, { $set: todo }, { new: true });
            res.json({ status: 'Todo updated' });
        });
        this.deleteTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield Todo.findByIdAndRemove(req.params.id);
            res.json({ status: 'Todo deleted' });
        });
    }
}
exports.TodoController = TodoController;
module.exports = new TodoController();
//# sourceMappingURL=todo.controller.js.map