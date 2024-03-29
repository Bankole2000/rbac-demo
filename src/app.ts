import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { routeNotFoundHandler } from './controllers/default.controllers';
import apiRouter from './routes/index.routes';
import { getAppSettings, getUserRolePermissions } from './middleware/settings';
import { getUserIfLoggedIn } from './middleware/auth';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(getAppSettings);
app.use(getUserIfLoggedIn);
app.use(getUserRolePermissions);

app.use('/api', apiRouter);

app.use('*', routeNotFoundHandler);

export { app };