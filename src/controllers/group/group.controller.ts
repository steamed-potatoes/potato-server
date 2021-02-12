import { CreateGroupRequest } from '@src/services/group/dto/group.request.dto';
import { CreateGroupResponse } from '@src/services/group/dto/group.response.dto';
import { GroupService } from '@src/services/group/group.service';
import { Body, CurrentUser, JsonController, Post } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@JsonController()
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('/api/v1/group')
  public async createGroup(
    @Body() request: CreateGroupRequest,
    @CurrentUser() memberId: number
  ) {
    const responseGroup = await this.groupService.createGroup(
      request,
      memberId
    );
    const responseGroupMemberMapper = await this.groupService.createGroupMemberMapper(
      request,
      responseGroup,
      memberId
    );
    return CreateGroupResponse.of(responseGroup, responseGroupMemberMapper);
  }
}
