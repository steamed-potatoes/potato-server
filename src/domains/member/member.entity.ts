import { Column, Entity } from 'typeorm';
import { CoreEntity } from '@src/domains/core.entity';
import { Major } from './major.type';
import { PasswordUtils } from '@src/common/utils/password/password.utils';

@Entity()
export class Member extends CoreEntity {
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
    this.salt = salt;
    this.major = major;
  }

  public getEmail(): string {
    return this.email;
  }

  public getName(): string {
    return this.name;
  }

  public getStudentId(): number {
    return this.studentId;
  }

  public getMajor(): Major {
    return this.major;
  }

  public getPassword(): string {
    return this.password;
  }

  public getSalt(): string {
    return this.salt;
  }

  public update(
    studentId: number,
    password: string,
    name: string,
    major: Major
  ) {
    if (studentId) {
      this.studentId = studentId;
    }
    if (password) {
      const hashedPassword = PasswordUtils.encodePassword(password, this.salt);
      this.password = hashedPassword;
    }
    if (name) {
      this.name = name;
    }
    if (major) {
      this.major = major;
    }
  }
}
