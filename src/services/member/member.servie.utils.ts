import { Repository } from 'typeorm';
import {
  ConflictException,
  NotFoundException,
} from '@src/common/exceptions/custom.exceptions';
import { Member } from '@src/domains/member/member.entity';
import { MemberVerification } from '@src/domains/member/member-verification.entity';

export class MemberServiceUtils {
  public static async validateNonExistMember(
    memberRepository: Repository<Member>,
    email: string
  ): Promise<void> {
    const findMember = await memberRepository.findOne({
      where: { email: email },
    });
    if (findMember) {
      throw new ConflictException(`이미 회원가입한 멤버 (${email}) 입니다.`);
    }
  }

  public static async findMemberVerifcationByUuid(
    memberVerificationRepository: Repository<MemberVerification>,
    verificationUuid: string
  ) {
    const findMemberVerifcation = await memberVerificationRepository.findOne({
      where: { uuid: verificationUuid },
    });
    if (!findMemberVerifcation) {
      throw new NotFoundException(
        `해당 하는 인증 메일 (${verificationUuid})을 찾을 수 없습니다`
      );
    }
    return findMemberVerifcation;
  }

  public static async findMemberById(
    memberRepository: Repository<Member>,
    memberId: number
  ): Promise<Member> {
    const findMember = await memberRepository.findOne(memberId);
    if (!findMember) {
      throw new NotFoundException(
        `해당 (${memberId})를 가진 멤버는 존재하지 않습니다.`
      );
    }
    return findMember;
  }
}
