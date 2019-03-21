"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.TodoSchema = new mongoose_1.Schema({
    body: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Todo = mongoose_1.model('Todo', exports.TodoSchema);
//# sourceMappingURL=todo.model.js.map