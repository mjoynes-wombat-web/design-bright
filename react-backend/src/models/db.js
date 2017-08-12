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

export const users = sequelize.define('users', {
  userId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'user_id',
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
  userTypeId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'user_types',
      key: 'id',
    },
    field: 'user_type_id',
  },
  password: {
    type: Sequelize.STRING(75),
    allowNull: false,
    field: 'password',
  },
  passwordDate: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'password_date',
  },
  profileImgUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
    field: 'profile_img_url',
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'createdAt',
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'updatedAt',
  },
},
{
  tableName: 'users',
});

export const userTypes = sequelize.define('user_types',
  {
    name: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  },
);

export const usersNonProfit = sequelize.define('users_nonprofits',
  {
    position: {
      type: Sequelize.STRING,
    },
    nonprofit_id: {
      type: Sequelize.INTEGER,
    },
  },
);

export const nonprofits = sequelize.define('nonprofits',
  {
    name: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    state_id: {
      type: Sequelize.INTEGER,
    },
    zip: {
      type: Sequelize.INTEGER,
    },
    ein: {
      type: Sequelize.INTEGER,
    },
  },
);

sequelize.sync();
