'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addNonProfit = exports.findNonProfitByID = exports.findNonProfitByEIN = undefined;

var _db = require('./db');

var db = _interopRequireWildcard(_db);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const findNonProfitByEIN = exports.findNonProfitByEIN = (ein, success, error) => {
  db.nonProfits.find({ where: { ein } }).then(results => success(results)).catch(err => error(err));
};

const findNonProfitByID = exports.findNonProfitByID = (nonprofitId, success, error) => {
  db.nonProfits.find({ where: { nonprofitId } }).then(results => success(results)).catch(err => error(err));
};

const addNonProfit = exports.addNonProfit = (nonProfitData, success, error) => {
  findNonProfitByEIN(nonProfitData.ein, findResults => {
    if (findResults !== null) {
      const nonProfit = findResults;
      nonProfit.status = 200;
      return success(nonProfit);
    }
    db.nonProfits.create(nonProfitData).then(createResults => {
      const nonProfit = createResults;
      nonProfit.status = 201;
      return success(nonProfit);
    }).catch(createError => error(createError));
  }, error);
};
//# sourceMappingURL=nonprofits.js.map