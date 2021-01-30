import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import { Container } from 'typedi';
import {
  useContainer as routingUseContainer,
  useExpressServer,
} from 'routing-controllers';
import { routingControllerOptions } from '../../src/config/routing';

routingUseContainer(Container);
const app = express();

function setExpress() {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  useExpressServer(app, routingControllerOptions);
}

setExpress();

export default app;
