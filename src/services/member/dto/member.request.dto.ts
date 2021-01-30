import { IsString } from 'class-validator';
import { Member } from '../../../domains/member/member.entity';

export class CreateAccountRequest {
  @IsString()
  private readonly email: string;

  @IsString()
  private readonly name: string;

  @IsString()
  private readonly profileUrl: string;

  constructor(email: string, name: string, profileUrl: string) {
    this.email = email;
    this.name = name;
    this.profileUrl = profileUrl;
  }

  public toEntity(): Member {
    return Member.newInstance(this.email, this.name, this.profileUrl);
  }

  public getEmail(): string {
    return this.email;
  }
}
