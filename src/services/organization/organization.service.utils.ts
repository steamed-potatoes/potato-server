import { ConflictException } from '@src/common/exceptions/custom.exceptions';
import { Organization } from '@src/domains/organization/organization.entity';
import { Repository } from 'typeorm';

export class OrganizationServiceUtils {
  public static async validateNonExistOrganization(
    organizationRepository: Repository<Organization>,
    name: string
  ) {
    const organization = await organizationRepository.findOne({
      where: { name: name },
    });
    if (organization) {
      throw new ConflictException('이미 존재하는 이름입니다.');
    }
  }
}
