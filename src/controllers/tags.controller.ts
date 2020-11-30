import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Tag } from '../entity/tags';
import HttpException from '../handlers/exception';
import { Blog } from '../entity/blogs';
import { getErrorMessages } from '../helpers/input.error';

export class TagController {
  async createTag(request: Request, response: Response, next: NextFunction) {
    try {
      const blogRepo = getRepository(Blog);
      const { blogId } = request.params;

      const tagRepo = getRepository(Tag);
      const { tag } = request.body;

      const blog = await blogRepo.findOne(blogId, { relations: ['tags'] });

      const tagEntity = new Tag();
      tagEntity.tag = tag;

      const errors = await validate(tagEntity);
      const errorMessages = getErrorMessages(errors);
      if (errorMessages.length) {
        return next(new HttpException(400, errorMessages));
      }

      blog.tags = [...blog.tags, tagEntity];
      const newTag = await tagRepo.save(tagEntity);
      await blogRepo.save(blog);

      response.status(201).json({ data: newTag });
    } catch (error) {
      return next(new HttpException(500, [error.message]));
    }
  }
}
