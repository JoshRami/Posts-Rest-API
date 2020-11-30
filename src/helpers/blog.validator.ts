import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import HttpException from '../handlers/exception';
import { Blog } from '../entity/blogs';

export const validateBlog = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const blogRepo = getRepository(Blog);
  const { blogId } = request.params;
  if (!Number(blogId)) {
    return next(
      new HttpException(400, ['Invalid id for blog have been provided'])
    );
  }
  const blog = await blogRepo.findOne(blogId);
  if (!blog) {
    return next(new HttpException(404, ['Blog have not been found']));
  }
  next();
};
