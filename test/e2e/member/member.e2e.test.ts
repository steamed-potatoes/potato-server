import { Connection, Repository } from 'typeorm';
import request from 'supertest';
import setUpDatabase from '../../utils/db.connection';
import app from '../../utils/test.app';
import { MemberVerification } from '../../../src/domains/member/member-verification.entity';

describe('MemberServiceTest', () => {
  let connection: Connection;
  let memberVerifcationRepository: Repository<MemberVerification>;

  beforeEach(async () => {
    connection = await setUpDatabase();
    memberVerifcationRepository = connection.getRepository(MemberVerification);
  });

  afterEach(() => {
    connection.close();
  });

  describe('POST /api/v1/member', () => {
    test('회원가입 요청시 임시 테이블에 저장된다', async () => {
      await request(app)
        .post('/api/v1/signup')
        .send({
          email: 'will.seungho@gmail.com',
          name: '강승호',
          studentId: 201610302,
          password: '!password1234',
          majorCode: 'IT_ICT',
        })
        .expect(200);

      const members = await memberVerifcationRepository.find();
      expect(members.length).toEqual(1);
    });

    test('이메일 형식이 아닐 경우 400 Bad Request', async () => {
      await request(app)
        .post('/api/v1/signup')
        .send({
          email: '강승호',
          name: '강승호',
          studentId: 201610302,
          password: '!password1234',
          majorCode: 'IT_ICT',
        })
        .expect(400);
    });

    test('이름이 입력되지 않은 경우, 400 Bad Request', async () => {
      await request(app)
        .post('/api/v1/signup')
        .send({
          email: '강승호',
        })
        .expect(400);
    });
  });

  describe('GET /api/v1/member', () => {
    test('토큰을 넘기지 않으면 401 Unauthorzied', async () => {
      await request(app)
        .get('/api/v1/member')
        .set('Authorization', '')
        .expect(401);
    });

    test('잘못된 토큰을 넘기면 401 Unauthorzied', async () => {
      await request(app)
        .get('/api/v1/member')
        .set('Authorization', 'Wrong Token')
        .expect(401);
    });
  });
});
