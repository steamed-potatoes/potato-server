import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import { Container } from 'typedi';
import {
  useExpressServer,
  useContainer as routingUseContainer,
  createExpressServer,
} from 'routing-controllers';
import createDatabaseConnection from './config/database';
import { routingControllerOptions } from './config/routing';

export default class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.setUpDataBase();
    this.setUpMiddleWares();
  }

  private async setUpDataBase(): Promise<void> {
    try {
      await createDatabaseConnection();
    } catch (error) {
      console.error(error);
    }
  }

  private setUpMiddleWares(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  public async runServer(port: number): Promise<void> {
    try {
      routingUseContainer(Container);
      useExpressServer(this.app, routingControllerOptions);
      createExpressServer({
        defaultErrorHandler: false,
      }).listen(port, () => {
        console.log(`
        ################################################
        🛡️  Server listening on port: ${port} - ${process.env.NODE_ENV}
        ################################################
        `);
      });
    } catch (error) {
      console.error(error);
    }
  }
}
