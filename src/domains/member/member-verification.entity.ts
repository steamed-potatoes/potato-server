import { Column, Entity } from 'typeorm';
import { CoreEntity } from '@src/domains/core.entity';
import { Major, Member } from './member.entity';
import { PasswordUtils } from '@src/common/utils/password/password.utils';
import { v4 as uuid } from 'uuid';

@Entity()
export class MemberVerification extends CoreEntity {
  @Column()
  private studentId: number;

  @Column()
  private email: string;

  @Column()
  private password: string;

  @Column()
  private salt: string;

  @Column()
  private name: string;

  @Column()
  private major: Major;

  constructor(
    studentId: number,
    email: string,
    name: string,
    password: string,
    salt: string,
    major: Major
  ) {
    super();
    this.studentId = studentId;
    this.email = email;
    this.name = name;
    this.password = password;
    this.major = major;
    this.salt = salt;
  }

  public static newInstance(
    studentId: number,
    email: string,
    password: string,
    name: string,
    major: Major
  ) {
    const salt = uuid();
    const hashPassword = PasswordUtils.encodePassword(password, salt);
    return new MemberVerification(
      studentId,
      email,
      name,
      hashPassword,
      salt,
      major
    );
  }

  public toEntity(): Member {
    return new Member(
      this.studentId,
      this.email,
      this.name,
      this.password,
      this.salt,
      this.major
    );
  }

  public getStudentId(): number {
    return this.studentId;
  }

  public getEmail(): string {
    return this.email;
  }

  public getName(): string {
    return this.name;
  }

  public getMajor(): Major {
    return this.major;
  }
}
