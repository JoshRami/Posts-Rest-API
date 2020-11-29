import { Router } from 'express';

export const tagRouter = Router();

tagRouter.route('/').get().post();
