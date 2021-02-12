import { Column, Entity, ManyToOne } from 'typeorm';
import { CoreEntity } from '../core.entity';
import { RoleType } from './group-role.type';
import { Group } from './group.entity';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity()
export class GroupMemberMapper {
  @Column()
  private type: Role;

  @Column()
  private memberId: number;

  @ManyToOne(() => Group, (group) => group.getGroupMemberMapping)
  private group: number;

  constructor(type: Role, memberId: number, group: number) {
    this.type = type;
    this.memberId = memberId;
    this.group = group;
  }

  public getType() {
    return this.type;
  }

  public getMemberId() {
    return this.memberId;
  }

  public getGroup() {
    return this.group;
  }

  public static of(roleType: string, memberId: number, group: number) {
    return new GroupMemberMapper(RoleType.of(roleType), memberId, group);
  }
}
