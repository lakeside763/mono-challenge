import { SaveLinkAccount } from "../models/account.model";
import RootService from "./root.service"

class AccountService extends RootService {
  constructor() {
    super();
    this.baseURL = 'https://api.withmono.com'
    this.apiKey = 'mono-sec-key'
    this.secretKey = 'test_sk_dJXIBwlcoA7Mx0uCaTc5'
  }

  async getAccountId(code: string) {
    const { id } = await this.post('/account/auth', { code });
    return id;
  }

  async saveLinkedAccount({ code, accountId, userId, hasLinkedAccount }: SaveLinkAccount) {
    const { account } = await this.getAccountDetails(accountId);

    if (!hasLinkedAccount) {
      await this.db.users.findOneAndUpdate({ _id: userId }, { hasLinkedAccount: !hasLinkedAccount });
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

  async getDefaultAccount(userId: string) {
    const response = await this.db.accounts.where('userId').equals(userId)
                                            .where('isDefault').equals(true);
    if (response) {
      const { account } = await this.getAccountDetails(response[0].accountId);
      return account;
    }
  }

  async getAccountList(userId: string) {
    return this.db.accounts.find({ userId });
  }

  async getAccountTransactions(accountId: string) {
    return this.get(`/accounts/${accountId}/transactions`);
  }

  async unLinkAccount(accountId: string) {
    await this.post(`/accounts/${accountId}/unlink`, {});
    return { message: `account with ID ${accountId} unlinked successfully`}
  }
}

export default AccountService;


// accounts/link
// accounts/list
// accounts/{id}
// accounts/{id}/transactions
// accounts/{id}/unlink