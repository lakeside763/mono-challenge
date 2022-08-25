import express, { Request, Response } from 'express';
import http from 'http';
import appRoutes from './routes/app.routes';

export const port = 8080;
export const app = express();
export const server = http.createServer(app);
export const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ version: '1.0.0' });
});

// Routes
appRoutes(router);




