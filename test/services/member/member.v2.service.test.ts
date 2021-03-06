import { Connection, Repository } from 'typeorm';
import setUpDatabase from '../../utils/db.connection';
import { Member } from '../../../src/domains/member/member.entity';
import { MemberV2Service } from '../../../src/services/member/member.v2.service';
import { BaseException } from '../../../src/common/exceptions/base.exception';
import { MemberVerification } from '../../../src/domains/member/member-verification.entity';
import { CreateAccountRequest } from '../../../src/services/member/dto/member.request.dto';
import {
  MemberCreator,
  MemberVerificationCreator,
} from '../../../src/domains/member/member.creator';
import { Major } from '../../../src/domains/member/major.type';

describe('MemberServiceTest', () => {
  let connection: Connection;
  let memberRepository: Repository<Member>;
  let memberVerificationRepository: Repository<MemberVerification>;
  let memberService: MemberV2Service;

  beforeEach(async () => {
    connection = await setUpDatabase();
    memberRepository = connection.getRepository(Member);
    memberVerificationRepository = connection.getRepository(MemberVerification);
    memberService = new MemberV2Service(
      memberRepository,
      memberVerificationRepository
    );
  });

  afterEach(() => {
    connection.close();
  });

  describe('createAccount()', () => {
    test('회원가입 요청을 하면 MemberVerifcation에 정보가 임시 저장된다', async () => {
      // given
      const studentId = 201610302;
      const email = 'will.seungho@gmail.com';
      const password = 'password';
      const name = '강승호';
      const majorCode = 'IT_ICT';

      // when
      await memberService.createAccount(
        new CreateAccountRequest(studentId, email, password, name, majorCode)
      );

      // then
      const memberVerifications = await memberVerificationRepository.find();
      expect(memberVerifications.length).toEqual(1);
      expect(memberVerifications[0].getStudentId()).toEqual(studentId);
      expect(memberVerifications[0].getEmail()).toEqual(email);
      expect(memberVerifications[0].getName()).toEqual(name);
      expect(memberVerifications[0].getMajor()).toEqual(Major[majorCode]);
    });

    test('이미 존재하는 회원이 있을경우, 회원가입 요청시 409 에러가 발생한다', async () => {
      // given
      const email = 'will.seungho@gmail.com';
      await memberRepository.save(MemberCreator.testInstance(email));

      // when & then
      try {
        await memberService.createAccount(
          new CreateAccountRequest(
            10000,
            email,
            'password',
            '강승호',
            Major.IT_COMPUTER_ENGINEER
          )
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BaseException);
        expect(error.httpCode).toEqual(409);
        expect(error.name).toEqual('CONFLICT_EXCEPTION');
      }
    });
  });

  describe('verifyEmail()', () => {
    test('이메일 인증 성공시 회원가입이 완료된다', async () => {
      // given
      const memberVerification = await memberVerificationRepository.save(
        MemberVerificationCreator.testInstance(
          201610302,
          'will.seungho@gmail.com',
          '강승호',
          'password',
          'salt',
          Major.IT_COMPUTER_ENGINEER
        )
      );

      // when
      await memberService.verifyEmail(memberVerification.getUuid());

      // then
      const members = await memberRepository.find();
      expect(members.length).toEqual(1);
      expect(members[0].getEmail()).toEqual(memberVerification.getEmail());
      expect(members[0].getName()).toEqual(memberVerification.getName());
      expect(members[0].getStudentId()).toEqual(
        memberVerification.getStudentId()
      );
      expect(members[0].getPassword()).toEqual(
        memberVerification.getPassword()
      );
      expect(members[0].getSalt()).toEqual(memberVerification.getSalt());
      expect(members[0].getMajor()).toEqual(memberVerification.getMajor());
    });

    test('이메일 인증시, 이미 회원가입된 유저면 409 에러 발생', async () => {
      // given
      await memberRepository.save(
        MemberCreator.testInstance('will.seungho@gmail.com')
      );

      const memberVerification = await memberVerificationRepository.save(
        MemberVerificationCreator.testInstance(
          201610302,
          'will.seungho@gmail.com',
          '강승호',
          'password',
          'salt',
          Major.IT_COMPUTER_ENGINEER
        )
      );

      // when & then
      try {
        await memberService.verifyEmail(memberVerification.getUuid());
      } catch (error) {
        expect(error).toBeInstanceOf(BaseException);
        expect(error.httpCode).toEqual(409);
        expect(error.name).toEqual('CONFLICT_EXCEPTION');
      }
    });
  });
});
