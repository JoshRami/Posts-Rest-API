import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

import handlers from './handlers/index';
import { blogRouter } from './routes/blogs.router';
import { commentRouter } from './routes/comments.router';
import { tagRouter } from './routes/tags.router';

export class App {
  server: express.Express;
  constructor() {
    this.server = express();
    this.setMiddleWares();
    this.setRoutes();
    this.setHandlers();
  }
  setRoutes() {
    this.server.use('/api/v1/blogs', blogRouter);
    this.server.use('/api/v1/blogs/:blogId/comments', commentRouter);
    this.server.use('/api/v1/blogs/:blogId/tags', tagRouter);
  }
  setMiddleWares() {
    this.server.use(express.json());
    this.server.use(helmet());
    if (this.server.get('env') === 'development') {
      this.server.use(morgan('tiny'));
    }
  }
  setHandlers() {
    handlers.forEach((handler) => {
      this.server.use(handler);
    });
  }
  listen() {
    const PORT = process.env.PORT || 4000;
    this.server.listen(PORT, () => {
      console.info(`app.server listening on PORT: ${PORT}`);
    });
  }
}
