import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Member } from '@src/domains/member/member.entity';
import { CreateAccountRequest } from '@src/services/member/dto/member.request.dto';
import { MemberServiceUtils } from '@src/services/member/member.service.utils';
import { MemberVerification } from '@src/domains/member/member-verification.entity';
import { JwtTokenUtils } from '@src/common/utils/jwt/jwt.utils';

@Service()
export class MemberV2Service {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(MemberVerification)
    private readonly memberVerifcationRepository: Repository<MemberVerification>
  ) {}

  public async createAccount(request: CreateAccountRequest): Promise<void> {
    await MemberServiceUtils.validateNonExistMember(
      this.memberRepository,
      request.getEmail()
    );
    await this.memberVerifcationRepository.save(request.toEntity());
    // 이메일 보내는 로직
  }

  public async verifyEmail(code: string): Promise<string> {
    const memberVerification = await MemberServiceUtils.findMemberVerifcationByUuid(
      this.memberVerifcationRepository,
      code
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
}
