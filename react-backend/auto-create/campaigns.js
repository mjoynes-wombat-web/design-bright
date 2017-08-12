/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('campaigns', {
		campaignId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'campaign_id'
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true,
			field: 'name'
		},
		nonprofitId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'nonprofits',
				key: 'nonprofit_id'
			},
			field: 'nonprofit_id'
		},
		length: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'length'
		},
		fundingNeeded: {
			type: DataTypes.DECIMAL,
			allowNull: false,
			field: 'funding_needed'
		},
		donationsMade: {
			type: DataTypes.DECIMAL,
			allowNull: false,
			field: 'donations_made'
		},
		startDate: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'start_date'
		},
		endDate: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'end_date'
		}
	}, {
		tableName: 'campaigns'
	});
};
