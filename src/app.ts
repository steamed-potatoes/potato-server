import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import { Container } from 'typedi';
import {
  useExpressServer,
  useContainer as routingUseContainer,
} from 'routing-controllers';
import createDatabaseConnection from '@src/config/database';
import { routingControllerOptions } from '@src/config/routing';
import { useSwagger } from '@src/config/swagger';
import logger from '@src/config/logger';

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
      useSwagger(this.app);
      this.app.listen(port, () => {
        console.log(`
          ################################################
          🛡️  Server listening on port: ${port} - ${process.env.NODE_ENV}
          ################################################
          `);
      });
    } catch (error) {
      logger.error(error);
    }
  }
}
