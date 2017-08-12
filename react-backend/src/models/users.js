import * as db from './db';
import encryptPass from '../utils/encryptPass';

export const add = (data, success, error) => {
  db.users.find({
    where: {
      email: data.email,
    },
  }).then((existingUser) => {
    if (existingUser !== null) {
      console.log(existingUser);
      error(`${existingUser.email} is already being used.`);
    } else {
      if (data.userTypeDonor) {
        const newUser = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          userTypeId: 1,
          password: encryptPass(data.password),
          passwordDate: new Date(),
          profileImgUrl: '',
        };
        console.log(newUser);

        db.users.create(newUser).then(test => success(test)).catch(error);
      } else if (data.userTypeNonProfit) {
        const newUser = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          userTypeId: 2,
          password: encryptPass(data.password),
          passwordDate: new Date(),
          profileImgUrl: '',
        };
      }
    }
  }).catch((e) => {
    console.log(e);
  });
};

export const update = (data, success, error) => {
  console.log('This is where we will update the user.');
};
