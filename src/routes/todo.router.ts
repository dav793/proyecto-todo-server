import { Router } from 'express';
import todoController from '../controllers/todo.controller';

export class TodoRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.post('/', todoController.createTodo);
        this.router.get('/', todoController.getAllTodo);
        this.router.get('/:id', todoController.getTodoById);
        this.router.put('/:id', todoController.updateTodo);
        this.router.delete('/:id', todoController.deleteTodo);
    }
}

export default new TodoRouter().router;
