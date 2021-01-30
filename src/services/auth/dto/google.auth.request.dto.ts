import { IsString } from 'class-validator';

export class GoogleAuthRequest {
  @IsString()
  private code: string;

  @IsString()
  private redirectUri: string;

  public getCode() {
    return this.code;
  }

  public getRedirectUri() {
    return this.redirectUri;
  }
}
