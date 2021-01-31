import { IsString } from 'class-validator';

export class GoogleAuthRequest {
  @IsString()
  private readonly code: string;

  @IsString()
  private readonly redirectUri: string;

  constructor(code: string, redirectUri: string) {
    this.code = code;
    this.redirectUri = redirectUri;
  }

  public getCode(): string {
    return this.code;
  }

  public getRedirectUri(): string {
    return this.redirectUri;
  }
}
