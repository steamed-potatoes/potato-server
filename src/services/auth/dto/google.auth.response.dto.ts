export class GoogleAuthResponse {
  private isNew: boolean;
  private token: string;

  constructor(isNew: boolean, token: string) {
    this.isNew = isNew;
    this.token = token;
  }

  public static login(token: string) {
    return new GoogleAuthResponse(false, token);
  }

  public static signUp(token: string) {
    return new GoogleAuthResponse(true, token);
  }
}
