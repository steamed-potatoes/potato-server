import { Get, JsonController } from 'routing-controllers';
import { ApiResponse } from '../common/dto/api.response.dto';
import { Service } from 'typedi';

@Service()
@JsonController()
export class MainController {
  @Get('/ping')
  public ping(): ApiResponse<string> {
    return ApiResponse.success('pong');
  }
}
