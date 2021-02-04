import { IsEmail, IsInt, IsString } from 'class-validator';
import { MemberVerification } from '@src/domains/member/member-verification.entity';

export class CreateAccountRequest {
  @IsInt({ message: '학번을 다시 확인해주세요.' })
  private readonly studentId: number;

  @IsEmail({}, { message: '이메일을 다시 확인해주세요.' })
  private readonly email: string;

  @IsString({ message: '비밀번호를 다시 확인해주세요.' })
  private readonly password: string;

  @IsString({ message: '이름을 다시 확인해주세요.' })
  private readonly name: string;

  @IsString({ message: '학과를 다시 확인해주세요.' })
  private readonly majorCode: string;

  constructor(
    studentId: number,
    email: string,
    password: string,
    name: string,
    majorCode: string
  ) {
    this.studentId = studentId;
    this.email = email;
    this.password = password;
    this.name = name;
    this.majorCode = majorCode;
  }

  public toEntity(): MemberVerification {
    return MemberVerification.newInstance(
      this.studentId,
      this.email,
      this.password,
      this.name,
      this.majorCode
    );
  }

  public getEmail(): string {
    return this.email;
  }
}
