import { Organization } from '@src/domains/organization/organization.entity';

export class OrganizationInfoResponse {
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

  public static of(organization: Organization) {
    return new OrganizationInfoResponse(
      organization.getId(),
      organization.getName(),
      organization.getDescription(),
      organization.getProfileUrl(),
      organization.getMemberCount()
    );
  }
}
