import App from './app';

try {
  const app = new App();
  const port: number = 8000;
  app.runServer(port);
} catch (error) {
  console.error(error);
}
