import { Group } from '@src/domains/meet/group.entity';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { CreateGroupRequest } from './dto/group.request.dto';
import { GroupInfoResponse } from './dto/group.response.dto';
import { GroupServiceUtils } from './group.service.utils';

@Service()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>
  ) {}

  public async createGroup(
    request: CreateGroupRequest,
    memberId: number
  ): Promise<GroupInfoResponse> {
    await GroupServiceUtils.validateNonExistGroup(
      this.groupRepository,
      request.getName()
    );
    const newGroup = request.toGroupEntity();
    newGroup.addAdmin(memberId);
    await this.groupRepository.save(newGroup);
    return GroupInfoResponse.of(newGroup);
  }
}
