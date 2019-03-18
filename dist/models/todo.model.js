"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const { Schema } = mongoose;
const env = require('../../config/environment');
exports.TodoSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Todo', exports.TodoSchema);
//# sourceMappingURL=todo.model.js.map