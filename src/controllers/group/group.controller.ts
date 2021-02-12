import { CreateGroupRequest } from '@src/services/group/dto/group.request.dto';
import { GroupService } from '@src/services/group/group.service';
import { Body, CurrentUser, JsonController, Post } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Service } from 'typedi';

@Service()
@JsonController()
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @OpenAPI({
    security: [{ BearerAuth: [] }],
  })
  @Post('/api/v1/group')
  public async createGroup(
    @Body() request: CreateGroupRequest,
    @CurrentUser() memberId: number
  ) {
    return await this.groupService.createGroup(request, memberId);
  }
}
