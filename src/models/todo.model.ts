import { ITodo } from '../interfaces/todo.interface';
import { Types } from "mongoose";

const mongoose = require('mongoose');
const { Schema } = mongoose;

const env = require('../../config/environment');

export interface ITodoModel extends Document {
    _id: Types.ObjectId;
}

export let TodoSchema = new Schema({
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
    }
);

module.exports = mongoose.model('Todo', TodoSchema);