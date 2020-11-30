import { Router } from 'express';
import { BlogController } from '../controllers/blogs.controller';

export const blogRouter = Router();

const blogController = new BlogController();
const { getBlogs, getBlog, createBlog, deleteBlog } = blogController;

blogRouter.route('/').get(getBlogs).post(createBlog);
blogRouter.route('/:blogId').get(getBlog).delete(deleteBlog);
