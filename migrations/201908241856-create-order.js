module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('order', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
			},
			supplier_id: {
				type: Sequelize.UUID,
				allowNull: true,
				references: {
					model: 'supplier',
					key: 'id',
				},
			},
			user_address_id: {
				type: Sequelize.UUID,
				allowNull: true,
				references: {
					model: 'user_address',
					key: 'id',
				},
			},
			status: {
				type: Sequelize.ENUM(
					'PENDING',
					'PROCESSING',
					'DELIVERING',
					'FINISHED'
				),
				allowNull: false,
				defaultValue: 'PENDING',
			},
			estimated_delivery: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			supplier_payment: {
				type: Sequelize.BIGINT,
				allowNull: false,
			},
			additional_info: {
				type: Sequelize.BLOB,
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
		return queryInterface.dropTable('order');
	},
};
