import { AccountService, AuthService, TokenService } from "../services";

export interface Services {
  auth:  AuthService;
  token: TokenService;
  account: AccountService
}