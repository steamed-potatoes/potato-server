import { Inject, Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Member } from '@src/domains/member/member.entity';
import { CreateAccountRequest } from '@src/services/member/dto/member.request.dto';
import { MemberServiceUtils } from '@src/services/member/member.servie.utils';
import { MemberInfoResponse } from './dto/member.response.dto';
import { MemberVerification } from '@src/domains/member/member-verification.entity';
import { JwtTokenUtils } from '@src/common/utils/jwt/jwt.utils';
import { MailSender } from '@src/common/external/mail/mailsender';

@Service()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(MemberVerification)
    private readonly memberVerifcationRepository: Repository<MemberVerification>,
    @Inject()
    private readonly mailSender: MailSender
  ) {}

  public async createAccount(request: CreateAccountRequest): Promise<void> {
    await MemberServiceUtils.validateNonExistMember(
      this.memberRepository,
      request.getEmail()
    );
    await this.memberVerifcationRepository.save(request.toEntity());
    // TODO 이메일 보내는 로직 => 이벤트로 비동기로 이루어지게 변경하기
    await this.mailSender.sendMail('will.seungho@gmail.com', '바보', '멍청이');
  }

  public async verifyEmail(verificationUuid: string): Promise<string> {
    const memberVerification = await MemberServiceUtils.findMemberVerifcationByUuid(
      this.memberVerifcationRepository,
      verificationUuid
    );
    await MemberServiceUtils.validateNonExistMember(
      this.memberRepository,
      memberVerification.getEmail()
    );
    const member = await this.memberRepository.save(
      memberVerification.toEntity()
    );
    return JwtTokenUtils.encodeToken(member.getId());
  }

  public async getMemberInfo(memberId: number): Promise<MemberInfoResponse> {
    const findMember = await MemberServiceUtils.findMemberById(
      this.memberRepository,
      memberId
    );
    return MemberInfoResponse.of(findMember);
  }
}
