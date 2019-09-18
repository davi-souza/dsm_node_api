module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('user_address', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
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
		return queryInterface.dropTable('user_address');
	},
};
