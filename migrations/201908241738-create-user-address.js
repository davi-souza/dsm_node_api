module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('user_address', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
			},
			address: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			user_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'user',
					key: 'id',
				},
			},
			created_at: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
			},
			deleted_at: {
				type: Sequelize.DATE,
				defaultValue: null,
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('user_address');
	},
};
