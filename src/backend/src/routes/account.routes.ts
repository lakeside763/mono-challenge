import { Router, Request, Response, NextFunction } from 'express';
import { SaveLinkAccount } from '../models/account.model';
import { requireAuth } from '../middlewares';
import { Services } from '../models/services.model';
import { errorResponse } from '../utils/utils';

function accountRoutes(router: Router, services: Services) {
  router.get('/accounts/list', requireAuth, async(req: Request,  res: Response, next: NextFunction) => {
    try {
      const accounts = await services.account.getAccountList(req.auth.user._id);
      return res.status(200).json(accounts);
    } catch (error) {
      errorResponse(error, res, next);
    }
  });

  router.get('/accounts/overview', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const defaultAccount = await services.account.getAccountsOverview(req.auth.user._id);
      return res.status(200).json(defaultAccount);
    } catch (error) {
      errorResponse(error, res, next);
    }
  })

  router.get('/accounts/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const account = await services.account.getAccountDetails(req.params.id);
      return res.status(200).json(account);
    } catch (error) {
      errorResponse(error, res, next);
    }
  });

  router.get('/accounts/:id/transactions', requireAuth, async(req: Request, res: Response, next: NextFunction) => {
    try {
      const transactions = await services.account.getAccountTransactions(req.params.id);
      return res.status(200).json(transactions);
    } catch (error) {
      errorResponse(error, res, next);
    }
  });

  router.post('/accounts/save', requireAuth, async(req: Request, res: Response, next: NextFunction) => {
    try {
      const data: SaveLinkAccount = req.body;
      const { _id: userId, hasLinkedAccount } = req.auth.user;
      const account = await services.account.saveLinkedAccount({ ...data, userId, hasLinkedAccount });
      return res.status(200).json(account);
    } catch (error) {
      errorResponse(error, res, next);
    }
  });

  router.post('/accounts/:id/unlink', requireAuth, async(req: Request, res: Response, next: NextFunction) => {
    try {
      const unlink = await services.account.unLinkAccount(req.params.id);
      return res.status(200).json(unlink);
    } catch (error) {
      errorResponse(error, res, next);
    }
  });
}

export default accountRoutes;