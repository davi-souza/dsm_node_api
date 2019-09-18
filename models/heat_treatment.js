const { Model } = require('sequelize');

class HeatTreatment extends Model {
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
			minimum_price: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			price_per_kg: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
		}, {
				tableName: 'heat_treatment',
				freezeTableName: true,
				underscored: true,
				timestamps: true,
				paranoid: true,
				sequelize,
		});
	}

	static associate(models) {
		this.belongsToMany(models.MaterialType, {
			through: 'material_type_heat_treatment',
			foreignKey: 'heat_treatment_id',
			as: 'material_types',
		});

		this.hasMany(models.OrderPart, {
			foreignKey: 'heat_treatment_id',
			as: 'orders',
		});
	}
}

module.exports = HeatTreatment;
