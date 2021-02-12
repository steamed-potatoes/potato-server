import { Connection, Repository } from 'typeorm';
import setUpDatabase from '../../utils/db.connection';
import { Group } from '../../../src/domains/group/group.entity';
import {
  GroupMemberMapper,
  Role,
} from '../../../src/domains/group/group-member-mapper.entity';
import { GroupService } from '../../../src/services/group/group.service';
import { CreateGroupRequest } from '../../../src/services/group/dto/group.request.dto';
import { GroupCategoryType } from '../../../src/domains/group/group-category.type';
import { BaseException } from '../../../src/common/exceptions/base.exception';

describe('MemberServiceTest', () => {
  let connection: Connection;
  let groupRepository: Repository<Group>;
  let groupMemberMapperRepository: Repository<GroupMemberMapper>;
  let groupService: GroupService;

  beforeEach(async () => {
    connection = await setUpDatabase();
    groupRepository = connection.getRepository(Group);
    groupMemberMapperRepository = connection.getRepository(GroupMemberMapper);
    groupService = new GroupService(groupRepository);
  });

  afterEach(() => {
    connection.close();
  });

  describe('createGroup()', () => {
    test('새로운 그룹을 생성한다', async () => {
      // given
      const name = '감자 그룹';
      const description = 'description';
      const type = 'APPROVE_GROUP';
      const profileUrl = 'http://profile.com';

      // when
      await groupService.createGroup(
        new CreateGroupRequest(name, description, type, profileUrl),
        1
      );

      // then
      const groups = await groupRepository.find();
      expect(groups.length).toEqual(1);
      expect(groups[0].getName()).toEqual(name);
      expect(groups[0].getDescription()).toEqual(description);
      expect(groups[0].getCategory()).toEqual(GroupCategoryType.of(type));
      expect(groups[0].getProfileUrl()).toEqual(profileUrl);
      expect(groups[0].getMemberCount()).toEqual(1);
    });

    test('이미 존재하는 그룹인 경우 에러가 발생한다', async () => {
      // given
      const name = '감자';
      await groupRepository.save(Group.of(name, '123', 'APPROVE_GROUP', '123'));

      // when
      try {
        await groupService.createGroup(
          new CreateGroupRequest(name, null, null, null),
          1
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BaseException);
        expect(error.httpCode).toEqual(409);
      }
    });

    test('새로운 그룹을 생성하면 관리자가 된다', async () => {
      // given
      const name = '감자 그룹';
      const memberId = 10;

      // when
      await groupService.createGroup(
        new CreateGroupRequest(name, '123', 'APPROVE_GROUP', '123'),
        memberId
      );

      // then
      const groupMembers = await groupMemberMapperRepository.find();
      expect(groupMembers.length).toEqual(1);
      expect(groupMembers[0].getMemberId()).toEqual(memberId);
      expect(groupMembers[0].getRole()).toEqual(Role.ADMIN);
    });
  });
});
