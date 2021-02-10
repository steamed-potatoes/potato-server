import { Major } from '@src/domains/member/major.type';
import { Member, Provider } from '@src/domains/member/member.entity';

export class MemberInfoResponse {
  private readonly id: number;
  private readonly studentId: number;
  private readonly email: string;
  private readonly name: string;
  private readonly major: Major;
  private readonly provider: Provider;

  constructor(
    id: number,
    studentId: number,
    email: string,
    name: string,
    major: Major,
    provider: Provider
  ) {
    this.id = id;
    this.studentId = studentId;
    this.email = email;
    this.name = name;
    this.major = major;
    this.provider = provider;
  }

  public static of(member: Member): MemberInfoResponse {
    return new MemberInfoResponse(
      member.getId(),
      member.getStudentId(),
      member.getEmail(),
      member.getName(),
      member.getMajor(),
      member.getProvider()
    );
  }

  public getId(): number {
    return this.id;
  }

  public getStudentId(): number {
    return this.studentId;
  }

  public getEmail(): string {
    return this.email;
  }

  public getName(): string {
    return this.name;
  }

  public getMajor(): Major {
    return this.major;
  }

  public getProvider(): Provider {
    return this.provider;
  }
}
