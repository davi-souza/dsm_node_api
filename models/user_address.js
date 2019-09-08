const { Model } = require('sequelize');

class UserAddress extends Model {
	static init(sequelize, Sequelize) {
		return super.init({
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
			},
			address: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		}, {
				tableName: 'user_address',
				freezeTableName: true,
				underscored: true,
				timestamps: true,
				paranoid: true,
				sequelize,
		});
	}

	static associate(models) {
		this.belongsTo(models.User, {
			foreignKey: 'user_id',
			as: 'users',
		});

		this.hasMany(models.Order, {
			foreignKey: 'user_address_id',
			as: 'orders',
		});
	}
}

module.exports = UserAddress;
