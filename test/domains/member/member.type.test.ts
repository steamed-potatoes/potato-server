import { BaseException } from '../../../src/common/exceptions/base.exception';
import { Major, MajorType } from '../../../src/domains/member/major.type';
import {
  GroupCategory,
  GroupCategoryType,
} from '../../../src/domains/group/group-category.type';

describe('MemberType', () => {
  test('잘못된 학과 코드인 경우 400 에러 발생', () => {
    // given
    const majorCode = 'WRONG';

    // when & then
    try {
      MajorType.of(majorCode);
    } catch (error) {
      expect(error).toBeInstanceOf(BaseException);
      expect(error.httpCode).toEqual(400);
      expect(error.name).toEqual('VALIDATION_EXCEPTION');
    }
  });
  test('정상적인 학과 코드일 경우', () => {
    // given
    const majorCode = 'IT_ICT';

    // when
    const major = MajorType.of(majorCode);

    // then
    expect(major).toEqual(Major.IT_ICT);
  });
});

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
