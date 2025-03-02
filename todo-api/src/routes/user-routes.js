import { Router } from 'express';
import { UserController } from '../controllers/user-controller.js';
import { UserService } from '../services/user-service.js';

export const userRouter = Router();

const userService = new UserService();
const userController = new UserController(userService);

userRouter.post(
    '/register',
    userController.registerUser,
);
userRouter.post(
    '/login',
    userController.loginUser,
);

