import { Router } from 'express';
import userController from '../controllers/user.controller';

export class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.post('/login', userController.login);
        this.router.post('/register', userController.register);
        this.router.post('/', userController.createUser);
        this.router.get('/', userController.getUsers);
        this.router.get('/:id', userController.getUserById);
        this.router.put('/:id', userController.updateUser);
        this.router.delete('/:id', userController.deleteUser);
    }
}

export default new UserRouter().router;
