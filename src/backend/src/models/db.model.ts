import Account from "./account.model";
import User from "./auth.model";

const dbModels = () => {
  return {
    users: User,
    accounts: Account,
  }
}
export default dbModels;
