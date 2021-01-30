import { JwtTokenUtils } from '@src/common/utils/jwt/jwt.utils';
import { Member } from '@src/domains/member/member.entity';
import { Inject, Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { GoogleApiCallerImpl } from '@src/externals/google.external';
import { Repository } from 'typeorm';
import { GoogleAuthRequest } from './dto/google.auth.request.dto';
import { GoogleAuthResponse } from './dto/google.auth.response.dto';

@Service()
export default class AuthService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @Inject() private readonly googleApiCaller: GoogleApiCallerImpl
  ) {}

  public async handleGoogleAuthentication(request: GoogleAuthRequest) {
    const {
      email,
      name,
      picture,
    } = await this.googleApiCaller.getGoogleMemberProfile(
      request.getCode(),
      request.getRedirectUri()
    );
    const member = await this.memberRepository.findOne({ where: { email } });

    if (!member) {
      const newMember = await this.memberRepository.save(
        Member.newInstance(email, name, picture)
      );
      const token = JwtTokenUtils.encodeToken(newMember.getId());
      return GoogleAuthResponse.signUp(token);
    }
    const token = JwtTokenUtils.encodeToken(member.getId());
    return GoogleAuthResponse.login(token);
  }
}
