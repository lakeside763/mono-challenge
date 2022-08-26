const port: number = parseInt(process.env.PORT!)
const redisPort: number = parseInt(process.env.REDIS_PORT!);
const redisHost: string = process.env.REDIS_HOST!
const redisPass: string = process.env.REDIS_PASS!

const mongoDB: string = process.env.MONGO_URI!

const redis = {
  port: redisPort,
  host: redisHost,
  password: redisPass,
}

export default {
  port,
  redis,
  mongoDB,
}