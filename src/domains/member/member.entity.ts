import { Column, Entity } from 'typeorm';
import { CoreEntity } from '@src/domains/core.entity';
import { Major, MajorType } from './major.type';
import { PasswordUtils } from '@src/common/utils/password/password.utils';
import { UuidUtils } from '@src/common/utils/uuid/uuid.utils';
import { ValidationException } from '@src/common/exceptions/custom.exceptions';

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

  public static newInstance(
    studentId: number,
    email: string,
    name: string,
    password: string,
    majorCode: string
  ) {
    const salt = UuidUtils.newInstance();
    return new Member(
      studentId,
      email,
      name,
      PasswordUtils.encodePassword(password, salt),
      salt,
      MajorType.of(majorCode)
    );
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

  public async checkPassword(password: string) {
    try {
      PasswordUtils.comparePassword(this.password, this.salt, password);
    } catch (error) {
      throw new ValidationException('일치하는 멤버가 존재하지 않습니다.');
    }
  }
}
