import { NextFunction, Request, Response } from 'express';
import { services } from '../server';
import { AuthenticationError } from '../utils/errors/authentication-error';

const requireAuth = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const auth = await services.token.getAuth({ req, next });
    req.auth = auth;
    if (!auth) {
      throw new AuthenticationError('Authorization is required');
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default requireAuth;
