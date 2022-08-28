import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utils/errors/custom-error';

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  return true;
};

export default errorHandler;
