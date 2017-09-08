/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('campaigns', {
    campaign_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nonprofit_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'nonprofits',
        key: 'nonprofit_id'
      }
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    length: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    funding_needed: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    donations_made: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: '0'
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true
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
    tableName: 'campaigns'
  });
};
