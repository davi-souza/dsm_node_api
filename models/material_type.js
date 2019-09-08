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
	}
}

module.exports = MaterialType;
