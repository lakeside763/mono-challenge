import { AuthService, TokenService } from "../services";

export interface Services {
  auth:  AuthService;
  token: TokenService;
}