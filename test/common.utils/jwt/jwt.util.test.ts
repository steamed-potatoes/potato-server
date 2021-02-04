import { JwtTokenUtils } from '../../../src/common/utils/jwt/jwt.utils';
import { BaseException } from '../../../src/common/exceptions/base.exception';

describe('JwtTokenUtilsTest', () => {
  describe('encodeToken()', () => {
    test('새로운 토큰을 발급한다', () => {
      // when
      const token = JwtTokenUtils.encodeToken(100);

      // then
      expect(token.startsWith('ey')).toBeTruthy();
    });
  });

  describe('decodeToekn()', () => {
    test('토큰에서 userId를 가져온다', () => {
      // given
      const memberId = 100;
      const token = JwtTokenUtils.encodeToken(memberId);

      // when
      const result = JwtTokenUtils.decodeToken(token);

      // then
      expect(result).toEqual(memberId);
    });

    test('잘못된 토큰의 경우 토큰 만료 에러가 발생한다', () => {
      // when & then
      try {
        JwtTokenUtils.decodeToken('Wrong Token');
      } catch (e) {
        expect(e).toBeInstanceOf(BaseException);
        expect(e.httpCode).toEqual(401);
      }
    });
  });
});
