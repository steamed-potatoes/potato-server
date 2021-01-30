import App from './app';
import config from './config';
import logger from 'morgan';

try {
  const app = new App();
  const port: number = Number(config.server.port);
  app.runServer(port);
} catch (error) {
  logger.error(error);
}
