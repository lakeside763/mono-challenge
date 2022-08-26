import { NextFunction, Request, Response, Router } from 'express';
import { errorResponse } from '../utils/utils';
import { Services } from '../models/services.model';


function authRoutes(router: Router, services: Services) {
  router.post('/auth/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const signup = await services.auth.signup(req.body);
      return res.status(200).json(signup);
    } catch (error) {
      errorResponse(error, res, next);
    }
  })
}

export default authRoutes;