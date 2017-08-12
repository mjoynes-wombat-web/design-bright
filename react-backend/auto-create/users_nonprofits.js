/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('usersNonprofits', {
		usersNonprofitId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'users_nonprofit_id'
		},
		position: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'position'
		},
		nonprofitId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'nonprofit_id'
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'createdAt'
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'updatedAt'
		}
	}, {
		tableName: 'users_nonprofits'
	});
};
