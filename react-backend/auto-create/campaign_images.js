/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('campaignImages', {
		campaignImageId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'campaign_image_id'
		},
		contentId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'campaign_content',
				key: 'content_id'
			},
			field: 'content_id'
		},
		imageDescription: {
			type: DataTypes.STRING(75),
			allowNull: false,
			field: 'image_description'
		},
		imageUrl: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'image_url'
		}
	}, {
		tableName: 'campaign_images'
	});
};
