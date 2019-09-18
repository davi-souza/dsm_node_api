module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('part', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
			},
			user_id: {
				type: Sequelize.UUID,
				allowNull: true,
				references: {
					model: 'user',
					key: 'id',
				},
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
		return queryInterface.dropTable('part');
	},
};
