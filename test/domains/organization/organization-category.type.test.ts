import { BaseException } from '../../../src/common/exceptions/base.exception';
import {
  OrganizationCategory,
  OrganizationCategoryType,
} from '../../../src/domains/organization/organization-category.type';

describe('OrganizationCategoryType', () => {
  test('정상적인 그룹 카테고리일 경우', () => {
    //given
    const categoryType = 'FOUR_ORGANIZATION';

    //when
    const category = OrganizationCategoryType.of(categoryType);

    //then
    expect(category).toEqual(OrganizationCategory.FOUR_ORGANIZATION);
  });
  test('잘못된 그룹 카테고리일 경우', () => {
    const categoryType = 'WROGN';

    try {
      OrganizationCategoryType.of(categoryType);
    } catch (error) {
      expect(error).toBeInstanceOf(BaseException);
      expect(error.httpCode).toEqual(400);
      expect(error.name).toEqual('VALIDATION_EXCEPTION');
    }
  });
});
