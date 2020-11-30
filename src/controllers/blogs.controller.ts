import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Blog } from '../entity/blogs';
import HttpException from '../handlers/exception';

export class BlogController {
  async getBlogs(request: Request, response: Response, next: NextFunction) {
    const repository = getRepository(Blog);
    const data = await repository.find({ order: { creationDate: 'DESC' } });
    if (!data.length) {
      return new HttpException(404, ['Blogs not found']);
    }
    response.status(200).json(data);
  }

  async getBlog(request: Request, response: Response, next: NextFunction) {
    const repository = getRepository(Blog);
    const { blogId } = request.params;

    if (!Number(blogId)) {
      return next(
        new HttpException(400, ['Invalid id for blog have been provided'])
      );
    }
    const blog = await repository.findOne(blogId);
    if (!blog) {
      return next(new HttpException(404, ['Blog have not been found']));
    }
    response.status(200).json({ data: blog });
  }

  async createBlog(request: Request, response: Response, next: NextFunction) {
    const repository = getRepository(Blog);
    const { content, title } = request.body;
    const blog = new Blog();
    blog.content = content;
    blog.title = title;

    const errors = await validate(blog);
    if (errors.length) {
      const errorMessages: string[] = [];
      errors.forEach((error) => {
        errorMessages.push(...Object.values(error.constraints));
      });

      return next(new HttpException(400, errorMessages));
    }
    const newBlog = await repository.create(blog);
    const result = await repository.save(newBlog);

    response.status(201).json({ data: result });
  }

  async deleteBlog(request: Request, response: Response, next: NextFunction) {
    const repository = getRepository(Blog);
    const { blogId } = request.params;

    if (!Number(blogId)) {
      return next(
        new HttpException(400, ['Invalid id for blog have been provided'])
      );
    }
    const blog = await repository.findOne(blogId);
    if (!blog) {
      return next(new HttpException(404, ['Blog to delete not exist']));
    }
    const { affected } = await repository.delete(blog.id);
    if (affected === 0) {
      return next(
        new HttpException(500, ['Server error while deleting the blog'])
      );
    }
    response.status(204).send();
  }
}
