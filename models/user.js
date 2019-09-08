const { Model } = require('sequelize');

class User extends Model {
	static init(sequelize, Sequelize) {
		return super.init({
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false,
				validate: {
					isEmail: true,
				},
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			phone_number: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		}, {
				tableName: 'user',
				freezeTableName: true,
				underscored: true,
				timestamps: true,
				paranoid: true,
				sequelize,
		});
	}

	static associate(models) {
		this.hasMany(models.Part, {
			foreignKey: 'user_id',
			as: 'parts',
		});

		this.hasMany(models.UserAddress, {
			foreignKey: 'user_id',
			as: 'addresses',
		});
	}
}

module.exports = User;
