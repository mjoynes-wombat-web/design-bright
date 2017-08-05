// Import Dependencies
import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';

// Import Routes
import users from './routes/users';
import campaigns from './routes/campaigns';
import advisor from './routes/advisor';
import help from './routes/help';

// Grabbing Environment Variables
const { PORT = 3001, STATUS } = dotenv.config().parsed;

// Setting up the express application.
const app = express();

// Setting the morgan logger to the development status if it exists
if (STATUS !== undefined) {
  app.use(logger(STATUS));
}

// Setting up the API routes.
app.use('/api/users', users);
app.use('/api/campaigns', campaigns);
app.use('/api/advisor', advisor);
app.use('/api/help', help);

// Starting the API server using the environment port.
app.listen(PORT, () => {
  console.log(`Design Bright API running on port ${PORT}.`);
},
);
