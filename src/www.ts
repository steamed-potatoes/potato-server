import App from '@src/app';
import config from '@src/config';
import logger from '@src/config/logger';

try {
  const app = new App();
  const port: number = Number(config.server.port);
  app.runServer(port);
} catch (error) {
  logger.error(error);
}
