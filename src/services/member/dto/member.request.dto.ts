import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import { Major } from '@src/domains/member/member.entity';
import { MemberVerification } from '@src/domains/member/member-verification.entity';

export class CreateAccountRequest {
  @IsNumber()
  private readonly studentId: number;

  @IsEmail({}, { message: '이메일을 다시 확인해주세요.' })
  private readonly email: string;

  @IsString({ message: '비밀번호를 다시 확인해주세요.' })
  private readonly password: string;

  @IsString({ message: '이름을 다시 확인해주세요.' })
  private readonly name: string;

  @IsEnum(Major)
  private readonly major: Major;

  constructor(
    studentId: number,
    email: string,
    password: string,
    name: string,
    major: Major
  ) {
    this.studentId = studentId;
    this.email = email;
    this.password = password;
    this.name = name;
    this.major = major;
  }

  public toEntity(): MemberVerification {
    return MemberVerification.newInstance(
      this.studentId,
      this.email,
      this.password,
      this.name,
      this.major
    );
  }

  public getEmail(): string {
    return this.email;
  }
}
