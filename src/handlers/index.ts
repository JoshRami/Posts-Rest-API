import { NextFunction, Request, Response } from 'express';
import HttpException from './exception';

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json({
    message: `endpoint ${req.url} with method: ${req.method} not found`,
  });
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
