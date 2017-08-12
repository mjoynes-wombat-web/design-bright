/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users', {
		userId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'user_id'
		},
		firstName: {
			type: DataTypes.STRING(75),
			allowNull: false,
			field: 'first_name'
		},
		lastName: {
			type: DataTypes.STRING(75),
			allowNull: false,
			field: 'last_name'
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true,
			field: 'email'
		},
		userTypeId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'user_types',
				key: 'id'
			},
			field: 'user_type_id'
		},
		password: {
			type: DataTypes.STRING(75),
			allowNull: false,
			field: 'password'
		},
		passwordDate: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'password_date'
		},
		profileImgUrl: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'profile_img_url'
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
		tableName: 'users'
	});
};
