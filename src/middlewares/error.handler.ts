import {
  BadRequestError,
  ExpressErrorMiddlewareInterface,
  HttpError,
  Middleware,
} from 'routing-controllers';
import * as express from 'express';
import { Service } from 'typedi';

@Middleware({ type: 'after' })
@Service()
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  public error(
    error: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) {
    let responseObject = {} as any;

    // class-validator custom Handler
    if (error instanceof BadRequestError) {
      res.status(400);
      responseObject.statusCode = 400;
      responseObject.name = 'BAD_REQUEST_EXCEPTION';
      responseObject.message =
        Object.values(error['errors'][0]['constraints'])[0] || null;
    } else {
      // set http status
      if (error instanceof HttpError && error.httpCode) {
        res.status(error.httpCode);
      } else {
        res.status(500);
      }

      if (error instanceof HttpError) {
        if (error.httpCode) {
          responseObject.statusCode = error.httpCode;
        }
        if (error.name) {
          responseObject.name = error.name;
        }
        if (error.message) {
          responseObject.message = error.message;
        }
      } else if (typeof error === 'string') {
        responseObject.message = error;
      }
    }

    // 로깅
    // console.error(error);
    res.json(responseObject);
  }
}
