import { BaseException } from '../../../src/common/exceptions/base.exception';
import {
  GroupCategory,
  GroupCategoryType,
} from '../../../src/domains/group/group-category.type';

describe('GroupCategoryType', () => {
  test('정상적인 그룹 카테고리일 경우', () => {
    //given
    const groupCategoryType = 'FOUR_ORGANIZATION';

    //when
    const groupCategory = GroupCategoryType.of(groupCategoryType);

    //then
    expect(groupCategory).toEqual(GroupCategory.FOUR_ORGANIZATION);
  });
  test('잘못된 그룹 카테고리일 경우', () => {
    const groupCategoryType = 'WROGN';

    try {
      GroupCategoryType.of(groupCategoryType);
    } catch (error) {
      expect(error).toBeInstanceOf(BaseException);
      expect(error.httpCode).toEqual(400);
      expect(error.name).toEqual('VALIDATION_EXCEPTION');
    }
  });
});
