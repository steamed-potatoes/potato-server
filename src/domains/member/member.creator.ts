import { Member } from './member.entity';

export class MemberCreator {
  public static create(email: string) {
    return new Member(email, '이름', null);
  }
}
