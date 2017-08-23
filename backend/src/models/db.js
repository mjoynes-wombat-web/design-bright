import Sequelize from 'sequelize';
import dotenv from 'dotenv';

const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_SCHEMA, DB_PORT } = dotenv.config().parsed;

export const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASS,
  {
    host: DB_HOST,
    dialect: DB_SCHEMA,
    port: DB_PORT,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    logging: false,
    dialectOptions: {
      ssl: 0,
    },
  },
);

export const nonProfits = sequelize.define('nonprofits',
  {
    nonprofitId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'nonprofit_id',
    },
    name: {
      type: Sequelize.STRING(75),
      allowNull: false,
      field: 'name',
    },
    address: {
      type: Sequelize.STRING(75),
      allowNull: false,
      field: 'address',
    },
    city: {
      type: Sequelize.STRING(75),
      allowNull: false,
      field: 'city',
    },
    state: {
      type: Sequelize.STRING(75),
      allowNull: false,
      field: 'state',
    },
    zip: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      field: 'zip',
    },
    ein: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      unique: true,
      field: 'ein',
    },
  }, {
    tableName: 'nonprofits',
  },
);

export const campaigns = sequelize.define('campaigns',
  {
    campaignId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'campaign_id',
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
      field: 'name',
    },
    nonprofitId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'nonprofits',
        key: 'nonprofit_id',
      },
      field: 'nonprofit_id',
    },
    length: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      field: 'length',
    },
    fundingNeeded: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      field: 'funding_needed',
    },
    donationsMade: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      field: 'donations_made',
    },
    startDate: {
      type: Sequelize.DATE,
      allowNull: true,
      field: 'start_date',
    },
    endDate: {
      type: Sequelize.DATE,
      allowNull: true,
      field: 'end_date',
    },
  },
  {
    tableName: 'campaigns',
  },
);

export const campaignImages = sequelize.define('campaign_images',
  {
    imageId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'image_id',
    },
    contentId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'campaign_content',
        key: 'content_id',
      },
      field: 'content_id',
    },
    imageDescription: {
      type: Sequelize.STRING(75),
      allowNull: false,
      field: 'image_description',
    },
    imageUrl: {
      type: Sequelize.TEXT,
      allowNull: false,
      field: 'image_url',
    },
  },
  {
    tableName: 'campaign_images',
  },
);

export const campaignContent = sequelize.define('campaign_content',
  {
    contentId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      field: 'content_id',
    },
    campaignId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'campaigns',
        key: 'campaign_id',
      },
      field: 'campaign_id',
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
      field: 'content',
    },
    contentStatus: {
      type: Sequelize.STRING(75),
      allowNull: false,
      field: 'content_status',
    },
    createdDate: {
      type: Sequelize.DATE,
      allowNull: false,
      field: 'created_date',
    },
  },
  {
    tableName: 'campaign_content',
  },
);

export const advisors = sequelize.define('advisors',
  {
    advisorId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'advisor_id',
    },
    firstName: {
      type: Sequelize.STRING(75),
      allowNull: false,
      field: 'first_name',
    },
    lastName: {
      type: Sequelize.STRING(75),
      allowNull: false,
      field: 'last_name',
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
      field: 'email',
    },
    position: {
      type: Sequelize.STRING(75),
      allowNull: false,
      field: 'position',
    },
    yearsExperience: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      field: 'years_experience',
    },
    advisorStatus: {
      type: Sequelize.STRING(75),
      allowNull: false,
      field: 'advisor_status',
    },
    nonprofitId: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      references: {
        model: 'nonprofits',
        key: 'nonprofit_id',
      },
      unique: true,
      field: 'nonprofit_id',
    },
  },
  {
    tableName: 'advisors',
  },
);

sequelize.sync();
