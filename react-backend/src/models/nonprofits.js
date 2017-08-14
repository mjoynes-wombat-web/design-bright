import * as db from './db';

export const findNonProfit = (ein, success, error) => {
  db.nonProfits.find({ where: { ein } })
    .then(results => success(results))
    .catch(e => error(e));
};

export const addNonProfit = (nonProfitData, success, error) => {
  findNonProfit(nonProfitData.ein,
    (findResults) => {
      if (findResults !== null) {
        const nonProfit = findResults;
        nonProfit.status = 200;
        return success(nonProfit);
      }
      db.nonProfits.create(nonProfitData)
        .then(
          (createResults) => {
            const nonProfit = createResults;
            nonProfit.status = 201;
            return success(nonProfit);
          })
        .catch(createError => error(createError));
    },
    error);
};
