import { Router } from 'express';
const userController = require('../controllers/user.controller');

export class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.get('/', userController.getUsers);
        this.router.get('/:id', userController.getUserById);
        //this.router.put('/:id', userController.updateUser);
        //this.router.delete('/:id', userController.deleteUser);
    }
}

export default new UserRouter().router;
