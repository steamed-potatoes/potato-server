import { Column, Entity } from 'typeorm';
import { CoreEntity } from '@src/domains/core.entity';

export enum Major {
  IT_COMPUTER_ENGINEER = 'IT학부, 컴퓨터공학과',
}

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

  public static testInstance(email: string) {
    return new Member(
      100,
      email,
      'name',
      'password',
      'salt',
      Major.IT_COMPUTER_ENGINEER
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
}
