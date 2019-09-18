const { Model } = require('sequelize');

class OrderPart extends Model {
	static init(sequelize, Sequelize) {
		return super.init({
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
			},
			amount: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			tolerance: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			finishing: {
				type: Sequelize.ENUM(
					'STANDARD',
					'RECTIFIED',
					'POLISHED',
				),
				allowNull: true,
			},
			raw_material_price: {
				type: Sequelize.BIGINT,
				allowNull: false,
			},
			volume_diff_price: {
				type: Sequelize.BIGINT,
				allowNull: false,
			},
			heat_treatment_price: {
				type: Sequelize.BIGINT,
				allowNull: true,
			},
			superficial_treatment_price: {
				type: Sequelize.BIGINT,
				allowNull: true,
			},
			tolerance_price: {
				type: Sequelize.BIGINT,
				allowNull: true,
			},
			finishing_price: {
				type: Sequelize.BIGINT,
				allowNull: true,
			},
			screw_price: {
				type: Sequelize.BIGINT,
				allowNull: true,
			},
			supplier_profit: {
				type: Sequelize.BIGINT,
				allowNull: false,
			},
			mech4u_profit: {
				type: Sequelize.BIGINT,
				allowNull: false,
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

		this.belongsTo(models.HeatTreatment, {
			foreignKey: 'heat_treatment_id',
			as: 'heat_treatment',
		});

		this.belongsTo(models.SuperficialTreatment, {
			foreignKey: 'superficial_treatment_id',
			as: 'superficial_treatment',
		});
	}
}

module.exports = OrderPart;
