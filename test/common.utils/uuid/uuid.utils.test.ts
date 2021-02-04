import { UuidUtils } from '../../../src/common/utils/uuid/uuid.utils';

describe('UuidUtilsTest', () => {
  describe('newInstance()', () => {
    test('새로운 uuid를 만든다', () => {
      // given
      const result = UuidUtils.newInstance();

      // then
      expect(result.length).toEqual(39);
      expect(result.startsWith('v1')).toBeTruthy();
    });
  });
});
