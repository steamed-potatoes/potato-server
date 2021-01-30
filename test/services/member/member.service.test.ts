import { Connection, Repository } from 'typeorm';
import setUpDatabase from '../../utils/db.connection';
import { Member } from '../../../src/domains/member/member.entity';
import { MemberService } from '../../../src/services/member/member.service';
import { CreateAccountRequest } from '../../../src/services/member/dto/member.request.dto';
import { MemberCreator } from '../../../src/domains/member/member.creator';
import { BaseException } from '../../../src/common/exceptions/base.exception';

describe('MemberServiceTest', () => {
  let connection: Connection;
  let memberRepository: Repository<Member>;
  let memberService: MemberService;

  beforeEach(async () => {
    connection = await setUpDatabase();
    memberRepository = connection.getRepository(Member);
    memberService = new MemberService(memberRepository);
  });

  afterEach(() => {
    connection.close();
  });

  describe('createAccount()', () => {
    test('회원가입시, 새로운 멤버가 저장되고 해당 멤버의 토큰을 반환한다', async () => {
      // given
      const email = 'will.seungho@gmail.com';
      const name = '강승호';
      const profileUrl = 'http://profile.com';

      // when
      const response = await memberService.createAccount(
        CreateAccountRequest.testInstance(email, name, profileUrl)
      );

      // then
      const members = await memberRepository.find();
      expect(members.length).toEqual(1);
      expect(members[0].getEmail()).toEqual(email);
      expect(members[0].getName()).toEqual(name);
      expect(members[0].getProfileUrl()).toEqual(profileUrl);

      expect(response.startsWith('ey')).toBeTruthy();
    });

    test('회원가입시, 이미 해당하는 이메일의 멤버가 있는 경우 ConflictException이 발생한다', async () => {
      // given
      const email = 'will.seungho@gmail.com';
      await memberRepository.save(MemberCreator.create(email));

      // when & then
      try {
        await memberService.createAccount(
          CreateAccountRequest.testInstance(email, '강승호', null)
        );
      } catch (e) {
        expect(e).toBeInstanceOf(BaseException);
        expect(e.httpCode).toEqual(409);
        expect(e.name).toEqual('CONFLICT_EXCEPTION');
      }
    });
  });

  describe('getMemberInfo()', () => {
    test('나의 멤버 정보를 가져온다', async () => {
      // given
      const email = 'will.seungho@gmail.com';
      const name = '강승호';
      const profileUrl = 'http://profile.com';
      await memberRepository.save(
        MemberCreator.create(email, name, profileUrl)
      );

      // when
      const response = await memberService.getMemberInfo(1);

      // then
      expect(response.getId()).toEqual(1);
      expect(response.getEmail()).toEqual(email);
      expect(response.getName()).toEqual(name);
      expect(response.getProfileUrl()).toEqual(profileUrl);
    });

    test('나의 멤버 정보를 가져온다: 해당하는 멤버가 없을 경우 404 NOT_FOUND', async () => {
      // when & then
      try {
        await memberService.getMemberInfo(999);
      } catch (error) {
        expect(error).toBeInstanceOf(BaseException);
        expect(error.httpCode).toEqual(404);
        expect(error.name).toEqual('NOT_FOUND_EXCEPTION');
      }
    });
  });
});
