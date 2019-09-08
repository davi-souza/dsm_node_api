const { Model } = require('sequelize');

class Material extends Model {
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
		}, {
				tableName: 'material',
				freezeTableName: true,
				underscored: true,
				timestamps: true,
				paranoid: true,
				sequelize,
		});
	}

	static associate(models) {
		this.hasMany(models.MaterialType, {
			foreignKey: 'material_id',
			as: 'material_types',
		});
	}
}

module.exports = Material;