/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('campaign_images', {
    img_id: {
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
    content_position: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    image_type: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    src: {
      type: DataTypes.STRING(99),
      allowNull: false
    },
    alt: {
      type: DataTypes.STRING(45),
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
    tableName: 'campaign_images'
  });
};
