import { Router } from "express";
import { defaultHandler } from "../controllers/default.controllers";

const authRouter = Router();

authRouter.use('/', defaultHandler)

export default authRouter