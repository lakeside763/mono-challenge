import { Signup } from "../models/auth.model";
import { hash } from 'bcryptjs';
import AppService from "./app.service";

class AuthService extends AppService {
  async signup({ password: userPassword, ...rest}: Signup) {
    const password = await hash(userPassword, 10);

    return this.db.users.create({
      password,
      ...rest,
    });
   }
}
export default AuthService