import { Router } from 'express';

import { TagController } from '../controllers/tags.controller';
import { validateBlog } from '../helpers/blog.validator';

export const tagRouter = Router({ mergeParams: true });

const tagController = new TagController();
const { createTag } = tagController;

tagRouter.use(validateBlog);
tagRouter.route('/').post(createTag);
