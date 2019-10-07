const { Model } = require('sequelize');

class AuxiliaryFile extends Model {
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
		}, {
			tableName: 'auxiliary_file',
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
	}
}

module.exports = AuxiliaryFile;
