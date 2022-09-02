import { NextFunction, Request, Response, Router } from 'express';
import { errorResponse } from '../utils/utils';
import { Services } from '../models/services.model';


function authRoutes(router: Router, services: Services) {
  router.post('/auth/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _doc: { password, ...rest } }: any = await services.auth.signup(req.body);
      return res.status(200).json({ ...rest });
    } catch (error) {
      errorResponse(error, res, next);
    }
  });

  router.post('/auth/login', async(req: Request, res: Response, next: NextFunction) => {
    try {
      const user: any = await services.auth.login(req.body);
      const token: any = await services.token.set({ user });
      const { _doc: { password, ...rest } }: any  = user;
      return res.status(200).json({ user: { ...rest }, token });
    } catch (error) {
      errorResponse(error, res, next)
    }
  });

  router.post('/auth/logout', async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = await services.token.getAuth({ req, next });
      await services.token.delete({ token });
      return res.status(200).json({ message: 'User logout successfully' });
    } catch (error) {
      return next(error);
    }
  });
}

export default authRoutes;