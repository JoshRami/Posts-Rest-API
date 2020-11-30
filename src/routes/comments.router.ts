import { Router } from 'express';

import { CommentController } from '../controllers/comments.controller';
import { validateBlog } from '../helpers/blog.validator';

export const commentRouter = Router({ mergeParams: true });
const commentController = new CommentController();
const { createComment } = commentController;

commentRouter.use(validateBlog);
commentRouter.route('/').post(createComment);
