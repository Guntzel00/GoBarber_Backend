import express, { json } from 'express';
import 'reflect-metadata';
import routes from './routes';
import './database/index';

const app = express();
app.use(json());
app.use(routes);

app.listen(3333, () => {
  console.log('🚀 Backend is on!');
});
