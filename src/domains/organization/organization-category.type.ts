import { ValidationException } from '@src/common/exceptions/custom.exceptions';

export enum OrganizationCategory {
  //인준, 비인준, 4대기관  -- 이름좀
  APPROVE_GROUP = '인준동아리',
  NON_APPROVE_GROUP = '비인준동아리',
  FOUR_ORGANIZATION = '4대기관',
}

export class OrganizationCategoryType {
  public static of(type: string): OrganizationCategory {
    this.validateType(type);
    return OrganizationCategory[type];
  }

  private static validateType = (type: string) => {
    if (!(type in OrganizationCategory)) {
      throw new ValidationException(`잘못된 그룹 카테고리(${type})입니다.`);
    }
  };
}
