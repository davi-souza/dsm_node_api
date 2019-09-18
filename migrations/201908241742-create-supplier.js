module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('supplier', {
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
		return queryInterface.dropTable('supplier');
	},
};
