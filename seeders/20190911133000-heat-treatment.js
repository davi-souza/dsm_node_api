module.exports = {
	up: async (queryInterface, Sequelize) => {
		const heat_treatments = [
			{
				id: 'cbb8a58b-2e5f-4c72-8b21-e097c5c4c4a5',
				name: 'Têmpera',
				minimum_price: 6000,
				price_per_kg: 6000,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 'fb829a44-ed10-4333-897a-c17eb6eb26f7',
				name: 'Cementação',
				minimum_price: 7000,
				price_per_kg: 7000,
				created_at: new Date(),
				updated_at: new Date(),
			},
		];

		return queryInterface.bulkInsert('heat_treatment', heat_treatments);
	},
	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('heat_treatment', null, {});
	}
};
