import express, { json, Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import 'reflect-metadata';

import uploadConfig from './config/upload';
import routes from './routes';
import AppError from './errors/AppError';
import './database/index';

const app = express();
app.use(json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.log(error);

    response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('🚀 Backend is on!');
});
