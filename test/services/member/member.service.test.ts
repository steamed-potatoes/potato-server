import { Connection, Repository } from 'typeorm';
import setUpDatabase from '../../utils/db.connection';
import { Member } from '../../../src/domains/member/member.entity';
import { MemberService } from '../../../src/services/member/member.service';
import { BaseException } from '../../../src/common/exceptions/base.exception';
import { MemberVerification } from '../../../src/domains/member/member-verification.entity';
import {
  CreateAccountRequest,
  MemberChangeRequest,
} from '../../../src/services/member/dto/member.request.dto';
import { MemberCreator } from '../../../src/domains/member/member.creator';
import { Major } from '../../../src/domains/member/major.type';

describe('MemberServiceTest', () => {
  let connection: Connection;
  let memberRepository: Repository<Member>;
  let memberVerificationRepository: Repository<MemberVerification>;
  let memberService: MemberService;

  beforeEach(async () => {
    connection = await setUpDatabase();
    memberRepository = connection.getRepository(Member);
    memberVerificationRepository = connection.getRepository(MemberVerification);
    memberService = new MemberService(
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

  describe('getMemberInfo()', () => {
    test('나의 멤버 정보를 가져온다', async () => {
      // given
      const studentId = 201610302;
      const email = 'will.seungho@gmail.com';
      const name = '강승호';
      const major = Major.IT_COMPUTER_ENGINEER;
      await memberRepository.save(
        MemberCreator.testInstance(email, studentId, name, major)
      );

      // when
      const response = await memberService.getMemberInfo(1);

      // then
      expect(response.getId()).toEqual(1);
      expect(response.getStudentId()).toEqual(studentId);
      expect(response.getEmail()).toEqual(email);
      expect(response.getName()).toEqual(name);
      expect(response.getMajor()).toEqual(major);
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

  describe('getMemberChangeInfo()', () => {
    test('나의 정보를 변경한다.', async () => {
      //given
      const studentId = 201610302;
      const email = 'will.seungho@gmail.com';
      const name = '강승호';
      const major = Major.IT_COMPUTER_ENGINEER;
      await memberRepository.save(
        MemberCreator.testInstance(email, studentId, name, major)
      );

      //when
      const updateStudentId = 201610323;
      const updatePassword = 'password';
      const updateName = '유순조';
      const updateMajor = Major.IT_COMPUTER_ENGINEER;

      const updateMember = await memberService.getMemberChangeInfo(
        new MemberChangeRequest(
          updateStudentId,
          updatePassword,
          updateName,
          updateMajor
        ),
        1
      );

      //then
      expect(updateMember.getStudentId()).toBe(updateStudentId);
      expect(updateMember.getName()).toBe(updateName);
    });
  });
});
