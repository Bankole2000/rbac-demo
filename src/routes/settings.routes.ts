import { Router } from "express";
import { defaultHandler } from "../controllers/default.controllers";

const settingsRouter = Router();

settingsRouter.use('/', defaultHandler)

export default settingsRouter