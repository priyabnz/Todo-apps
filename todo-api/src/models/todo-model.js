import mongoose, { Types } from 'mongoose';
import { config } from '../config.js';

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ['pending', 'done'],
            default: 'pending',
        },

        description: {
            type: String
        },

        user: {
            type: Types.ObjectId,
            ref: "users",
        },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

export const TodoModel = mongoose.model(config.db.todoCollection, todoSchema);
