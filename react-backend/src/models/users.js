import * as db from './db';
import encryptPass from '../utils/encryptPass';

export const findUser = (email, success, error) => {
  db.users.find({
    where: {
      email,
    },
  }).then(results => success(results)).catch(e => error(e));
};

export const addDonor = (data, success, error) => {
  findUser(data.email,
    (results) => {
      if (results !== null) {
        error(`${results.email} is already being used.`);
      } else {
        const newUser = data;
        newUser.password = encryptPass(newUser.password);
        newUser.passwordDate = new Date();

        db.users.create(newUser).then(response => success(response)).catch(e => error(e));
      }
    },
    e => error(e),
  );
};

const findNonProfit = (ein, success, error) => {
  db.nonProfits.find({ where: { ein } })
    .then(results => success(results))
    .catch(e => error(e));
};

const addNonProfit = (nonProfitData, success, error) => {
  db.nonProfits.create(nonProfitData)
    .then(nonProfit => success(nonProfit))
    .catch(e => error(e));
};

const addNonProfitUserInfo = (nonProfitUserData, success, error) => {
  db.usersNonProfit.create(nonProfitUserData)
    .then(nonProfitUser => success(nonProfitUser))
    .catch(e => error(e));
};

export const addNonProfitUser = (userData, userPosition, nonProfitData, success, error) => {
  findUser(userData.email,
    (results) => {
      if (results !== null) {
        error(`${results.email} is already being used.`);
      } else {
        const newUser = userData;
        newUser.password = encryptPass(newUser.password);
        newUser.passwordDate = new Date();

        db.sequelize.transaction(() => {
          db.users.create(newUser).then((user) => {
            findNonProfit(nonProfitData.ein,
              (r) => {
                if (r !== null) {
                  const nonProfitUserInfo = {
                    userId: user.dataValues.userId,
                    position: userPosition,
                    nonprofitId: r.dataValues.nonprofitId,
                  };

                  return addNonProfitUserInfo(nonProfitUserInfo,
                    res => success(res),
                    (e) => { throw new Error(e); });
                }
                return addNonProfit(nonProfitData, (nonprofit) => {
                  const nonProfitUserInfo = {
                    userId: user.dataValues.userId,
                    position: userPosition,
                    nonprofitId: nonprofit.dataValues.nonprofitId,
                  };

                  return addNonProfitUserInfo(nonProfitUserInfo,
                    res => success(res),
                    (e) => { throw new Error(e); });
                },
                (e) => {
                  throw new Error(e);
                },
                );
              },
              (e) => {
                throw new Error(e);
              });
          }).catch((e) => {
            throw new Error(e);
          });
        }).catch((e) => { throw new Error(e); });
      }
    },
    (e) => { throw new Error(e); },
  );
};

export const update = (data, success, error) => {
  console.log('This is where we will update the user.');
};
