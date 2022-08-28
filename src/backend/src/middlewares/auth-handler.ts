import { NextFunction, Response, Request } from "express";
import { services } from "../server";

const authHandler = async (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = await services.token.checkAuthorizationHeader({ req });
  if (authorizationHeader) {
    try {
      const auth = await services.token.getAuth({ req });
      req.auth = auth;
    } catch (error: any) {
      return res.status(401).json({ errors: [{ message: error.message }] });
    }
  }
  next();
}

export default authHandler;