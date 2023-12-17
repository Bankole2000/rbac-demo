import { Router } from "express";
import { getScope } from "../middleware/settings";
import accountRouter from "./accounts.routes";
import authRouter from "./auth.routes";
import settingsRouter from "./settings.routes";
import userRouter from "./user.routes";

const apiRouter = Router();

apiRouter.use('/v1/settings', getScope({scope: 'SETTINGS'}), settingsRouter);
apiRouter.use('/v1/user', getScope({scope: 'USER'}), userRouter);
apiRouter.use('/v1/auth', getScope({scope: 'AUTH'}), authRouter);
apiRouter.use('/v1/accounts', getScope({scope: 'ACCOUNTS'}), accountRouter);

export default apiRouter