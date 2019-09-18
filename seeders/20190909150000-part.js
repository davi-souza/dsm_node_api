module.exports = {
	up: async (queryInterface, Sequelize) => {
		const parts = [
			{
				id: 'b723951f-9776-4fb9-896d-a61f369423e0',
				name: 'mock.step',
				storage: 'mock-storage-key',
				volume: '418879',
				raw_material_volume: '2700000',
				user_id: null,
				created_at: new Date(),
				updated_at: new Date(),
			},
		];

		return queryInterface.bulkInsert('part', parts);
	},
	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('part', null, {});
	}
};
