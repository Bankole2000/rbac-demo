import { Router } from "express";
import { defaultHandler } from "../controllers/default.controllers";
import { createNewAccountHandler, deleteAccountHandler, getBeneficiariesHandler, getUserAccountsHandler, getUserTransactionsHandler, removeBeneficiariesHandler } from "../controllers/user.controllers";
import { checkFeatureFlag } from "../middleware/settings";
import { loadAccount } from "../controllers/account.controllers";

const userRouter = Router({mergeParams: true});

userRouter.get('/accounts', checkFeatureFlag({feature: 'USER', flag: 'EMAIL'}), getUserAccountsHandler);
userRouter.post('/accounts', checkFeatureFlag({feature: 'LOGIN', flag: 'EMAIL'}), createNewAccountHandler);
userRouter.delete('/accounts/:accountId', checkFeatureFlag({feature: 'LOGIN', flag: 'EMAIL'}), deleteAccountHandler);
userRouter.get('/transactions', checkFeatureFlag({feature: 'LOGIN', flag: 'EMAIL'}), getUserTransactionsHandler);
userRouter.get('/beneficiaries', checkFeatureFlag({feature: 'LOGIN', flag: 'EMAIL'}), getBeneficiariesHandler);
userRouter.delete('/beneficiary/:accountId', checkFeatureFlag({feature: 'LOGIN', flag: 'EMAIL'}), removeBeneficiariesHandler);

userRouter.param('accountId', loadAccount);

export default userRouter