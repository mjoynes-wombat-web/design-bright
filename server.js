import dotenv from 'dotenv';
import apiRouter from './api';
import express from 'express';

const server = express();
const { PORT = 3000, HOST = '0.0.0.0' } = dotenv.config().parsed;

server.use('/api', apiRouter);

server.listen(PORT, HOST, () => {
  console.info(`Express listening on port ${PORT}`);
});
