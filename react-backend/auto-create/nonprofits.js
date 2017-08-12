/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('nonprofits', {
		nonprofitId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'nonprofit_id'
		},
		name: {
			type: DataTypes.STRING(75),
			allowNull: false,
			field: 'name'
		},
		address: {
			type: DataTypes.STRING(75),
			allowNull: false,
			field: 'address'
		},
		city: {
			type: DataTypes.STRING(75),
			allowNull: false,
			field: 'city'
		},
		stateId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'states',
				key: 'state_id'
			},
			field: 'state_id'
		},
		zip: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'zip'
		},
		ein: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			unique: true,
			field: 'ein'
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
		tableName: 'nonprofits'
	});
};
