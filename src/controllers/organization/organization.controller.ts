import { ApiResponse } from '@src/common/dto/api.response.dto';
import { Organization } from '@src/domains/organization/organization.entity';
import { CreateOrganizationRequest } from '@src/services/organization/dto/organization.request.dto';
import { OrganizationService } from '@src/services/organization/organization.service';
import {
  Body,
  CurrentUser,
  Get,
  JsonController,
  Param,
  Post,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Service } from 'typedi';

@Service()
@JsonController()
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @OpenAPI({
    security: [{ BearerAuth: [] }],
  })
  @Post('/api/v1/organization')
  public async createOrganization(
    @Body() request: CreateOrganizationRequest,
    @CurrentUser() memberId: number
  ) {
    const response = await this.organizationService.createOrganization(
      request,
      memberId
    );
    return ApiResponse.success(response);
  }

  @OpenAPI({
    security: [{ BearerAuth: [] }],
  })
  @Get('/api/v1/organization/member/:organizationId')
  public async registerMember(
    @Param('organizationId') organizationId: number,
    @CurrentUser() memberId: number
  ) {
    const response = await this.organizationService.registerOrganizationMember(
      organizationId,
      memberId
    );
    return ApiResponse.success();
  }
}
