import { Group } from '@src/domains/meet/group.entity';

export class GroupInfoResponse {
  private readonly id: number;
  private readonly name: string;
  private readonly description: string;
  private readonly profileUrl: string;
  private readonly membersCount: number;

  constructor(
    id: number,
    name: string,
    description: string,
    profileUrl: string,
    membersCount: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.profileUrl = profileUrl;
    this.membersCount = membersCount;
  }

  public static of(group: Group) {
    return new GroupInfoResponse(
      group.getId(),
      group.getName(),
      group.getDescription(),
      group.getProfileUrl(),
      group.getMemberCount()
    );
  }
}
