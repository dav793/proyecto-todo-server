import { Document, Model, model, Schema, Types} from 'mongoose';
import { ITodo } from '../interfaces/todo.interface';

export interface ITodoModel extends ITodo, Document {
    _id: Types.ObjectId;
}

export let TodoSchema: Schema = new Schema({
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
    },
);

export const Todo: Model<ITodoModel> = model<ITodoModel>('Todo', TodoSchema);
