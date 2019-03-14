"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class IndexRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get('/', (req, res) => {
            res.send('Hello World');
        });
    }
}
exports.IndexRouter = IndexRouter;
exports.default = new IndexRouter().router;
//# sourceMappingURL=index.router.js.map