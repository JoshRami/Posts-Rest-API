import { Router } from 'express';
import { BlogController } from '../controllers/blogs.controller';
import { validateBlog } from '../helpers/blog.validator';

export const blogRouter = Router();

const blogController = new BlogController();
const {
  getBlogs,
  getBlog,
  createBlog,
  deleteBlog,
  updateBlog,
} = blogController;

blogRouter.route('/').get(getBlogs).post(createBlog);
blogRouter
  .route('/:blogId')
  .all(validateBlog)
  .get(getBlog)
  .put(updateBlog)
  .delete(deleteBlog);
