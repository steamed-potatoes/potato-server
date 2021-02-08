import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Member } from '@src/domains/member/member.entity';
import {
  CreateAccountRequest,
  MemberChangeRequest,
} from '@src/services/member/dto/member.request.dto';
import { MemberServiceUtils } from '@src/services/member/member.servie.utils';
import {
  MemberInfoChangeResponse,
  MemberInfoResponse,
} from './dto/member.response.dto';
import { MemberVerification } from '@src/domains/member/member-verification.entity';
import { JwtTokenUtils } from '@src/common/utils/jwt/jwt.utils';

@Service()
export class MemberService {
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

  public async getMemberChangeInfo(
    request: MemberChangeRequest,
    memberId: number
  ) {
    const findMember = await MemberServiceUtils.findMemberById(
      this.memberRepository,
      memberId
    );
    findMember.update(
      request.getStudentId(),
      request.getPassword(),
      request.getName(),
      request.getMajor()
    );
    const updateMember = await this.memberRepository.save(findMember);
    return MemberInfoResponse.of(updateMember);
  }
}
