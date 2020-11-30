import { createConnection } from 'typeorm';
import { App } from './app';

(async () => {
  await createConnection();
  const app = new App();
  app.bootstrap();
})();
