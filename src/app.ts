import express from 'express';

export default class App {
  private app: express.Application;

  constructor() {
    this.app = express();
  }

  public async runServer(port: number): Promise<void> {
    try {
      this.app.listen(port, () => {
        console.log(`
              ################################################
              🛡️  Server listening on port: ${port}
              ################################################
              `);
      });
    } catch (error) {
      console.error(error);
    }
  }
}
