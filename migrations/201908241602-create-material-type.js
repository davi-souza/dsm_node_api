module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('material_type', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
			},
			material_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'material',
					key: 'id',
				},
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
			created_at: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
				allowNull: false,
			},
			deleted_at: {
				type: Sequelize.DATE,
				defaultValue: null,
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('material_type');
	},
};
