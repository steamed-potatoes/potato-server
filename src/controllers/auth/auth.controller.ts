import { ApiResponse } from '@src/common/dto/api.response.dto';
import {
  CurrentUser,
  Get,
  JsonController,
  QueryParams,
} from 'routing-controllers';
import { Service } from 'typedi';
import AuthService from '@src/services/auth/auth.service';
import { GoogleAuthRequest } from '@src/services/auth/dto/google.auth.request.dto';
import { GoogleAuthResponse } from '@src/services/auth/dto/google.auth.response.dto';
import { MemberInfoResponse } from '@src/services/member/dto/member.response.dto';

@Service()
@JsonController()
export default class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/api/v1/auth/google')
  public async handleGoogleAuth(
    @QueryParams() request: GoogleAuthRequest
  ): Promise<ApiResponse<GoogleAuthResponse>> {
    return ApiResponse.success(
      await this.authService.handleGoogleAuthentication(request)
    );
  }

  @Get('/api/v1/user')
  public async getMemberInfo(
    @CurrentUser() userId: number
  ): Promise<ApiResponse<MemberInfoResponse>> {
    const response = await this.authService.getMemberInfo(userId);
    return ApiResponse.success(response);
  }
}
