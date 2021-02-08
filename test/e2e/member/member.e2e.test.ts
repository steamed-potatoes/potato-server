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

  describe('POST /api/v1/signup', () => {
    test('비밀번호가 8자리 보다 짧을 경우 400 에러 발생', async () => {
      await request(app)
        .post('/api/v1/signup')
        .send({
          email: 'will.seungho@gmail.com',
          name: '강승호',
          studentId: 201610302,
          password: '!pass02',
          majorCode: 'IT_ICT',
        })
        .expect(400);
    });
    test('비밀번호에 특수문자가 없는 경우 400 에러 발생', async () => {
      await request(app)
        .post('/api/v1/signup')
        .send({
          email: 'will.seungho@gmail.com',
          name: '강승호',
          studentId: 201610302,
          password: 'password1234',
          majorCode: 'IT_ICT',
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

  describe('Patch /api/v1/member', () => {
    test('토큰을 넘기지 않으면 401 Unauthorized', async () => {
      await request(app)
        .patch('/api/v1/member')
        .set('Authorization', '')
        .expect(401);
    });
    test('잘못된 토큰을 넘기면 401 Unauthorized', async () => {
      await request(app)
        .patch('/api/v1/member')
        .set('Authorization', 'Wrong Token')
        .expect(401);
    });

    //로그인 구현되면 토큰 받고 학번이 숫자가 아닐 때 테스트해보기
  });
});
