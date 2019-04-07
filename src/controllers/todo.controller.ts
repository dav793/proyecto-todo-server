const Todo = require('../models/todo.model').Todo;

export class TodoController {
    // -------------------- CREATE --------------------
    public createTodo = async (req, res) => {
        const todo = new Todo({
            body: req.body.body,
            done: req.body.done,
            userId: req.body.userId
        });
        await todo.save();
        res.json({
            status: 'Todo saved!!',
        });
    }

    // -------------------- READ --------------------
    public getAllTodo = async (req, res) => {
        const allTodo = await Todo.find();
        res.json(allTodo);
    }

    public getTodoById = async (req, res) => {
        const todo = await Todo.findById(req.params.id);
        res.json(todo);
    }

    // -------------------- UPDATE --------------------
    public updateTodo = async (req, res) => {
        const { id } = req.params;
        const todo = {
            body: req.body.body,
            done: req.body.done,
            userId: req.body.userId,
        };
        await Todo.findByIdAndUpdate(id, { $set: todo }, { new: true });
        res.json({ status: 'Todo updated' });
    }

    // -------------------- DELETE --------------------
    public deleteTodo = async (req, res) => {
        await Todo.findByIdAndRemove(req.params.id);
        res.json({ status: 'Todo deleted' });
    }
}

module.exports = new TodoController();