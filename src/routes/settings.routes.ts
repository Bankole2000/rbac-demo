import { Router } from "express";
import { defaultHandler } from "../controllers/default.controllers";
import { getAppSettingsHandler, getBanksHandler, getUserRolesHandler } from "../controllers/system.controllers";
import { checkFeatureFlag } from "../middleware/settings";

const settingsRouter = Router();

settingsRouter.get('/banks', checkFeatureFlag({feature: 'LOGIN', flag: 'EMAIL'}), getBanksHandler);
settingsRouter.get('/roles', checkFeatureFlag({feature: 'LOGIN', flag: 'EMAIL'}), getUserRolesHandler);
settingsRouter.get('/settings', checkFeatureFlag({feature: 'LOGIN', flag: 'EMAIL'}), getAppSettingsHandler);

export default settingsRouter