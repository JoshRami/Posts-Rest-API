import { NextFunction, Request, Response } from 'express';
import HttpException from './exception';

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json({ data: 'endpoint not found' });
};

function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const status = error.status || 500;
  const messages = error.messages || ['Something bad happened'];
  response.status(status).json({
    status,
    messages,
  });
}

export default [notFound, errorMiddleware];
