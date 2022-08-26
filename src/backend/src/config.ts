const port: number = parseInt(process.env.PORT!)
// const redisPort: number = parseInt(process.env.REDIS_PORT!);
// const redisHost: string = process.env.REDIS_HOST!
// const redisPass: string = process.env.REDIS_PASS!

const mongoDB: string = process.env.MONGO_URI!

const redis = {
  port: parseInt(process.env.REDIS_PORT!),
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASS,
}

const jwt = {
  secret: process.env.JWT_SECRET,
  audience: process.env.JWT_AUD,
  issuer: process.env.JWT_ISS,
  expiresIn: process.env.JWT_EXP,
}

export default {
  port,
  redis,
  mongoDB,
  jwt,
}