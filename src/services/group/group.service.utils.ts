import { ConflictException } from '@src/common/exceptions/custom.exceptions';
import { Group } from '@src/domains/group/group.entity';
import { Repository } from 'typeorm';

export class GroupServiceUtils {
  public static async validateNonExistGroup(
    groupRepository: Repository<Group>,
    name: string
  ) {
    const group = await groupRepository.findOne({
      where: { name: name },
    });
    if (group) {
      throw new ConflictException('이미 존재하는 이름입니다.');
    }
  }
}
