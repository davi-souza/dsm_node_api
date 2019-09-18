module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('superficial_treatment', {
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
		return queryInterface.dropTable('superficial_treatment');
	},
};
