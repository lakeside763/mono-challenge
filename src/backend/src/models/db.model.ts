import { Model } from 'mongoose';
import User, { IUser } from "./auth.model";

export interface DB {
  users: Model<IUser>
}

const dbModels = () => {
  return {
    users: User,
  }
}
export default dbModels;
