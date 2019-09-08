module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('order_part', {
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
			},
			order_id: {
				type: Sequelize.UUID,
				references: {
					model: 'order',
					key: 'id',
				},
			},
			material_type_id: {
				type: Sequelize.UUID,
				references: {
					model: 'material_type',
					key: 'id',
				},
			},
			qtd: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			unit_price: {
				type: Sequelize.BIGINT,
				allowNull: false,
			},
			additional_info: {
				type: Sequelize.BLOB,
				allowNull: true,
			},
			storage: {
				type: Sequelize.ARRAY(Sequelize.STRING),
				allowNull: true,
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
		return queryInterface.dropTable('order_part');
	},
};
