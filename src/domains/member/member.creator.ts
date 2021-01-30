import { Member } from './member.entity';

export class MemberCreator {
  public static create(
    email: string,
    name: string = '이름',
    profileUrl: string = null
  ) {
    return new Member(email, name, profileUrl);
  }
}
