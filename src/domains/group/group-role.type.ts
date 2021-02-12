import { ValidationException } from '@src/common/exceptions/custom.exceptions';
import { Role } from './group-member-mapper.entity';

export class RoleType {
  public static of(type: string): Role {
    this.validateGroupCategoryType(type);
    return Role[type];
  }

  private static validateGroupCategoryType = (type: string) => {
    if (!(type in Role)) {
      throw new ValidationException(`잘못된 그룹 카테고리(${type})입니다.`);
    }
  };
}
