import express from 'express';
import createDatabaseConnection from './config/database';

export default class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.setUpDataBase();
  }

  private async setUpDataBase(): Promise<void> {
    try {
      await createDatabaseConnection();
    } catch (error) {
      console.error(error);
    }
  }

  public async runServer(port: number): Promise<void> {
    try {
      this.app.listen(port, () => {
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
