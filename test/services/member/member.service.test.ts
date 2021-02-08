import { Connection, Repository } from 'typeorm';
import setUpDatabase from '../../utils/db.connection';
import { Member } from '../../../src/domains/member/member.entity';
import { MemberService } from '../../../src/services/member/member.service';
import { BaseException } from '../../../src/common/exceptions/base.exception';
import {
  CreateAccountRequest,
  LoginAccountRequest,
  MemberChangeRequest,
} from '../../../src/services/member/dto/member.request.dto';
import { MemberCreator } from '../../../src/domains/member/member.creator';
import { Major, MajorType } from '../../../src/domains/member/major.type';
import { PasswordUtils } from '../../../src/common/utils/password/password.utils';

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

  describe('createAccount', () => {
    test('새로운 유저가 회원가입한다', async () => {
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
      const members = await memberRepository.find();
      expect(members.length).toEqual(1);
      expect(members[0].getStudentId()).toEqual(studentId);
      expect(members[0].getEmail()).toEqual(email);
      expect(members[0].getName()).toEqual(name);
      expect(members[0].getMajor()).toEqual(MajorType.of(majorCode));
    });

    test('회원가입 요청시 이미 존재하는 이메일인 경우', async () => {
      // given
      const studentId = 201610302;
      const email = 'will.seungho@gmail.com';
      const password = 'password';
      const name = '강승호';
      const majorCode = 'IT_ICT';

      await memberRepository.save(MemberCreator.testInstance(email));

      // when & then
      try {
        await memberService.createAccount(
          new CreateAccountRequest(studentId, email, password, name, majorCode)
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BaseException);
        expect(error.httpCode).toEqual(409);
        expect(error.name).toEqual('CONFLICT_EXCEPTION');
      }
    });

    test('회원가입 성공시 토큰을 반환한다', async () => {
      // when
      const response = await memberService.createAccount(
        new CreateAccountRequest(
          201610302,
          'will.seungho@gmail.com',
          'password',
          '강승호',
          'IT_ICT'
        )
      );

      // then
      expect(response).not.toBeNull();
      expect(response.startsWith('ey')).toBeTruthy();
    });
  });

  describe('loginAccount', () => {
    test('로그인 성공시 토큰을 반환한다', async () => {
      // given
      const email = 'will.seungho@gmail.com';
      const password = 'password';

      await memberRepository.save(
        MemberCreator.testInstance(
          email,
          201610302,
          '강승호',
          Major.IT_COMPUTER_ENGINEER,
          PasswordUtils.encodePassword(password, 'salt'),
          'salt'
        )
      );

      // wehn
      const response = await memberService.loginAccount(
        new LoginAccountRequest(email, password)
      );

      // then
      expect(response).not.toBeNull();
      expect(response.startsWith('ey')).toBeTruthy();
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
      await memberRepository.save(
        MemberCreator.testInstance(
          'will.seungho@gmail.com',
          201610302,
          '강승호',
          Major.IT_COMPUTER_ENGINEER
        )
      );

      //when
      const updateStudentId = 201610323;
      const updatePassword = 'password';
      const updateName = '유순조';
      const updateMajor = Major.IT_COMPUTER_ENGINEER;

      const updateMember = await memberService.updateMemberInfo(
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
      expect(updateMember.getMajor()).toBe(updateMajor);
    });

    test('해당하는 멤버가 없을 경우 404 NOT_FOUND', async () => {
      try {
        await memberService.updateMemberInfo(
          new MemberChangeRequest(
            201610323,
            'password',
            '유순조',
            Major.IT_COMPUTER_ENGINEER
          ),
          999
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BaseException);
        expect(error.httpCode).toEqual(404);
        expect(error.name).toEqual('NOT_FOUND_EXCEPTION');
      }
    });
  });
});
