import {
  CreateDateColumn,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CoreEntity {
  @PrimaryColumn()
  @Generated('increment')
  private id: number;

  @CreateDateColumn()
  private createdAt: Date;

  @UpdateDateColumn()
  private updatedAt: Date;

  public getId(): number {
    return this.id;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
