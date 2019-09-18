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
				allowNull: false,
				references: {
					model: 'user_address',
					key: 'id',
				},
			},
			status: {
				type: Sequelize.ENUM(
					'AWAITING_CONFIRMATION',
					'PENDING',
					'PROCESSING',
					'DELIVERING',
					'FINISHED'
				),
				allowNull: false,
				defaultValue: 'AWAITING_CONFIRMATION',
			},
			supplier_payment: {
				type: Sequelize.BIGINT,
				allowNull: false,
			},
			mech4u_payment: {
				type: Sequelize.BIGINT,
				allowNull: false,
			},
			delivery_cost: {
				type: Sequelize.BIGINT,
				allowNull: false,
			},
			delivery_at: {
				type: Sequelize.DATEONLY,
				allowNull: false,
			},
			tax_payment: {
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
		return queryInterface.dropTable('order');
	},
};
