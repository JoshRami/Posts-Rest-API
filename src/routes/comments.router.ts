import { Router } from 'express';

export const commentRouter = Router();

commentRouter.route('/').get().post();
