import { createConnection } from 'typeorm';
import { App } from './app';

(async () => {
  try {
    await createConnection();
    const app = new App();
    app.bootstrap();
  } catch (error) {
    console.error(error);
  }
})();
