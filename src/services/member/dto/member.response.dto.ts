import { Member } from '@src/domains/member/member.entity';

export class MemberInfoResponse {
  private readonly id: number;
  private readonly email: string;
  private readonly name: string;
  private readonly profileUrl: string;

  constructor(id: number, email: string, name: string, profileUrl: string) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.profileUrl = profileUrl;
  }

  public static of(member: Member): MemberInfoResponse {
    return new MemberInfoResponse(
      member.getId(),
      member.getEmail(),
      member.getName(),
      member.getProfileUrl()
    );
  }

  public getId(): number {
    return this.id;
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
