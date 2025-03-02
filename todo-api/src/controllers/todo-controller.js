
export class TodoController {

    constructor(todoService) {
        this.todoService = todoService;
        this.createTodo = this.createTodo.bind(this);
    }

    async createTodo(req, res, next) {
        try {
            const todo = await this.todoService.createTodo(req.body, req.currentUser);
            return res.status(201).json(todo);
        } catch (error) {
            next(error);
        }
    }

    getAllTodos = async (req, res, next) => {
        try {
            const todos = await this.todoService.getAllTodos(
                req.query,
                req.currentUser,
            );

            return res.json(todos);
        } catch (error) {
            next(error);
        }
    }

    getTodoById = async (req, res, next) => {
        try {
            const todo = await this.todoService.getTodoById(req.params.id);
            if (!todo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            return res.json(todo);
        } catch (error) {
            next(error);
        }
    }

    updateTodoById = async (req, res, next) => {
        try {
            const updatedTodo = await this.todoService.updateTodoById(
                req.params.id, req.currentUser?.id, req.body
            );
            if (!updatedTodo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            return res.status(200).json(updatedTodo);
        } catch (error) {
            next(error);
        }
    }

    deleteTodoById = async (req, res, next) => {
        try {
            await this.todoService.deleteTodoById(req.params.id, req.currentUser?.id);
            return res.status(200).json();
        } catch (error) {
            next(error);
        }
    }
}
