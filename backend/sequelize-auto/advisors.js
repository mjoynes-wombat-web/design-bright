/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('advisors', {
    advisor_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    position: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    years_experience: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    advisor_status: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    nonprofit_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'nonprofits',
        key: 'nonprofit_id'
      },
      unique: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'advisors'
  });
};
