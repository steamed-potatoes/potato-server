import {
  Body,
  CurrentUser,
  Get,
  JsonController,
  Param,
  Patch,
  Post,
} from 'routing-controllers';
import { Service } from 'typedi';
import { ApiResponse } from '@src/common/dto/api.response.dto';
import {
  CreateAccountRequest,
  LoginAccountRequest,
  UpdateMemberRequest,
} from '@src/services/member/dto/member.request.dto';
import { MemberService } from '@src/services/member/member.service';
import { OpenAPI } from 'routing-controllers-openapi';
import { MemberInfoResponse } from '@src/services/member/dto/member.response.dto';

@Service()
@JsonController()
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('/api/v1/signup')
  public async createAccount(
    @Body() request: CreateAccountRequest
  ): Promise<ApiResponse<string>> {
    const token = await this.memberService.signUpLocal(request);
    return ApiResponse.success(token);
  }

  @Post('/api/v1/login')
  public async loginAccount(@Body() request: LoginAccountRequest) {
    const token = await this.memberService.loginLocal(request);
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

  @OpenAPI({
    security: [{ BearerAuth: [] }],
  })
  @Patch('/api/v1/member')
  public async updateMemberInfo(
    @Body() request: UpdateMemberRequest,
    @CurrentUser() memberId: number
  ): Promise<ApiResponse<MemberInfoResponse>> {
    const response = await this.memberService.updateMemberInfo(
      request,
      memberId
    );
    return ApiResponse.success(response);
  }

  @OpenAPI({
    security: [{ BearerAuth: [] }],
  })
  @Get('/api/v1/member/:id')
  public async findMemberInfo(
    @Param('id') id: number,
    @CurrentUser() memberId: number
  ) {
    const response = await this.memberService.findMemberInfo(id);
    return ApiResponse.success(response);
  }
}
