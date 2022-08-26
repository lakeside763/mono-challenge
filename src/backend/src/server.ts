import compression from 'compression';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Redis from 'ioredis';
import helmet from 'helmet';
import winston from 'winston';
import cors from 'cors';
import http, { Server } from 'http';
import config from './config';
import appRoutes from './routes/app.routes';

export const { port,redis, mongoDB } = config;
export const app = express();
export const server = http.createServer(app);
export const router = express.Router();

export const cache = new Redis(config.redis);

const corsOptions = {
  origin: ['http://localhost:3000', 'https://mono-web-app.netlify.app'],
  optionSuccessStatus: 200,
}

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { log: 'process-log' },
  transports: [new winston.transports.File({ filename: 'error.log', level: 'error' })],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({ format: winston.format.simple() }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(helmet());
app.use(cors(corsOptions));


router.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ version: '1.0.0', port });
});

// Routes
appRoutes(router);


(async () => {
  await mongoose.connect(mongoDB);
  logger.info('connect to mongoDB');
})();

export const shutdown = async(connection: Server) => {
  logger.info('Received kill signal shutting down gracefully');
  connection.close();
  mongoose.disconnect();
  return process.exit();
}




