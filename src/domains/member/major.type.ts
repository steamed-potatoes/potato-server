import { ValidationException } from '@src/common/exceptions/custom.exceptions';

export enum Major {
  IT_COMPUTER_ENGINEER = 'IT학부, 컴퓨터공학과',
  IT_ICT = 'IT학부, ICT융합학과',
  MUSIC = '예술학부, 관현악과, 성악과, 피아노과',
}

export class MajorType {
  public static of(code: string): Major {
    this.validateMajorCode(code);
    return Major[code];
  }

  private static validateMajorCode = (code: string) => {
    if (!(code in Major)) {
      throw new ValidationException(`잘못된 학과 코드(${code}) 입니다.`);
    }
  };
}
