export class GoogleAuthResponse {
  private readonly isNew: boolean;
  private readonly token: string;
  private readonly email: string;
  private readonly name: string;
  private readonly profileUrl: string;

  constructor(
    isNew: boolean,
    token: string,
    email: string,
    name: string,
    profileUrl: string
  ) {
    this.isNew = isNew;
    this.token = token;
    this.email = email;
    this.name = name;
    this.profileUrl = profileUrl;
  }

  public static login(token: string): GoogleAuthResponse {
    return new GoogleAuthResponse(false, token, null, null, null);
  }

  public static signUp(
    email: string,
    name: string,
    picture: string
  ): GoogleAuthResponse {
    return new GoogleAuthResponse(true, null, email, name, picture);
  }

  public getIsNew(): boolean {
    return this.isNew;
  }

  public getToken(): string {
    return this.token;
  }

  public getEmail(): string {
    return this.email;
  }

  public getName(): string {
    return this.name;
  }

  public getProfileUrl(): string {
    return this.profileUrl;
  }
}
