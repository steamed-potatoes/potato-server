import {
  ConflictException,
  NotFoundException,
} from '@src/common/exceptions/custom.exceptions';
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

  public static async validateExistOrganization(
    organizationRepository: Repository<Organization>,
    organizationId: number
  ): Promise<Organization> {
    const organization = await organizationRepository.findOne(organizationId);
    if (!organization) {
      throw new NotFoundException('존재하지 않는 organization입니다.');
    }
    return organization;
  }
}
