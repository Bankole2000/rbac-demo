import { Router } from "express";
import { emailLoginHandler, emailRegisterHandler, logoutHandler, phoneLoginHandler, phoneRegisterHandler } from "../controllers/auth.controllers";
import { defaultHandler } from "../controllers/default.controllers";
import { checkFeatureFlag } from "../middleware/settings";
import { validate } from "../middleware/validate";
import { registerSchema } from "../utils/validators/auth.schema";

const authRouter = Router();

authRouter.get('/me', defaultHandler);
authRouter.post('/login/email', checkFeatureFlag({feature: 'LOGIN', flag: 'EMAIL'}), emailLoginHandler);
authRouter.post('/login/phone', checkFeatureFlag({feature: 'LOGIN', flag: 'PHONE'}), phoneLoginHandler);
authRouter.post('/register/email', checkFeatureFlag({feature: 'REGISTER', flag: 'EMAIL'}), validate(registerSchema, 'Register'), emailRegisterHandler);
authRouter.post('/register/phone', checkFeatureFlag({feature: 'REGISTER', flag: 'PHONE'}), phoneRegisterHandler);
authRouter.get('/logout', checkFeatureFlag({feature: 'LOGIN', flag: 'LOGOUT'}), logoutHandler);

export default authRouter