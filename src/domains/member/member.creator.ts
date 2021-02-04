import { Major } from './major.type';
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
