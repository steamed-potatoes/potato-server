import { IsEmail, IsInt, IsString, Matches } from 'class-validator';
import { MemberVerification } from '@src/domains/member/member-verification.entity';
import { Major } from '@src/domains/member/major.type';
import { Member } from '@src/domains/member/member.entity';

export class CreateAccountRequest {
  @IsInt({ message: '학번을 다시 확인해주세요.' })
  private readonly studentId: number;

  @IsEmail({}, { message: '이메일을 다시 확인해주세요.' })
  private readonly email: string;

  @Matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/, {
    message: '비밀번호는 8자이상의 숫자+영문자+특수문자의 조합이어야 합니다',
  })
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

  public toMember(): Member {
    return Member.newLocalInstance(
      this.studentId,
      this.email,
      this.name,
      this.password,
      this.majorCode
    );
  }

  public getEmail(): string {
    return this.email;
  }
}

export class UpdateMemberRequest {
  @IsInt({ message: '학번을 다시 확인해주세요.' })
  private readonly studentId: number;

  @IsString({ message: '비밀번호를 다시 확인해주세요.' })
  private readonly password: string;

  @IsString({ message: '이름을 다시 확인해주세요.' })
  private readonly name: string;

  @IsString({ message: '학과를 다시 확인해주세요.' })
  private readonly major: Major;

  constructor(studentId: number, password: string, name: string, major: Major) {
    this.studentId = studentId;
    this.password = password;
    this.name = name;
    this.major = major;
  }

  public getStudentId() {
    return this.studentId;
  }

  public getPassword() {
    return this.password;
  }

  public getName() {
    return this.name;
  }

  public getMajor() {
    return this.major;
  }
}

export class LoginAccountRequest {
  @IsEmail({}, { message: '이메일을 다시 확인해주세요.' })
  private readonly email: string;

  @IsString({ message: '비밀번호를 다시 확인해주세요.' })
  private readonly password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }
}
