import cors from 'cors';
import express from 'express';
import { config } from './config.js';
import { errorMiddleware } from './middleware/error-middleware.js';
import {todoRouter} from './routes/todo-routes.js';
import { userRouter } from './routes/user-routes.js';
import { connectDb } from './utils/db.js';
import ServerlessHttp from 'serverless-http';


const app = express();

app.use(express.json());
app.use(cors());

app.use('/todos', todoRouter);
app.use('/users', userRouter);


app.use(errorMiddleware);

connectDb();

if (process.env.ENV === "local") {
    app.listen(config.port, () => {
        console.log(`Server is running on port ${config.port}`);
    });
}

export const handler = ServerlessHttp(app, { provider: "aws" })