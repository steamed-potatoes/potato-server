import { ApiResponse } from '../dto/api.response.dto';
import { HttpError } from 'routing-controllers';

export abstract class BaseException extends HttpError {
  constructor(status: number, name: string, message: string) {
    super(status);
    Object.setPrototypeOf(this, BaseException.prototype);
    this.name = name;
    this.message = message;
  }
  toJSON() {
    return ApiResponse.error(this.httpCode, this.name, this.message, null);
  }
}
