import { Column, Entity } from 'typeorm';
import { CoreEntity } from '../base.entity';

@Entity()
export class User extends CoreEntity {
  @Column({ nullable: false })
  private email: string;

  @Column({ nullable: false })
  private name: string;

  @Column({ nullable: true })
  private profileUrl: string;

  constructor(email: string, name: string, profileUrl: string) {
    super();
    this.email = email;
    this.name = name;
    this.profileUrl = profileUrl;
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
