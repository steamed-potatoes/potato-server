import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CoreEntity } from '../core.entity';
import { Organization } from './organization.entity';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity()
export class OrganizationMemberMapper extends CoreEntity {
  @JoinColumn()
  @ManyToOne(
    (type) => Organization,
    (organization) => organization.organizationMemberMappers,
    {
      onDelete: 'CASCADE',
    }
  )
  organization: Organization;

  @Column()
  private memberId: number;

  @Column()
  private role: Role;

  constructor(organization: Organization, memberId: number, role: Role) {
    super();
    this.organization = organization;
    this.memberId = memberId;
    this.role = role;
  }

  public static newAdmin(
    organization: Organization,
    memberId: number
  ): OrganizationMemberMapper {
    return new OrganizationMemberMapper(organization, memberId, Role.ADMIN);
  }

  public static newUser(
    organization: Organization,
    memberId: number
  ): OrganizationMemberMapper {
    return new OrganizationMemberMapper(organization, memberId, Role.USER);
  }

  public getRole(): Role {
    return this.role;
  }

  public getMemberId() {
    return this.memberId;
  }
}
