const port: number = parseInt(process.env.PORT!)
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

const mono = {
  secretKey: process.env.MONO_TESK_SK_KEY,
  apiKey: process.env.MONO_API_KEY,
}

export default {
  port,
  redis,
  mongoDB,
  jwt,
  mono
}