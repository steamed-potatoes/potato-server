import { Body, JsonController, Post } from 'routing-controllers';
import { Service } from 'typedi';
import { ApiResponse } from '../../common/dto/api.response.dto';
import { CreateAccountRequest } from '../../services/member/dto/member.request.dto';
import { MemberService } from '../../services/member/member.service';

@Service()
@JsonController()
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('/api/v1/member')
  public async createAccount(
    @Body() request: CreateAccountRequest
  ): Promise<ApiResponse<string>> {
    await this.memberService.createAccount(request);
    return ApiResponse.success('OK');
  }
}
