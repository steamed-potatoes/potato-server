import { Body, JsonController, Post } from 'routing-controllers';
import { Service } from 'typedi';
import { ApiResponse } from '@src/common/dto/api.response.dto';
import { CreateAccountRequest } from '@src/services/member/dto/member.request.dto';
import { MemberService } from '@src/services/member/member.service';

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
