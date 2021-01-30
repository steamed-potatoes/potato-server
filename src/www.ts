import App from './app';
import config from './config';

try {
  const app = new App();
  const port: number = Number(config.server.port);
  app.runServer(port);
} catch (error) {
  console.error(error);
}
