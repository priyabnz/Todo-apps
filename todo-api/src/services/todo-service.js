import {  TodoModel } from '../models/todo-model.js';

export class TodoService {
    createTodo(todoData, user){
        const todo = new TodoModel({
            ...todoData,
            user: {_id: user.id}
        })
        return todo.save();
    }

    getAllTodos(params, user) {
        const page = isNaN(Number(params.page)) ? 1 : Number(params.page);
        const take = isNaN(Number(params.take)) ? 1 : Number(params.take);

        const skip = (page - 1) * take;

        return TodoModel
            .aggregate([
                // Match the documents based on the query
                {
                    $match: {
                        ...(params.status !== "all" ? { status: params.status } : {}),
                        user: user.id,
                    }
                },

                // Use the facet stage to perform two operations
                {
                    $facet: {
                        // Get the total count
                        totalCount: [
                            { $count: "count" }
                        ],
                        // Get the documents with pagination
                        notes: [
                            { $sort: { created_at: -1 } },
                            { $skip: skip },
                            { $limit: take },
                        ]
                    }
                },

                // Project to get the count as a single value
                {
                    $project: {
                        notes: 1,
                        // Extract the first element of the totalCount array
                        totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
                    }
                },
            ]);
    }

    getTodoById(id) {
        return TodoModel.findById(id);
    }

    updateTodoById(_id, user, todoData) {
        return TodoModel.findOneAndUpdate({ _id, user }, todoData, { new: true });
    }

    deleteTodoById(_id, user) {
        return TodoModel.findOneAndDelete({ _id, user });
    }
}

export const todoService = new TodoService();