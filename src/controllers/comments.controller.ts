import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Comment } from '../entity/comments';
import HttpException from '../handlers/exception';
import { Blog } from '../entity/blogs';
import { getErrorMessages } from '../helpers/input.error';

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
    const errorMessages = getErrorMessages(errors);
    if (errorMessages.length) {
      return next(new HttpException(400, errorMessages));
    }

    const newComment = await commentRepo.save(commentEntity);
    response
      .status(201)
      .json({ data: { id: newComment.id, comment: newComment.comment } });
  }
}
