module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('material_type_superficial_treatment', {
			material_type_id: {
				type: Sequelize.UUID,
				references: {
					model: 'material_type',
					key: 'id',
				},
			},
			superficial_treatment_id: {
				type: Sequelize.UUID,
				references: {
					model: 'superficial_treatment',
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
		}).then(() => {
			return queryInterface.sequelize.query('ALTER TABLE material_type_superficial_treatment ADD UNIQUE (material_type_id, superficial_treatment_id)');
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('material_type_superficial_treatment');
	},
};
