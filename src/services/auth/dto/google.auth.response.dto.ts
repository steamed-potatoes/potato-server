export class GoogleAuthResponse {
  private readonly isNew: boolean;
  private readonly token: string;

  constructor(isNew: boolean, token: string) {
    this.isNew = isNew;
    this.token = token;
  }

  public static login(token: string): GoogleAuthResponse {
    return new GoogleAuthResponse(false, token);
  }

  public static signUp(token: string): GoogleAuthResponse {
    return new GoogleAuthResponse(true, token);
  }
}
