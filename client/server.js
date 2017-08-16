import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import logger from 'morgan';
import fs from 'fs';
import http from 'http';
import https from 'https';

const { HTTP_PORT = 3001, HTTPS_PORT = 3002, STATUS, HOST = '0.0.0.0' } = dotenv.config().parsed;

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

http.createServer((req, res) => {
  console.log('HTTP redirects to HTTPS');
  const hostname = (req.headers.host.match(/:/g)) ? req.headers.host.slice(0, req.headers.host.indexOf(':')) : req.headers.host;
  const redirect = `https://${hostname}:${HTTPS_PORT}${req.url}`;
  console.log(redirect);
  res.writeHead(301, { Location: redirect });
  res.end();
}).listen(HTTP_PORT, HOST);

https.createServer({
  key: fs.readFileSync('./private.key'),
  cert: fs.readFileSync('./certificate.pem'),
}, app).listen(HTTPS_PORT, HOST, () => {
  console.log(`Design Bright site running on ${HOST}:${HTTPS_PORT}.`);
},
);
