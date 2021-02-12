import {
  GroupMemberMapper,
  Role,
} from '@src/domains/group/group-member-mapper.entity';
import { Group } from '@src/domains/group/group.entity';
import { IsString } from 'class-validator';

export class CreateGroupRequest {
  @IsString({ message: '그룹이름을 다시 확인해주세요' })
  private name: string;

  @IsString({ message: '그룹설명을 다시 확인해주세요' })
  private description: string;

  @IsString({ message: '그룹 카테고리를 다시 확인해주세요' })
  private groupCategoryType: string;

  @IsString({ message: '프로필을 다시 확인해주세요' })
  private profileUrl: string;

  @IsString({ message: '역할을 다시 생각해주세요' })
  private roleType: string;

  constructor(
    name: string,
    description: string,
    groupCategoryType: string,
    profileUrl: string,
    roleType: string
  ) {
    this.name = name;
    this.description = description;
    this.groupCategoryType = groupCategoryType;
    this.profileUrl = profileUrl;
    this.roleType = roleType;
  }

  public toGroupEntity() {
    return Group.of(
      this.name,
      this.description,
      this.groupCategoryType,
      this.profileUrl
    );
  }

  public toGroupMemberMapperEntity(memberId: number, group: number) {
    return GroupMemberMapper.of(this.roleType, memberId, group);
  }

  public getName() {
    return this.name;
  }

  public getDescription() {
    return this.description;
  }

  public getGroupCategoryType() {
    return this.groupCategoryType;
  }

  public getProfileUrl() {
    return this.profileUrl;
  }
}
