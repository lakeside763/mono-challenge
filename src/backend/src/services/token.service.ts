import Redis from 'ioredis';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { AuthenticationError } from '../utils/errors/authentication-error';

class TokenService {
  secret;

  jwtOptions;

  cache;

  constructor({ secret, ...jwtOptions }: JwtPayload, cache: Redis) {
    this.cache = cache;
    this.jwtOptions = jwtOptions;
    this.secret = secret;
  }

  cacheKey(id: string) {
    return `mono-api-${process.env.NODE_ENV}-tokenchacke-${id}`;
  }

  async set({ user }: any) {
    const jwtToken = await this.sign(user);
    const decodedToken: any = await this.verify({ token: jwtToken });
    const key = `${decodedToken.jti}`;
    const ttl = decodedToken.exp - Math.floor(new Date().getTime() / 1000);
    await this.cache.set(this.cacheKey(key), JSON.stringify({ token: decodedToken, user }), 'EX', ttl);
    return jwtToken;
  }

  async sign({ _id, overrides = {} }: any) {
    const jwtid = uuidv4();
    const subject = _id.toString();
    const options = {
      ...this.jwtOptions,
      subject,
      jwtid,
      ...overrides,
    };
    const tokenBuffer = Buffer.from(this.secret, 'base64');
    return jwt.sign({}, tokenBuffer, options);
  }

  async verify({ token }: any) {
    const tokenBuffer = Buffer.from(this.secret, 'base64');
    const { audience, issuer } = this.jwtOptions;
    return jwt.verify(token, tokenBuffer, { audience, issuer });
  }

  async getFromHeaders({ req }: any) {
    if (!req.headers || !req.headers.authorization) {
      throw new AuthenticationError('No authorization header');
    }

    const parts = req.headers.authorization.split(' ');
    if (parts.length !== 2) {
      throw new AuthenticationError('Invalid authorization header');
    }

    const scheme = parts[0];
    if (!/^jwt$/i.test(scheme)) {
      throw new AuthenticationError('Invalid Authorization Scheme');
    }
    return parts[1];
  }

  async checkAuthorizationHeader({ req }: any) {
    if (!req.headers || !req.headers.authorization) {
      return false;
    }
    return true;
  }

  async getAuth({ req, next }: any) {
    try {
      const jwtToken = await this.getFromHeaders({ req });
      const token = await this.verify({ token: jwtToken });
      return this.get({ token });
    } catch (error) {
      next(error);
    }
  }

  async get({ token }: JwtPayload) {
    const auth = await this.cache.get(this.cacheKey(token.jti));
    if (!auth) {
      return null;
    }
    return JSON.parse(auth);
  }

  async delete({ token }: JwtPayload) {
    await this.cache.del(this.cacheKey(token.jti));
    return true;
  }
}

export default TokenService;
