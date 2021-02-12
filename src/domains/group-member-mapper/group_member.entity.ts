import { Column, Entity, ManyToOne } from 'typeorm';
import { CoreEntity } from '../core.entity';
import { Group } from '../group/group.entity';

export enum RoleType {
  ADMIN = 'admin',
  PUBLIC = 'public',
}

@Entity()
export class GroupMemberMapper extends CoreEntity {
  @Column()
  private type: RoleType;

  @Column()
  private memberId: number;

  @ManyToOne(() => Group, (group) => group.getGroupMemberMapping)
  private group: number;

  public getType() {
    return this.type;
  }

  public getMemberId() {
    return this.memberId;
  }

  public getGroup() {
    return this.group;
  }
}
