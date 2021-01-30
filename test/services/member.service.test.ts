import { Connection, Repository } from 'typeorm';
import setUpDatabase from '../utils/db.connection';
import { Member } from '../../src/domains/member/member.entity';
import { MemberService } from '../../src/services/member/member.service';
import { CreateAccountRequest } from '../../src/services/member/dto/member.request.dto';
import { MemberCreator } from '../../src/domains/member/member.creator';
import { BaseException } from '../../src/common/exceptions/base.exception';

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

  describe('회원가입 기능 테스트', () => {
    test('새로운 멤버가 저장된다', async () => {
      // given
      const email = 'will.seungho@gmail.com';
      const name = '강승호';
      const profileUrl = 'http://profile.com';

      // when
      await memberService.createAccount(
        CreateAccountRequest.testInstance(email, name, profileUrl)
      );

      // then
      const members = await memberRepository.find();
      expect(members.length).toEqual(1);
      expect(members[0].getEmail()).toEqual(email);
      expect(members[0].getName()).toEqual(name);
      expect(members[0].getProfileUrl()).toEqual(profileUrl);
    });

    test('이미 해당하는 이메일의 멤버가 있는 경우 ConflictException이 발생한다', async () => {
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
});
