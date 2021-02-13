import { Organization } from '@src/domains/organization/organization.entity';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { CreateOrganizationRequest } from './dto/organization.request.dto';
import { OrganizationInfoResponse } from './dto/organization.response.dto';
import { OrganizationServiceUtils } from './organization.service.utils';

@Service()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>
  ) {}

  public async createOrganization(
    request: CreateOrganizationRequest,
    memberId: number
  ): Promise<OrganizationInfoResponse> {
    await OrganizationServiceUtils.validateNonExistOrganization(
      this.organizationRepository,
      request.getName()
    );
    const newOrganization = request.toEntity();
    newOrganization.addAdmin(memberId);
    await this.organizationRepository.save(newOrganization);
    return OrganizationInfoResponse.of(newOrganization);
  }

  public async registerOrganizationMember(
    organizationId: number,
    memberId: number
  ) {
    const organization = await OrganizationServiceUtils.validateExistOrganization(
      this.organizationRepository,
      organizationId
    );
    organization.addUser(memberId);
    await this.organizationRepository.save(organization);
  }
}
