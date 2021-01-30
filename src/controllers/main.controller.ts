import { Get, JsonController } from 'routing-controllers';
import { Service } from 'typedi';
import { ApiResponse } from '@src/common/dto/api.response.dto';

@Service()
@JsonController()
export class MainController {
  @Get('/ping')
  public ping(): ApiResponse<string> {
    return ApiResponse.success();
  }
}
