import { NotFoundException } from '@src/common/exceptions/custom.exceptions';
import crypto from 'crypto';

export class PasswordUtils {
  public static encodePassword(password: string, salt: string): string {
    return crypto
      .createHash('sha512')
      .update(password + salt)
      .digest('hex');
  }

  public static comparePassword(
    hashPassword: string,
    salt: string,
    inputPassword: string
  ): void {
    const newHashpassword = this.encodePassword(inputPassword, salt);
    if (hashPassword !== newHashpassword) {
      throw new NotFoundException(
        '해당하는 이메일과 비밀번호를 가진 유저를 찾을 수 없습니다'
      );
    }
  }
}
