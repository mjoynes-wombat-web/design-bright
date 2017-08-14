import axios from 'axios';
import dotenv from 'dotenv';

const { AUTH0_API_ID, AUTH0_API_SECRECT } = dotenv.config().parsed;


const createNewUser = ({ email, name, password, firstName, lastName, position, userType, nonProfitID }) => {
  axios.post(
    'https://designbright.auth0.com/oauth/token',
    {
      client_id: AUTH0_API_ID,
      client_secret: AUTH0_API_SECRECT,
      audience: 'https://designbright.auth0.com/api/v2/',
      grant_type: 'client_credentials',
    },
    { 'content-type': 'application/json' })
    .then((results) => {
      axios.post(
        'https://designbright.auth0.com/api/v2/users',
        {
          connection: 'Username-Password-Authentication',
          email,
          name,
          password,
          user_metadata: {
            firstName,
            lastName,
            passwordDate: new Date(),
            position,
          },
          app_metadata: {
            userType,
            nonProfitID,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${results.data.access_token}`,
            'content-type': 'application/json',
          },
        })
        .then((newUser) => {
          console.log(newUser);
        })
        .catch(userErr => console.log(userErr));
    })
    .catch(err => err);
};

export default createNewUser;
