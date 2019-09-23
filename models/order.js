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
					'AWAITING_CONFIRMATION',
					'PENDING',
					'PROCESSING',
					'DELIVERING',
					'FINISHED'
				),
				allowNull: false,
				defaultValue: 'AWAITING_CONFIRMATION',
			},
			supplier_payment: {
				type: Sequelize.BIGINT,
				allowNull: false,
			},
			mech4u_payment: {
				type: Sequelize.BIGINT,
				allowNull: false,
			},
			delivery_cost: {
				type: Sequelize.BIGINT,
				allowNull: false,
			},
			delivery_at: {
				type: Sequelize.DATEONLY,
				allowNull: false,
			},
			tax_payment: {
				type: Sequelize.BIGINT,
				allowNull: false,
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
			as: 'parts',
		});

		this.belongsTo(models.UserAddress, {
			foreignKey: 'user_address_id',
			as: 'address',
		});
	}
}

module.exports = Order;
