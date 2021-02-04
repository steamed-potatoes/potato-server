import { PasswordUtils } from '../../../src/common/utils/password/password.utils';
import { BaseException } from '../../../src/common/exceptions/base.exception';

describe('PasswordUtilsTest', () => {
  describe('encodePassword()', () => {
    test('새로운 토큰을 발급한다', () => {
      // given
      const password = 'password';

      // when
      const hashPassword = PasswordUtils.encodePassword(password, 'salt');

      // then
      expect(hashPassword).not.toEqual(password);
    });
  });

  describe('comparePassword()', () => {
    test('정상 비밀번호가 넘어올 경우 통과한다', () => {
      // given
      const password = 'password';
      const salt = 'salt';
      const hashPassword = PasswordUtils.encodePassword(password, salt);

      // when & then
      PasswordUtils.comparePassword(hashPassword, salt, password);
    });

    test('비정상 비밀번호가 넘어올 경우, 에러가 발생한다', () => {
      // given
      const password = 'password';
      const salt = 'salt';
      const hashPassword = PasswordUtils.encodePassword(password, salt);

      // when & then
      try {
        PasswordUtils.comparePassword(hashPassword, salt, 'another-password');
      } catch (error) {
        expect(error).toBeInstanceOf(BaseException);
        expect(error.httpCode).toEqual(404);
        expect(error.name).toEqual('NOT_FOUND_EXCEPTION');
      }
    });
  });
});
