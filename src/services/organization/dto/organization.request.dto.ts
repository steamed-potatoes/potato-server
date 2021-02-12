import { Organization } from '@src/domains/organization/organization.entity';
import { IsString } from 'class-validator';

export class CreateOrganizationRequest {
  @IsString({ message: '그룹 이름을 다시 확인해주세요' })
  private readonly name: string;

  @IsString({ message: '그룹 설명을 다시 확인해주세요' })
  private readonly description: string;

  @IsString({ message: '그룹 카테고리를 다시 확인해주세요' })
  private readonly category: string;

  @IsString({ message: '프로필을 다시 확인해주세요' })
  private readonly profileUrl: string;

  constructor(
    name: string,
    description: string,
    category: string,
    profileUrl: string
  ) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.profileUrl = profileUrl;
  }

  public toEntity() {
    return Organization.of(
      this.name,
      this.description,
      this.category,
      this.profileUrl
    );
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getCategory(): string {
    return this.category;
  }

  public getProfileUrl(): string {
    return this.profileUrl;
  }
}
