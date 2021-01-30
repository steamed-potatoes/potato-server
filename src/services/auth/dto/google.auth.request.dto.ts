import { IsString } from 'class-validator';

export class GoogleAuthRequest {
  @IsString()
  private code: string;

  @IsString()
  private redirectUri: string;

  public getCode(): string {
    return this.code;
  }

  public getRedirectUri(): string {
    return this.redirectUri;
  }
}
