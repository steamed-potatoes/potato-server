import { v4 as uuid } from 'uuid';

export class UuidUtils {
  private static readonly version: string = 'v1';

  public static newInstance(): string {
    return this.version + '-' + uuid();
  }
}
