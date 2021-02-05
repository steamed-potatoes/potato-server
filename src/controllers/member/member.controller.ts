import {
  Body,
  CurrentUser,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from 'routing-controllers';
import { Service } from 'typedi';
import { ApiResponse } from '@src/common/dto/api.response.dto';
import {
  CreateAccountRequest,
  MemberChangeRequest,
} from '@src/services/member/dto/member.request.dto';
import { MemberService } from '@src/services/member/member.service';
import { OpenAPI } from 'routing-controllers-openapi';
import { MemberInfoChangeResponse } from '@src/services/member/dto/member.response.dto';

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

  @Get('/api/v1/signup/verify/:verificationUuid')
  public async verifyEmail(
    @Param('verificationUuid') verificationUuid: string
  ) {
    const token = await this.memberService.verifyEmail(verificationUuid);
    return ApiResponse.success(token);
  }

  @OpenAPI({
    security: [{ BearerAuth: [] }],
  })
  @Get('/api/v1/member')
  public async getMemberInfo(@CurrentUser() memberId: number) {
    const response = await this.memberService.getMemberInfo(memberId);
    return ApiResponse.success(response);
  }

  @Put('/api/v1/member')
  public async getMemberInfoChange(
    @Body() request: MemberChangeRequest,
    @CurrentUser() memberId: number
  ): Promise<ApiResponse<MemberInfoChangeResponse>> {
    const response = await this.memberService.getMemberChangeInfo(
      request,
      memberId
    );
    return ApiResponse.success(response);
  }
}
