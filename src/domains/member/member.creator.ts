import { Major } from './major.type';
import { MemberVerification } from './member-verification.entity';
import { Member } from './member.entity';

export class MemberCreator {
  public static testInstance(
    email: string,
    studentId = 100,
    name = 'name',
    major = Major.IT_COMPUTER_ENGINEER,
    password = 'password',
    salt = 'salt'
  ) {
    return new Member(studentId, email, name, password, salt, major);
  }
}

export class MemberVerificationCreator {
  public static testInstance(
    studentId: number,
    email: string,
    name: string,
    password: string,
    salt: string,
    major: Major
  ) {
    return new MemberVerification(
      studentId,
      email,
      name,
      password,
      salt,
      major
    );
  }
}
