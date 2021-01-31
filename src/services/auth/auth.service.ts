import { JwtTokenUtils } from '@src/common/utils/jwt/jwt.utils';
import { Member } from '@src/domains/member/member.entity';
import { Inject, Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { GoogleApiCallerImpl } from '@src/externals/google.external';
import { Repository } from 'typeorm';
import { GoogleAuthRequest } from './dto/google.auth.request.dto';
import { GoogleAuthResponse } from './dto/google.auth.response.dto';

@Service()
export class AuthService {
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
    const member = await this.memberRepository.findOne({
      where: { email: email },
    });

    if (!member) {
      // 해당 멤버가 없을 경우, 회원가입을 위한 정보를 반환한다.
      return GoogleAuthResponse.signUp(email, name, picture);
    }
    // 해당 멤버가 있을 경우, 로그인 처리한다.
    const token = JwtTokenUtils.encodeToken(member.getId());
    return GoogleAuthResponse.login(token);
  }
}
