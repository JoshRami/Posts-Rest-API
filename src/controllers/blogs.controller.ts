import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Blog } from '../entity/blogs';
import HttpException from '../handlers/exception';
import { getErrorMessages } from '../helpers/input.error';

export class BlogController {
  async getBlogs(request: Request, response: Response, next: NextFunction) {
    const repository = getRepository(Blog);
    const data = await repository.find({ order: { creationDate: 'DESC' } });
    if (!data.length) {
      return next(new HttpException(404, ['Blogs not found']));
    }
    response.status(200).json({ data });
  }

  async getBlog(request: Request, response: Response, next: NextFunction) {
    const repository = getRepository(Blog);
    const { blogId } = request.params;
    const blog = await repository.findOne(blogId);
    response.status(200).json({ data: blog });
  }

  async updateBlog(request: Request, response: Response, next: NextFunction) {
    const repository = getRepository(Blog);

    const { blogId } = request.params;
    const { title, content } = request.body;

    const blog = await repository.findOne(blogId);

    blog.title = title;
    blog.content = content;

    const errors = await validate(blog);
    const errorMessages = getErrorMessages(errors);

    if (errorMessages.length) {
      return next(new HttpException(400, errorMessages));
    }
    const updated = await repository.save(blog);
    response.status(200).json({ data: updated });
  }

  async createBlog(request: Request, response: Response, next: NextFunction) {
    const repository = getRepository(Blog);
    const { content, title } = request.body;
    const blog = new Blog();
    blog.content = content;
    blog.title = title;

    const errors = await validate(blog);
    const errorMessages = getErrorMessages(errors);

    if (errorMessages.length) {
      return next(new HttpException(400, errorMessages));
    }
    const newBlog = await repository.create(blog);
    const data = await repository.save(newBlog);

    response.status(201).json({ data });
  }

  async deleteBlog(request: Request, response: Response, next: NextFunction) {
    const repository = getRepository(Blog);
    const { blogId } = request.params;
    const blog = await repository.findOne(blogId);

    const { affected } = await repository.delete(blog.id);
    if (affected === 0) {
      return next(
        new HttpException(500, ['Server error while deleting the blog'])
      );
    }
    response.status(204).end();
  }
}
