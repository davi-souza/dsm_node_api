module.exports = {
	up: async (queryInterface, Sequelize) => {
		const superficial_treatments = [
			{
				id: '93305296-6767-4f5c-9de9-c1b9a8c67542',
				name: 'Zinco',
				minimum_price: 3500,
				price_per_kg: 3500,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: '0f325cd8-d0d9-466d-8424-d3c0d8af6e2e',
				name: 'Níquel químico endurecido',
				minimum_price: 4000,
				price_per_kg: 4000,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 'f403b3bd-5d64-4eea-9498-8a543d3bc07e',
				name: 'Oxidação Preta',
				minimum_price: 3000,
				price_per_kg: 3000,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: '22b26118-c992-4d14-94e5-4ff1a942637d',
				name: 'Anodização',
				minimum_price: 10000,
				price_per_kg: 10000,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 'ed6370b6-3e2c-458b-9462-e6eb4eea7240',
				name: 'Eletropolimento',
				minimum_price: 10000,
				price_per_kg: 10000,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: '03ca130a-12f3-476b-af46-3df4ecd97c89',
				name: 'Cromo',
				minimum_price: 4500,
				price_per_kg: 4500,
				created_at: new Date(),
				updated_at: new Date(),
			},
		];

		return queryInterface.bulkInsert('superficial_treatment', superficial_treatments);
	},
	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('superficial_treatment', null, {});
	}
};
