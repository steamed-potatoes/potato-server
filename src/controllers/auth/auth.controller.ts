import { ApiResponse } from '@src/common/dto/api.response.dto';
import { Get, JsonController, QueryParams } from 'routing-controllers';
import { Service } from 'typedi';
import AuthService from '@src/services/auth/auth.service';
import { GoogleAuthRequest } from '@src/services/auth/dto/google.auth.request.dto';
import { GoogleAuthResponse } from '@src/services/auth/dto/google.auth.response.dto';

@Service()
@JsonController()
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/api/v1/auth/google')
  public async handleGoogleAuth(
    @QueryParams() request: GoogleAuthRequest
  ): Promise<ApiResponse<GoogleAuthResponse>> {
    const response = await this.authService.handleGoogleAuthentication(request);
    return ApiResponse.success(response);
  }
}
