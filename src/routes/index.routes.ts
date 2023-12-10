import { Router } from "express";
import accountRouter from "./accounts.routes";
import authRouter from "./auth.routes";
import settingsRouter from "./settings.routes";
import userRouter from "./user.routes";

const apiRouter = Router();

apiRouter.use('/v1/settings', settingsRouter);
apiRouter.use('/v1/user', userRouter);
apiRouter.use('/v1/auth', authRouter);
apiRouter.use('/v1/accounts', accountRouter);

export default apiRouter