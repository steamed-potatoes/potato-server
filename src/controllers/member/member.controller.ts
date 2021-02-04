import {
  Body,
  CurrentUser,
  Get,
  JsonController,
  Param,
  Post,
} from 'routing-controllers';
import { Service } from 'typedi';
import { ApiResponse } from '@src/common/dto/api.response.dto';
import { CreateAccountRequest } from '@src/services/member/dto/member.request.dto';
import { MemberService } from '@src/services/member/member.service';
import { OpenAPI } from 'routing-controllers-openapi';

@Service()
@JsonController()
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('/api/v1/signup')
  public async createAccount(
    @Body() request: CreateAccountRequest
  ): Promise<ApiResponse<string>> {
    await this.memberService.createAccount(request);
    return ApiResponse.success();
  }

  @Get('/api/v1/signup/verify/:id')
  public async verifyEmail(@Param('id') verifcationId: number) {
    const token = await this.memberService.verifyEmail(verifcationId);
    return ApiResponse.success(token);
  }

  @Get('/api/v1/member')
  @OpenAPI({
    security: [{ BearerAuth: [] }],
  })
  public async getMemberInfo(@CurrentUser() memberId: number) {
    const response = await this.memberService.getMemberInfo(memberId);
    return ApiResponse.success(response);
  }
}
