import express, { json } from 'express';
import 'reflect-metadata';

import routes from './routes';
import './database/index';
import uploadConfig from './config/upload';

const app = express();
app.use(json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, () => {
  console.log('🚀 Backend is on!');
});
