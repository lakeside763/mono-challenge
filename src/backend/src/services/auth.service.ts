import { Login, Signup } from "../models/auth.model";
import { hash, compare } from 'bcryptjs';
import RootService from "./root.service";
import { AuthenticationError } from "../utils/errors/authentication-error";

class AuthService extends RootService {
  async signup({ password: userPassword, ...rest }: Signup) {
    const password = await hash(userPassword, 10);

    return this.db.users.create({
      password,
      ...rest,
    });
   }

   async login({ email, password }: Login) {
    const user = await this.db.users.findOne({ email });
    if (!user) throw new AuthenticationError('Invalid email was provided');

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new AuthenticationError('Invalid password was provided');

    return user;
   }
}
export default AuthService