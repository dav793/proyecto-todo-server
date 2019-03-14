import { Router } from 'express';

export class IndexRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.get('/', (req, res) => {
            res.send('Hello World');
        });
    }
}

export default new IndexRouter().router;
