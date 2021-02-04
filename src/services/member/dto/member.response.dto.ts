import { Major, Member } from '@src/domains/member/member.entity';

export class MemberInfoResponse {
  private readonly id: number;
  private readonly studentId: number;
  private readonly email: string;
  private readonly name: string;
  private readonly major: Major;

  constructor(
    id: number,
    studentId: number,
    email: string,
    name: string,
    major: Major
  ) {
    this.id = id;
    this.studentId = studentId;
    this.email = email;
    this.name = name;
    this.major = major;
  }

  public static of(member: Member): MemberInfoResponse {
    return new MemberInfoResponse(
      member.getId(),
      member.getStudentId(),
      member.getEmail(),
      member.getName(),
      member.getMajor()
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
}
