import { Body, Get, JsonController, Param, Post } from 'routing-controllers';
import { Service } from 'typedi';
import { ApiResponse } from '@src/common/dto/api.response.dto';
import { CreateAccountRequest } from '@src/services/member/dto/member.request.dto';
import { MemberV2Service } from '@src/services/member/member.v2.service';

@Service()
@JsonController()
export class MemberV2Controller {
  constructor(private readonly memberService: MemberV2Service) {}

  @Post('/api/v2/signup')
  public async createAccount(
    @Body() request: CreateAccountRequest
  ): Promise<ApiResponse<string>> {
    await this.memberService.createAccount(request);
    return ApiResponse.success();
  }

  @Get('/api/v2/signup/verify/:code')
  public async verifyEmail(@Param('code') code: string) {
    const token = await this.memberService.verifyEmail(code);
    return ApiResponse.success(token);
  }
}
