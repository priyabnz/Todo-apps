import { Router } from 'express';
import { TodoController } from '../controllers/todo-controller.js';
import { todoService } from '../services/todo-service.js';
import { createTodoValidationSchema, updateTodoValudationSchema } from '../validations/todo-validations.js';
import { validateRequest } from '../validations/validateRequest.js';
import { objectidValidationSchema } from '../validations/objectid-validation.js';
import { authMiddleware } from '../middleware/auth-middleware.js';

const todoRouter = Router();

todoRouter.use(authMiddleware);

const todoController = new TodoController(todoService);

const objectIdValidator = validateRequest(objectidValidationSchema, "params");

todoRouter.get(
    '/',
    todoController.getAllTodos,
);

todoRouter.get(
    '/:id',
    objectIdValidator,
    todoController.getTodoById,
);

todoRouter.post(
    '/',
    validateRequest(createTodoValidationSchema),
    todoController.createTodo
);

todoRouter.put(
    '/:id',
    objectIdValidator,
    validateRequest(updateTodoValudationSchema),
    todoController.updateTodoById,
);

todoRouter.delete(
    '/:id',
    objectIdValidator,
    todoController.deleteTodoById,
);


export { todoRouter };

