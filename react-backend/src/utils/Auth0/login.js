import auth0 from 'auth0-js';
import dotenv from 'dotenv';

const { AUTH0_DOMAIN, AUTH0_CLIENT_ID } = dotenv.config().parsed;

const webAuth = new auth0.WebAuth({
  domain: AUTH0_DOMAIN,
  clientID: AUTH0_CLIENT_ID,
});

const login = (username, password) => {
  webAuth.client.login({
    realm: 'Username-Password-Authentication',
    username,
    password,
    scope: 'user_metadata',
  }, (err, authResults) => {
    if (err) {
      throw new Error(err);
    }

    webAuth.client.userInfo(authResults.accessToken, (userErr, user) => {
      if (userErr) {
        throw new Error(userErr);
      }
      return user;
    });
  });
};

console.log(login('test@gmail.com', 'asdf'));

export default login;
