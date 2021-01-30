import jwt from 'jsonwebtoken';
import { UnauthorizedException } from '@src/common/exceptions/custom.exceptions';
import config from '@src/config';

interface UserToken {
  memberId: number;
  iat: number;
  exp: number;
  iss: string;
}

export default class JwtTokenUtils {
  public static encodeToken(memberId: number): string {
    return jwt.sign(
      {
        memberId: memberId,
      },
      config.jwt.secretKey,
      {
        expiresIn: config.jwt.expiresIn,
        issuer: config.jwt.issuer,
      }
    );
  }

  public static decodeToken(token: string) {
    try {
      const payload = jwt.verify(token, config.jwt.secretKey);
      return (payload as UserToken).memberId;
    } catch (err) {
      throw new UnauthorizedException(
        '토큰이 만료되었습니다. 다시 로그인 해 주세요.'
      );
    }
  }
}
