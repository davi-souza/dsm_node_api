const { Model } = require('sequelize');

class MaterialType extends Model {
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
			price_per_kg: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			specific_weight: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			hardness: {
				type: Sequelize.ENUM(
					'LOW',
					'MEDIUM',
					'HIGH',
				),
				allowNull: false,
			},
		}, {
				tableName: 'material_type',
				freezeTableName: true,
				underscored: true,
				timestamps: true,
				paranoid: true,
				sequelize,
		});
	}

	static associate(models) {
		this.belongsTo(models.Material, {
			foreignKey: 'material_id',
			as: 'material',
		});
		
		this.hasMany(models.OrderPart, {
			foreignKey: 'material_type_id',
			as: 'orders',
		});

		this.belongsToMany(models.HeatTreatment, {
			through: 'material_type_heat_treatment',
			foreignKey: 'material_type_id',
			as: 'heat_treatments',
		});

		this.belongsToMany(models.SuperficialTreatment, {
			through: 'material_type_superficial_treatment',
			foreignKey: 'material_type_id',
			as: 'superficial_treatments',
		});
	}
}

module.exports = MaterialType;
