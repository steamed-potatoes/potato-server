import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Member } from '@src/domains/member/member.entity';
import {
  CreateAccountRequest,
  LoginAccountRequest,
  MemberChangeRequest,
} from '@src/services/member/dto/member.request.dto';
import { MemberServiceUtils } from '@src/services/member/member.service.utils';
import { MemberInfoResponse } from './dto/member.response.dto';
import { JwtTokenUtils } from '@src/common/utils/jwt/jwt.utils';

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
    const member = await this.memberRepository.save(request.toMember());
    return JwtTokenUtils.encodeToken(member.getId());
  }

  public async loginAccount(request: LoginAccountRequest) {
    const member = await MemberServiceUtils.findMemberByEmail(
      this.memberRepository,
      request.getEmail()
    );
    await member.checkPassword(request.getPassword());
    return JwtTokenUtils.encodeToken(member.getId());
  }

  public async getMemberInfo(memberId: number): Promise<MemberInfoResponse> {
    const findMember = await MemberServiceUtils.findMemberById(
      this.memberRepository,
      memberId
    );
    return MemberInfoResponse.of(findMember);
  }

  public async updateMemberInfo(
    request: MemberChangeRequest,
    memberId: number
  ): Promise<MemberInfoResponse> {
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
