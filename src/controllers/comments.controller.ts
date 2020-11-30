import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Comment } from '../entity/comments';
import HttpException from '../handlers/exception';
import { Blog } from '../entity/blogs';

export class CommentController {
  async createComment(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const blogRepo = getRepository(Blog);
    const { blogId } = request.params;

    const commentRepo = getRepository(Comment);
    const { comment } = request.body;

    const blog = await blogRepo.findOne(blogId);

    const commentEntity = new Comment();
    commentEntity.blog = blog;
    commentEntity.comment = comment;

    const errors = await validate(commentEntity);
    if (errors.length) {
      const errorMessages: string[] = [];
      errors.forEach((error) => {
        errorMessages.push(...Object.values(error.constraints));
      });

      return next(new HttpException(400, errorMessages));
    }
    const data = await commentRepo.save(commentEntity);
    response.status(201).json({ data });
  }
}
