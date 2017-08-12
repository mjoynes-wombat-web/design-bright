/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('userTypes', {
		userTypeId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'user_type_id'
		},
		name: {
			type: DataTypes.STRING(75),
			allowNull: false,
			unique: true,
			field: 'name'
		}
	}, {
		tableName: 'user_types'
	});
};
