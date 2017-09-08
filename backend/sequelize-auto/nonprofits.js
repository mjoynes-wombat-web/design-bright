/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nonprofits', {
    nonprofit_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    zip: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    ein: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
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
    tableName: 'nonprofits'
  });
};
