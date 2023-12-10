import { Router } from "express";
import { defaultHandler } from "../controllers/default.controllers";

const userRouter = Router();

userRouter.use('/', defaultHandler);

export default userRouter