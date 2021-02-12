import { Column, Entity, JoinColumn, JoinTable, ManyToOne } from 'typeorm';
import { CoreEntity } from '../core.entity';
import { Group } from './group.entity';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity()
export class GroupMemberMapper extends CoreEntity {
  @JoinColumn()
  @ManyToOne((type) => Group, (group) => group.groupMemberMappers, {
    onDelete: 'CASCADE',
  })
  group: Group;

  @Column()
  private memberId: number;

  @Column()
  private role: Role;

  constructor(group: Group, memberId: number, role: Role) {
    super();
    this.group = group;
    this.memberId = memberId;
    this.role = role;
  }

  public static newAdmin(group: Group, memberId: number): GroupMemberMapper {
    return new GroupMemberMapper(group, memberId, Role.ADMIN);
  }

  public static newUser(group: Group, memberId: number): GroupMemberMapper {
    return new GroupMemberMapper(group, memberId, Role.USER);
  }

  public getRole(): Role {
    return this.role;
  }

  public getMemberId() {
    return this.memberId;
  }
}
