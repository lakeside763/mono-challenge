import mongoose, { ObjectId } from 'mongoose';

export interface IAccount {
  _id: ObjectId;
  userId: string;
  code: string;
  accountId: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date
}

export interface SaveLinkAccount {
  code: string;
  accountId: string;
  userId?: string;
  hasLinkedAccount?: boolean;
}

const accountSchema = new mongoose.Schema<IAccount>({
  userId: {
    type: String
  },
  code: {
    type: String
  },
  accountId: {
    type: String
  },
  isDefault: {
    type: Boolean,
    default: () => false
  },
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

const Account = mongoose.model<IAccount>('Account', accountSchema);

export default Account