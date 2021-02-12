import {
  GroupMemberMapper,
  Role,
} from '@src/domains/group/group-member-mapper.entity';
import { Group } from '@src/domains/group/group.entity';

export class CreateGroupResponse {
  private readonly id: number;
  private readonly name: string;
  private readonly description: string;
  private readonly profileUrl: string;
  private readonly type: Role;

  constructor(
    id: number,
    name: string,
    description: string,
    profileUrl: string,
    type: Role
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.profileUrl = profileUrl;
    this.type = type;
  }

  public static of(group: Group, groupMemberMapper: GroupMemberMapper) {
    return new CreateGroupResponse(
      group.getId(),
      group.getName(),
      group.getDescription(),
      group.getProfileUrl(),
      groupMemberMapper.getType()
    );
  }
}
