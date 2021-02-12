import { Connection, Repository } from 'typeorm';
import setUpDatabase from '../../utils/db.connection';
import { Organization } from '../../../src/domains/organization/organization.entity';
import {
  OrganizationMemberMapper,
  Role,
} from '../../../src/domains/organization/organization-member-mapper.entity';
import { OrganizationService } from '../../../src/services/organization/organization.service';
import { CreateOrganizationRequest } from '../../../src/services/organization/dto/organization.request.dto';
import { OrganizationCategoryType } from '../../../src/domains/organization/organization-category.type';
import { BaseException } from '../../../src/common/exceptions/base.exception';

describe('MemberServiceTest', () => {
  let connection: Connection;
  let organizationRepository: Repository<Organization>;
  let organizationMemberMapperRepository: Repository<OrganizationMemberMapper>;
  let organizationService: OrganizationService;

  beforeEach(async () => {
    connection = await setUpDatabase();
    organizationRepository = connection.getRepository(Organization);
    organizationMemberMapperRepository = connection.getRepository(
      OrganizationMemberMapper
    );
    organizationService = new OrganizationService(organizationRepository);
  });

  afterEach(() => {
    connection.close();
  });

  describe('createOrganization()', () => {
    test('새로운 조직을 생성한다', async () => {
      // given
      const name = '감자 조직';
      const description = 'description';
      const type = 'APPROVE_GROUP';
      const profileUrl = 'http://profile.com';

      // when
      await organizationService.createOrganization(
        new CreateOrganizationRequest(name, description, type, profileUrl),
        1
      );

      // then
      const organizations = await organizationRepository.find();
      expect(organizations.length).toEqual(1);
      expect(organizations[0].getName()).toEqual(name);
      expect(organizations[0].getDescription()).toEqual(description);
      expect(organizations[0].getCategory()).toEqual(
        OrganizationCategoryType.of(type)
      );
      expect(organizations[0].getProfileUrl()).toEqual(profileUrl);
      expect(organizations[0].getMemberCount()).toEqual(1);
    });

    test('이미 존재하는 그룹인 경우 에러가 발생한다', async () => {
      // given
      const name = '감자';
      await organizationRepository.save(
        Organization.of(name, '123', 'APPROVE_GROUP', '123')
      );

      // when
      try {
        await organizationService.createOrganization(
          new CreateOrganizationRequest(name, null, null, null),
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
      await organizationService.createOrganization(
        new CreateOrganizationRequest(name, '123', 'APPROVE_GROUP', '123'),
        memberId
      );

      // then
      const organizationMembers = await organizationMemberMapperRepository.find();
      expect(organizationMembers.length).toEqual(1);
      expect(organizationMembers[0].getMemberId()).toEqual(memberId);
      expect(organizationMembers[0].getRole()).toEqual(Role.ADMIN);
    });
  });
});
