import { Response, NextFunction } from "express";

export const errorResponse = (error: any, res: Response, next: NextFunction) => {
  if (error.name) {
    return res.status(400).json({ errors: [{ message: error.message }]});
  }
  next(error);
}