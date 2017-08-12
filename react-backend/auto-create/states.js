/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('states', {
		stateId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'state_id'
		},
		name: {
			type: DataTypes.STRING(75),
			allowNull: false,
			unique: true,
			field: 'name'
		},
		abbreviation: {
			type: DataTypes.STRING(2),
			allowNull: false,
			unique: true,
			field: 'abbreviation'
		}
	}, {
		tableName: 'states'
	});
};
