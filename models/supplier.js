const { Model } = require('sequelize');

class Supplier extends Model {
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
			email: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false,
				validate: {
					isEmail: true,
				},
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			phone_number: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			state: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			municipality: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			address: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			address_number: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			complement: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			postcode: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		}, {
				tableName: 'supplier',
				freezeTableName: true,
				underscored: true,
				timestamps: true,
				paranoid: true,
				sequelize,
		});
	}

	static associate(models) {
		this.hasMany(models.Order, {
			foreignKey: 'supplier_id',
			as: 'orders',
		});
	}
}

module.exports = Supplier;
