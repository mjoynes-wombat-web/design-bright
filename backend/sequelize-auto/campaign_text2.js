/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('campaign_text2', {
    text_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    content_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'campaign_content',
        key: 'content_id'
      }
    },
    position: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    kind: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    is_void: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    nodes: {
      type: DataTypes.TEXT,
      allowNull: false
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
    tableName: 'campaign_text2'
  });
};
