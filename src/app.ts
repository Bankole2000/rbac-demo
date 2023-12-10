import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { routeNotFoundHandler } from './controllers/default.controllers';
import apiRouter from './routes/index.routes';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api', apiRouter);

app.use('*', routeNotFoundHandler);

export { app };