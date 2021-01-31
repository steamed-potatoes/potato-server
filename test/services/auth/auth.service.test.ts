import { Connection, Repository } from 'typeorm';
import { Member } from '../../../src/domains/member/member.entity';
import { AuthService } from '../../../src/services/auth/auth.service';
import setUpDatabase from '../../utils/db.connection';
import { GoogleApiCallerImpl } from '../../../src/externals/google.external';
import { GoogleAuthRequest } from '../../../src/services/auth/dto/google.auth.request.dto';
import { MemberCreator } from '../../../src/domains/member/member.creator';

jest.mock('../../../src/externals/google.external', () => {
  return {
    GoogleApiCallerImpl: jest.fn().mockImplementation(() => {
      return {
        getGoogleMemberProfile: () => {
          return {
            email: 'will.seungho@gmail.com',
            name: '강승호',
            picture: 'http://picture.com',
          };
        },
      };
    }),
  };
});

describe('AuthServiceTest', () => {
  let connection: Connection;
  let memberRepository: Repository<Member>;
  let authService: AuthService;

  beforeEach(async () => {
    connection = await setUpDatabase();
    memberRepository = connection.getRepository(Member);
    authService = new AuthService(memberRepository, new GoogleApiCallerImpl());
  });

  afterEach(() => {
    connection.close();
  });

  describe('handleGoogleAuthentication()', () => {
    test('해당하는 회원이 없을경우, 회원가입이 진행된다', async () => {
      // when
      const response = await authService.handleGoogleAuthentication(
        new GoogleAuthRequest('code', 'redirectUri')
      );

      // then
      const members = await memberRepository.find();
      expect(members.length).toEqual(0);
      expect(response.getIsNew).toBeTruthy();
      expect(response.getToken()).toBeNull();
      expect(response.getEmail()).toEqual('will.seungho@gmail.com');
      expect(response.getName()).toEqual('강승호');
      expect(response.getProfileUrl()).toEqual('http://picture.com');
    });

    test('해당하는 회원이 있을경우, 로그인이 진행된다', async () => {
      // given
      await memberRepository.save(
        MemberCreator.create('will.seungho@gmail.com')
      );

      // when
      const response = await authService.handleGoogleAuthentication(
        new GoogleAuthRequest('code', 'redirectUri')
      );

      // then
      const members = await memberRepository.find();
      expect(members.length).toEqual(1);
      expect(response.getIsNew()).toBeFalsy();
      expect(response.getToken().startsWith('ey')).toBeTruthy();
      expect(response.getEmail()).toBeNull();
      expect(response.getName()).toBeNull();
      expect(response.getProfileUrl()).toBeNull();
    });
  });
});
