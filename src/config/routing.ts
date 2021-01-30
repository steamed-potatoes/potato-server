import { JwtTokenUtils } from '@src/common/utils/jwt/jwt.utils';
import { UnauthorizedException } from '@src/common/exceptions/custom.exceptions';
import { Action } from 'routing-controllers';

export const routingControllerOptions = {
  cors: true,
  defaultErrorHandler: false,
  controllers: [
    `${__dirname}/../controllers/*.controller{.ts,.js}`,
    `${__dirname}/../controllers/*/*.controller{.ts,.js}`,
  ],
  middlewares: [`${__dirname}/../middlewares/*{.ts,.js}`],

  authorizationChecker: async (action: Action) => {
    const token = action.request.headers['authorization'];
    JwtTokenUtils.decodeToken(token);
    return true;
  },

  currentUserChecker: (action: Action): number => {
    const token = action.request.headers['authorization'];
    if (!token || !token.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        '토큰이 만료되었습니다. 다시 로그인 해 주세요.'
      );
    }
    return JwtTokenUtils.decodeToken(token.split('Bearer ')[1]);
  },
};
