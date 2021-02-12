import { GroupMemberMapper } from '@src/domains/group/group-member-mapper.entity';
import { Group } from '@src/domains/group/group.entity';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { CreateGroupRequest } from './dto/group.request.dto';
import { CreateGroupResponse } from './dto/group.response.dto';
import { GroupServiceUtils } from './group.service.utils';

@Service()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(GroupMemberMapper)
    private readonly groupMemberMapperRepository: Repository<GroupMemberMapper>
  ) {}

  public async createGroup(request: CreateGroupRequest, memberId: number) {
    await GroupServiceUtils.findGroupName(
      this.groupRepository,
      request.getName()
    );
    const newGroup = await this.groupRepository.save(request.toGroupEntity());
    return newGroup;
  }

  public async createGroupMemberMapper(
    request: CreateGroupRequest,
    newGroup: Group,
    memberId: number
  ) {
    const newGroupMemberMapper = await this.groupMemberMapperRepository.save(
      request.toGroupMemberMapperEntity(memberId, newGroup.getId())
    );
    return newGroupMemberMapper;
  }
}
