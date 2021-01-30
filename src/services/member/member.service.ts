import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Member } from '@src/domains/member/member.entity';
import { CreateAccountRequest } from '@src/services/member/dto/member.request.dto';
import { MemberServiceUtils } from '@src/services/member/member.servie.utils';
import { JwtTokenUtils } from '@src/common/utils/jwt/jwt.utils';
import { MemberInfoResponse } from './dto/member.response.dto';

@Service()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>
  ) {}

  public async createAccount(request: CreateAccountRequest): Promise<string> {
    await MemberServiceUtils.validateNonExistMember(
      this.memberRepository,
      request.getEmail()
    );
    const member = await this.memberRepository.save(request.toEntity());
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
