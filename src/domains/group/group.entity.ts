import { Column, Entity, OneToMany } from 'typeorm';
import { CoreEntity } from '../core.entity';
import { GroupMemberMapper } from './group-member-mapper.entity';
import { GroupCategory } from './group-category.type';

@Entity()
export class Group extends CoreEntity {
  @Column()
  private name: string;

  @Column({ nullable: true })
  private description: string;

  @Column()
  private membersCount: number;

  @Column()
  private groupCategory: GroupCategory;

  @Column({ nullable: true })
  private profileUrl: string;

  @OneToMany(
    () => GroupMemberMapper,
    (groupMemberMapper) => groupMemberMapper.getGroup
  )
  private groupMemberMapper: GroupMemberMapper[];

  constructor(
    name: string,
    description: string,
    groupCategory: GroupCategory,
    profileUrl: string
  ) {
    super();
    this.name = name;
    this.description = description;
    this.groupCategory = groupCategory;
    this.profileUrl = profileUrl;
    this.membersCount = 0;
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

  public getGroupCategory(): GroupCategory {
    return this.groupCategory;
  }

  public getProfileUrl(): string {
    return this.profileUrl;
  }

  public getGroupMemberMapping() {
    return this.groupMemberMapper;
  }
}
