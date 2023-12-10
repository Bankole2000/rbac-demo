import { Router } from "express";
import { defaultHandler } from "../controllers/default.controllers";

const accountRouter = Router();

accountRouter.use('/', defaultHandler);

export default accountRouter