import axios from 'axios';
import dotenv from 'dotenv';
import auth0 from 'auth0-js';

const { AUTH0_API_ID, AUTH0_API_SECRET, AUTH0_DOMAIN, AUTH0_CLIENT_ID } = dotenv.config().parsed;

const clientWebAuth = new auth0.WebAuth({
  domain: AUTH0_DOMAIN,
  clientID: AUTH0_CLIENT_ID,
});


export const createNewUser = (
  { email, password, user_metadata, app_metadata },
) => {
  axios.post(
    'https://designbright.auth0.com/oauth/token',
    {
      client_id: AUTH0_API_ID,
      client_secret: AUTH0_API_SECRET,
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
          name: email,
          password,
          user_metadata,
          app_metadata: {
            userType: app_metadata.userType,
            nonProfitID: app_metadata.nonProfitID,
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

export const getUserInfo = (accessToken) => {
  clientWebAuth.client.userInfo(accessToken, (userErr, user) => {
    if (userErr) {
      throw new Error(userErr);
    }
    console.log(user);
  });
};
