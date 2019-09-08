const { Model } = require('sequelize');

class Order extends Model {
	static init(sequelize, Sequelize) {
		return super.init({
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
			},
			status: {
				type: Sequelize.ENUM(
					'PENDING',
					'PROCESSING',
					'DELIVERING',
					'FINISHED'
				),
				allowNull: false,
				defaultValue: 'PENDING',
			},
			estimated_delivery: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			supplier_payment: {
				type: Sequelize.BIGINT,
				allowNull: false,
			},
			additional_info: {
				type: Sequelize.BLOB,
				allowNull: true,
			},
		}, {
				tableName: 'order',
				freezeTableName: true,
				underscored: true,
				timestamps: true,
				paranoid: true,
				sequelize,
		});
	}

	static associate(models) {
		this.belongsTo(models.Supplier, {
			foreignKey: 'supplier_id',
			as: 'supplier',
		});

		this.hasMany(models.OrderPart, {
			foreignKey: 'order_id',
			as: 'orderParts',
		});

		this.belongsTo(models.UserAddress, {
			foreignKey: 'user_address_id',
			as: 'address',
		});
	}
}

module.exports = Order;
