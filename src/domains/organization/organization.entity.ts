import { Column, Entity, OneToMany } from 'typeorm';
import { CoreEntity } from '../core.entity';
import { OrganizationMemberMapper } from './organization-member-mapper.entity';
import {
  OrganizationCategory,
  OrganizationCategoryType,
} from './organization-category.type';

@Entity()
export class Organization extends CoreEntity {
  @Column()
  private name: string;

  @Column({ nullable: true })
  private description: string;

  @Column()
  private membersCount: number;

  @Column()
  private category: OrganizationCategory;

  @Column({ nullable: true })
  private profileUrl: string;

  @OneToMany(
    (type) => OrganizationMemberMapper,
    (mapper) => mapper.organization,
    {
      cascade: true,
    }
  )
  organizationMemberMappers: OrganizationMemberMapper[];

  constructor(
    name: string,
    description: string,
    category: OrganizationCategory,
    profileUrl: string
  ) {
    super();
    this.name = name;
    this.description = description;
    this.category = category;
    this.profileUrl = profileUrl;
    this.membersCount = 0;
  }

  public static of(
    name: string,
    description: string,
    category: string,
    profileUrl: string
  ) {
    return new Organization(
      name,
      description,
      OrganizationCategoryType.of(category),
      profileUrl
    );
  }

  public addAdmin(memberId: number): void {
    if (this.organizationMemberMappers) {
      this.organizationMemberMappers.push(
        OrganizationMemberMapper.newAdmin(this, memberId)
      );
    } else {
      this.organizationMemberMappers = [
        OrganizationMemberMapper.newAdmin(this, memberId),
      ];
    }
    this.membersCount++;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getMemberCount(): number {
    return this.membersCount;
  }

  public getCategory(): OrganizationCategory {
    return this.category;
  }

  public getProfileUrl(): string {
    return this.profileUrl;
  }
}
