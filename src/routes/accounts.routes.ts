import { Router } from "express";
import { accountDepositHandler, accountWithdrawalHandler, findUserAccountHandler, getAccountDetailsHandler, getAccountTransactionsHandler, transferHandler } from "../controllers/account.controllers";
import { defaultHandler } from "../controllers/default.controllers";
import { checkFeatureFlag } from "../middleware/settings";

const accountRouter = Router({ mergeParams: true});

accountRouter.get('/find', checkFeatureFlag({feature: 'ACCOUNT', flag: 'SEARCH_ACCOUNTS'}), findUserAccountHandler);
accountRouter.get('/:accountId', checkFeatureFlag({feature: 'ACCOUNT', flag: 'VIEW_ACCOUNT_DETAILS'}), getAccountDetailsHandler);
accountRouter.get('/:accountId/transactions', checkFeatureFlag({feature: 'ACCOUNT', flag: 'VIEW_TRANSACTIONS'}), getAccountTransactionsHandler);
accountRouter.post('/:accountId/deposit', checkFeatureFlag({feature: 'ACCOUNT', flag: 'DEPOSIT'}), accountDepositHandler);
accountRouter.post('/:accountId/withdraw', checkFeatureFlag({feature: 'ACCOUNT', flag: 'WITHDRAW'}), accountWithdrawalHandler);
accountRouter.post('/:accountId/transfer', checkFeatureFlag({feature: 'ACCOUNT', flag: 'TRANSFER'}), transferHandler)

export default accountRouter