import { Repository } from 'typeorm';
import { ConflictException } from '../../common/exceptions/custom.exceptions';
import { Member } from '../../domains/member/member.entity';

export class MemberServiceUtils {
  public static async validateNonExistMember(
    memberRepository: Repository<Member>,
    email: string
  ) {
    const findMember = await memberRepository.findOne({
      where: { email: email },
    });
    if (findMember) {
      throw new ConflictException(`이미 회원가입한 멤버 (${email}) 입니다.`);
    }
  }
}
