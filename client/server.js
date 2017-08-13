import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import logger from 'morgan';
import fs from 'fs';
import https from 'https';

const { PORT = 3001, STATUS, HOST = '0.0.0.0' } = dotenv.config().parsed;

const app = express();

if (STATUS !== undefined) {
  app.use(logger(STATUS));
}

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  console.log('test');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

https.createServer({
  key: fs.readFileSync('./private.key'),
  cert: fs.readFileSync('./certificate.pem'),
}, app).listen(PORT, HOST, () => {
  console.log(`Design Bright site running on ${HOST}:${PORT}.`);
},
);
