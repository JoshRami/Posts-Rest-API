import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Tag } from '../entity/tags';
import HttpException from '../handlers/exception';
import { Blog } from '../entity/blogs';

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
      if (errors.length) {
        const errorMessages: string[] = [];
        errors.forEach((error) => {
          errorMessages.push(...Object.values(error.constraints));
        });

        return next(new HttpException(400, errorMessages));
      }

      const newTag = await tagRepo.save(tagEntity);
      blog.tags = [...blog.tags, newTag];

      await blogRepo.save(blog);

      response.status(201).json({ data: { newTag, blog } });
    } catch (error) {
      console.log(error);
    }
  }
}
