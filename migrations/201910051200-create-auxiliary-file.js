module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('auxiliary_file', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
			},
			part_id: {
				type: Sequelize.UUID,
				references: {
					model: 'part',
					key: 'id',
				},
				allowNull: false,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			storage: {
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
		return queryInterface.dropTable('auxiliary_file');
	},
};
