import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import { Container } from 'typedi';
import {
  useContainer as routingUseContainer,
  useExpressServer,
} from 'routing-controllers';

routingUseContainer(Container);
const app = express();

function setExpress() {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  useExpressServer(app, {
    defaultErrorHandler: false,
    controllers: [
      `${__dirname}/../../src/controllers/*.controller{.ts,.js}`,
      `${__dirname}/../../src/controllers/*/*.controller{.ts,.js}`,
    ],
    middlewares: [`${__dirname}/../../src/middlewares/*{.ts,.js}`],
  });
}

setExpress();

export default app;
