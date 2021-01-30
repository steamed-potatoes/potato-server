import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';
import { Member } from '@src/domains/member/member.entity';

export class CreateAccountRequest {
  @IsEmail({}, { message: '이메일을 다시 확인해주세요.' })
  private readonly email: string;

  @IsString({ message: '이름을 다시 확인해주세요.' })
  private readonly name: string;

  @IsOptional()
  @IsUrl({}, { message: '프로필 사진을 다시 확인해주세요.' })
  private readonly profileUrl: string;

  constructor(email: string, name: string, profileUrl: string) {
    this.email = email;
    this.name = name;
    this.profileUrl = profileUrl;
  }

  // 테스트 코드에서 사용되는 정적 팩토리 메소드
  public static testInstance(email: string, name: string, profileUrl: string) {
    return new CreateAccountRequest(email, name, profileUrl);
  }

  public toEntity(): Member {
    return Member.newInstance(this.email, this.name, this.profileUrl);
  }

  public getEmail(): string {
    return this.email;
  }
}
