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
			finishing: {
				type: Sequelize.ENUM(
					'STANDARD',
					'PRECISION',
					'RECTIFIED',
					'POLISHED',
				),
				allowNull: true,
			},
			tolerance: {
				type: Sequelize.ENUM(
					'HIGH',
					'MEDIUM',
					'LOW',
					'VERY_LOW',
				),
				allowNull: false,
				defaultValue: 'HIGH',
			},
			screw_type: {
				type: Sequelize.ENUM(
					'EXTERNAL',
					'INTERNAL',
				),
				allowNull: true,
				defaultValue: null,
			},
			screw_amount: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			marking: {
				type: Sequelize.ENUM(
					'TYPED',
					'ELETRIC_PNEUMATIC_PEN',
					'LOW_RELIEF_MACHINING',
					'LASER',
					'ELECTROCHEMISTRY',
				),
				allowNull: true,
				defaultValue: null,
			},
			knurled: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			report: {
				type: Sequelize.ENUM(
					'STANDARD',
					'MEASUREMENT_3D',
				),
				allowNull: false,
				defaultValue: 'STANDARD',
			},
			amount: {
				type: Sequelize.INTEGER,
				allowNull: false,
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
			finishing_price: {
				type: Sequelize.BIGINT,
				allowNull: false,
				defaultValue: 0,
			},
			tolerance_price: {
				type: Sequelize.BIGINT,
				allowNull: false,
				defaultValue: 0,
			},
			screw_price: {
				type: Sequelize.BIGINT,
				allowNull: false,
				defaultValue: 0,
			},
			marking_price: {
				type: Sequelize.BIGINT,
				allowNull: false,
				defaultValue: 0,
			},
			report_price: {
				type: Sequelize.BIGINT,
				allowNull: false,
				defaultValue: 0,
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
