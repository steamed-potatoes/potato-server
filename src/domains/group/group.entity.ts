import { Column, Entity, OneToMany } from 'typeorm';
import { CoreEntity } from '../core.entity';
import { GroupMemberMapper } from './group-member-mapper.entity';
import { GroupCategory, GroupCategoryType } from './group-category.type';

@Entity()
export class Group extends CoreEntity {
  @Column()
  private name: string;

  @Column({ nullable: true })
  private description: string;

  @Column()
  private membersCount: number;

  @Column()
  private category: GroupCategory;

  @Column({ nullable: true })
  private profileUrl: string;

  @OneToMany(
    (type) => GroupMemberMapper,
    (groupMemberMapper) => groupMemberMapper.group,
    {
      cascade: true,
    }
  )
  groupMemberMappers: GroupMemberMapper[];

  constructor(
    name: string,
    description: string,
    category: GroupCategory,
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
    groupCategoryType: string,
    profileUrl: string
  ) {
    return new Group(
      name,
      description,
      GroupCategoryType.of(groupCategoryType),
      profileUrl
    );
  }

  public addAdmin(memberId: number): void {
    if (this.groupMemberMappers) {
      this.groupMemberMappers.push(GroupMemberMapper.newAdmin(this, memberId));
    } else {
      this.groupMemberMappers = [GroupMemberMapper.newAdmin(this, memberId)];
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

  public getCategory(): GroupCategory {
    return this.category;
  }

  public getProfileUrl(): string {
    return this.profileUrl;
  }
}
