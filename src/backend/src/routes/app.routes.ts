import { Router, Request, Response } from "express";

function appRoutes(router: Router) {
  router.get('/app/index', (_req: Request, res: Response) => {
    return res.status(200).json({ app: 'my application index'})
  })
}

export default appRoutes