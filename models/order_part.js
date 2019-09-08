const { Model } = require('sequelize');

class OrderPart extends Model {
	static init(sequelize, Sequelize) {
		return super.init({
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
			},
			qtd: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			unit_price: {
				type: Sequelize.BIGINT,
				allowNull: false,
			},
			additional_info: {
				type: Sequelize.BLOB,
				allowNull: true,
			},
			storage: {
				type: Sequelize.ARRAY(Sequelize.STRING),
				allowNull: true,
			},
		}, {
				tableName: 'order_part',
				freezeTableName: true,
				underscored: true,
				timestamps: true,
				paranoid: true,
				sequelize,
		});
	}

	static associate(models) {
		this.belongsTo(models.Part, {
			foreignKey: 'part_id',
			as: 'part',
		});

		this.belongsTo(models.Order, {
			foreignKey: 'order_id',
			as: 'order',
		});

		this.belongsTo(models.MaterialType, {
			foreignKey: 'material_type_id',
			as: 'material_type',
		});
	}
}

module.exports = OrderPart;
