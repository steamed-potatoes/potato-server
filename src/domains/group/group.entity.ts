import { Column, Entity, OneToMany } from 'typeorm';
import { CoreEntity } from '../core.entity';
import { GroupMemberMapper } from '../group-member-mapper/group_member.entity';
import { GroupCategory } from './group-category.type';

@Entity()
export class Group extends CoreEntity {
  @Column()
  private name: string;

  @Column({ nullable: true })
  private description: string;

  @Column()
  private member_count: number;

  @Column()
  private group_category: GroupCategory;

  @Column({ nullable: true })
  private profile_url: string;

  @OneToMany(
    () => GroupMemberMapper,
    (groupMemberMapper) => groupMemberMapper.getGroup
  )
  private groupMemberMapper: GroupMemberMapper[];

  constructor(
    name: string,
    description: string,
    group_category: GroupCategory,
    profile_url: string
  ) {
    super();
    this.name = name;
    this.description = description;
    this.group_category = group_category;
    this.profile_url = profile_url;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getMemberCount(): number {
    return this.member_count;
  }

  public getGroupCategory(): GroupCategory {
    return this.group_category;
  }

  public getProfileUrl(): string {
    return this.profile_url;
  }

  public getGroupMemberMapping() {
    return this.groupMemberMapper;
  }
}
