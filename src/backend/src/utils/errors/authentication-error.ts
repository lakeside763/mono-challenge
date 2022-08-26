import { CustomError } from "./custom-error";

export class AuthenticationError extends CustomError {
  statusCode = 401;

  constructor(public message: string = 'Not Authorized') {
    super(message);

    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
