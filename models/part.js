const { Model } = require('sequelize');

class Part extends Model {
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
			storage: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			volume: {
				type: Sequelize.BIGINT,
				allowNull: false,
			},
			raw_material_volume: {
				type: Sequelize.BIGINT,
				allowNull: false,
			},
		}, {
				tableName: 'part',
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
			as: 'user',
		});

		this.hasMany(models.OrderPart, {
			foreignKey: 'part_id',
			as: 'orderParts',
		});
	}
}

module.exports = Part;
