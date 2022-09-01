import { SaveLinkAccount } from "../models/account.model";
import RootService from "./root.service"
import config from './../config';

const { mono: { apiKey, secretKey } } = config;

class AccountService extends RootService {
  constructor() {
    super();
    this.baseURL = 'https://api.withmono.com'
    this.apiKey = `${apiKey}`
    this.secretKey = `${secretKey}`
  }

  async getAccountId(code: string) {
    const { id } = await this.post('/account/auth', { code });
    return id;
  }

  async saveLinkedAccount({ code, accountId, userId, hasLinkedAccount }: SaveLinkAccount) {
    const { account } = await this.getAccountDetails(accountId);

    if (!hasLinkedAccount) {
      await this.db.users.findOneAndUpdate({ _id: userId }, { hasLinkedAccount: !hasLinkedAccount, defaultAccountId: accountId });
    }

    return this.db.accounts.create({
      userId,
      code,
      accountId,
      name: account.name,
      currency: account.currency,
      accountNumber: account.accountNumber,
      balance: account.balance,
      bankName: account.institution.name,
      bankCode: account.institution.bankCode,
      isDefault: hasLinkedAccount ? false : true,
    });
  }

  async getAccountDetails(accountId: string) {
    return this.get(`/accounts/${accountId}`);
  }

  async getAccountsOverview(userId: string) {
    const list = await this.getAccountList(userId);
    const totalBalance = list.reduce((acc, { balance }) => acc + balance, 0);
    const transactions = await this.getAccountTransactions(list[0].accountId);
    return { totalBalance, transactions: transactions.data.slice(0, 5)}
  }

  async getAccountList(userId: string) {
    return this.db.accounts.find({ userId });
  }

  async getAccountTransactions(accountId: string) {
    return this.get(`/accounts/${accountId}/transactions`);
  }

  async unLinkAccount(accountId: string, userId: string) {
    await this.db.accounts.findOneAndDelete({ accountId });
    return this.getAccountList(userId)
  }
}

export default AccountService;


// accounts/link
// accounts/list
// accounts/{id}
// accounts/{id}/transactions
// accounts/{id}/unlink