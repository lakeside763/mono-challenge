import compression from 'compression';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Redis from 'ioredis';
import helmet from 'helmet';
import winston from 'winston';
import cors from 'cors';
import http, { Server } from 'http';
import config from './config';
import { authRoutes } from './routes';
import { AuthService, TokenService, AccountService } from './services';
import { errorHandler } from './middlewares';
import accountRoutes from './routes/account.routes';

export const { port,redis, mongoDB, jwt } = config;
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

// database connection
(async () => {
  await mongoose.connect(mongoDB);
  logger.info('connect to mongoDB');
})();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(helmet());
app.use(cors(corsOptions));



router.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ version: '1.0.0', port });
});


// Services
export const services = {
  token: new TokenService(jwt, cache),
  auth: new AuthService(),
  account: new AccountService(),
}


// Routes
authRoutes(router, services);
accountRoutes(router, services);

// error handler middleware
app.use(errorHandler);

export const shutdown = async(connection: Server) => {
  logger.info('Received kill signal shutting down gracefully');
  connection.close();
  mongoose.disconnect();
  return process.exit();
}




