'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.advisors = exports.campaignImages = exports.campaignText = exports.campaignContent = exports.campaigns = exports.nonProfits = exports.sequelize = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_SCHEMA, DB_PORT } = _dotenv2.default.config().parsed;

const sequelize = exports.sequelize = new _sequelize2.default(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: DB_SCHEMA,
  port: DB_PORT,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: false,
  dialectOptions: {
    ssl: 0
  }
});

const nonProfits = exports.nonProfits = sequelize.define('nonprofits', {
  nonprofitId: {
    type: _sequelize2.default.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'nonprofit_id'
  },
  name: {
    type: _sequelize2.default.STRING(75),
    allowNull: false,
    field: 'name'
  },
  address: {
    type: _sequelize2.default.STRING(75),
    allowNull: false,
    field: 'address'
  },
  city: {
    type: _sequelize2.default.STRING(75),
    allowNull: false,
    field: 'city'
  },
  state: {
    type: _sequelize2.default.STRING(75),
    allowNull: false,
    field: 'state'
  },
  zip: {
    type: _sequelize2.default.INTEGER(11),
    allowNull: false,
    field: 'zip'
  },
  ein: {
    type: _sequelize2.default.INTEGER(11),
    allowNull: false,
    unique: true,
    field: 'ein'
  }
}, {
  tableName: 'nonprofits'
});

const campaigns = exports.campaigns = sequelize.define('campaigns', {
  campaignId: {
    type: _sequelize2.default.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'campaign_id'
  },
  name: {
    type: _sequelize2.default.STRING(100),
    allowNull: false,
    unique: true,
    field: 'name'
  },
  nonprofitId: {
    type: _sequelize2.default.INTEGER(11),
    allowNull: false,
    field: 'nonprofit_id'
  },
  length: {
    type: _sequelize2.default.INTEGER(11),
    allowNull: false,
    field: 'length'
  },
  fundingNeeded: {
    type: _sequelize2.default.DECIMAL,
    allowNull: false,
    field: 'funding_needed'
  },
  donationsMade: {
    type: _sequelize2.default.DECIMAL,
    allowNull: false,
    field: 'donations_made'
  },
  startDate: {
    type: _sequelize2.default.DATE,
    allowNull: true,
    field: 'start_date'
  },
  endDate: {
    type: _sequelize2.default.DATE,
    allowNull: true,
    field: 'end_date'
  }
}, {
  tableName: 'campaigns'
});

const campaignContent = exports.campaignContent = sequelize.define('campaign_content', {
  content_id: {
    type: _sequelize2.default.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  campaign_id: {
    type: _sequelize2.default.INTEGER(11),
    allowNull: false
  },
  content_status: {
    type: _sequelize2.default.STRING(75),
    allowNull: false
  },
  created_date: {
    type: _sequelize2.default.DATE,
    allowNull: false
  },
  createdAt: {
    type: _sequelize2.default.DATE,
    allowNull: false
  },
  updatedAt: {
    type: _sequelize2.default.DATE,
    allowNull: false
  }
}, {
  tableName: 'campaign_content'
});

const campaignText = exports.campaignText = sequelize.define('campaign_text', {
  text_id: {
    type: _sequelize2.default.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  content_id: {
    type: _sequelize2.default.INTEGER(11),
    allowNull: false
  },
  content_position: {
    type: _sequelize2.default.INTEGER(11),
    allowNull: false
  },
  text_type: {
    type: _sequelize2.default.STRING(45),
    allowNull: false
  },
  text: {
    type: _sequelize2.default.TEXT,
    allowNull: false
  },
  createdAt: {
    type: _sequelize2.default.DATE,
    allowNull: false
  },
  updatedAt: {
    type: _sequelize2.default.DATE,
    allowNull: false
  }
}, {
  tableName: 'campaign_text'
});

const campaignImages = exports.campaignImages = sequelize.define('campaign_images', {
  img_id: {
    type: _sequelize2.default.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  content_id: {
    type: _sequelize2.default.INTEGER(11),
    allowNull: false
  },
  content_position: {
    type: _sequelize2.default.INTEGER(11),
    allowNull: false
  },
  image_type: {
    type: _sequelize2.default.STRING(45),
    allowNull: false
  },
  src: {
    type: _sequelize2.default.STRING(99),
    allowNull: false
  },
  alt: {
    type: _sequelize2.default.STRING(45),
    allowNull: false
  },
  createdAt: {
    type: _sequelize2.default.DATE,
    allowNull: false
  },
  updatedAt: {
    type: _sequelize2.default.DATE,
    allowNull: false
  }
}, {
  tableName: 'campaign_images'
});

const advisors = exports.advisors = sequelize.define('advisors', {
  advisorId: {
    type: _sequelize2.default.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'advisor_id'
  },
  firstName: {
    type: _sequelize2.default.STRING(75),
    allowNull: false,
    field: 'first_name'
  },
  lastName: {
    type: _sequelize2.default.STRING(75),
    allowNull: false,
    field: 'last_name'
  },
  email: {
    type: _sequelize2.default.STRING(100),
    allowNull: false,
    unique: true,
    field: 'email'
  },
  position: {
    type: _sequelize2.default.STRING(75),
    allowNull: false,
    field: 'position'
  },
  yearsExperience: {
    type: _sequelize2.default.DECIMAL,
    allowNull: false,
    field: 'years_experience'
  },
  advisorStatus: {
    type: _sequelize2.default.STRING(75),
    allowNull: false,
    field: 'advisor_status'
  },
  nonprofitId: {
    type: _sequelize2.default.INTEGER(11),
    allowNull: true,
    unique: true,
    field: 'nonprofit_id'
  }
}, {
  tableName: 'advisors'
});

nonProfits.hasMany(campaigns, { foreignKey: 'nonprofit_id' });
campaigns.hasMany(campaignContent, { foreignKey: 'campaign_id' });
campaignContent.hasMany(campaignImages, { foreignKey: 'content_id' });
campaignContent.hasMany(campaignText, { foreignKey: 'content_id' });

sequelize.sync();
//# sourceMappingURL=db.js.map