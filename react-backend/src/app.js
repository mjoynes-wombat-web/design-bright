// Import Dependencies
import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import BodyParser from 'body-parser';
import fs from 'fs';
import https from 'https';

// Import Routes
import users from './routes/users';
import nonprofits from './routes/nonprofits';
import campaigns from './routes/campaigns';
import advisor from './routes/advisor';
import help from './routes/help';

// Grabbing Environment Variables
const { API_PORT = 3000, STATUS, HOST = '0.0.0.0' } = dotenv.config().parsed;


// Setting up the express application.
const app = express();

// Setting the morgan logger to the development status if it exists
if (STATUS !== undefined) {
  app.use(logger(STATUS));
}

const whitelist = [
  'https://192.168.86.200:3002',
  'https://192.168.1.9:3002',
  'https://165.227.7.212:437',
  'http://165.227.7.212:80',
  'https://www.designbright.com',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.use(BodyParser.json());

// Setting up the API routes.
app.use('/api/users', users);
app.use('/api/nonprofits', nonprofits);
app.use('/api/campaigns', campaigns);
app.use('/api/advisor', advisor);
app.use('/api/help', help);

https.createServer({
  key: fs.readFileSync('./private.key'),
  cert: fs.readFileSync('./certificate.pem'),
}, app).listen(API_PORT, HOST, () => {
  console.log(`Design Bright API running on ${HOST}:${API_PORT}.`);
},
);
