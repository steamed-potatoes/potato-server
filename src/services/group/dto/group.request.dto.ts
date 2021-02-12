import { Group } from '@src/domains/group/group.entity';
import { IsString } from 'class-validator';

export class CreateGroupRequest {
  @IsString({ message: '그룹이름을 다시 확인해주세요' })
  private readonly name: string;

  @IsString({ message: '그룹설명을 다시 확인해주세요' })
  private readonly description: string;

  @IsString({ message: '그룹 카테고리를 다시 확인해주세요' })
  private readonly groupCategoryType: string;

  @IsString({ message: '프로필을 다시 확인해주세요' })
  private readonly profileUrl: string;

  constructor(
    name: string,
    description: string,
    groupCategoryType: string,
    profileUrl: string
  ) {
    this.name = name;
    this.description = description;
    this.groupCategoryType = groupCategoryType;
    this.profileUrl = profileUrl;
  }

  public toGroupEntity() {
    return Group.of(
      this.name,
      this.description,
      this.groupCategoryType,
      this.profileUrl
    );
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getGroupCategoryType(): string {
    return this.groupCategoryType;
  }

  public getProfileUrl(): string {
    return this.profileUrl;
  }
}
