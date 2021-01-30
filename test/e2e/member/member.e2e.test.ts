import { Connection, Repository } from 'typeorm';
import request from 'supertest';
import setUpDatabase from '../../utils/db.connection';
import { Member } from '../../../src/domains/member/member.entity';
import app from '../../utils/test.app';

describe('MemberServiceTest', () => {
  let connection: Connection;
  let memberRepository: Repository<Member>;

  beforeEach(async () => {
    connection = await setUpDatabase();
    memberRepository = connection.getRepository(Member);
  });

  afterEach(() => {
    connection.close();
  });

  describe('POST /api/v1/member', () => {
    test('회원가입을 성공한다 200 OK', async () => {
      await request(app)
        .post('/api/v1/member')
        .send({
          email: 'will.seungho@gmail.com',
          name: '강승호',
        })
        .expect(200);

      const members = await memberRepository.find();
      expect(members.length).toEqual(1);
    });

    test('이메일 형식이 아닐 경우 400 Bad Request', async () => {
      await request(app)
        .post('/api/v1/member')
        .send({
          email: '강승호',
          name: '강승호',
        })
        .expect(400);
    });

    test('이름이 입력되지 않은 경우, 400 Bad Request', async () => {
      await request(app)
        .post('/api/v1/member')
        .send({
          email: '강승호',
        })
        .expect(400);
    });
  });
});
