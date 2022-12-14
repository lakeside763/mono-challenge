import mongoose, { ObjectId } from "mongoose"

export interface Login {
  email: string;
  password: string;
}

export interface Signup {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUser {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  hasLinkedAccount: boolean;
  defaultAccountId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  hasLinkedAccount: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  hasLinkedAccount: {
    type: Boolean,
    default: () => false
  },
  defaultAccountId: String,
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  },
  updatedAt: {
    type: Date,
    default: () => Date.now()
  }
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;