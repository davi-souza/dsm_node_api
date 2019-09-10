const uuid_v4 = require('uuid/v4');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const parts = [
			{
				id: uuid_v4(),
				name: 'mock.step',
				storage: 'this-is-us',
				volume: '418879',
				raw_material_volume: '2700000',
				user_id: null,
				created_at: new Date(),
			},
		];

		return queryInterface.bulkInsert('part', parts);
	},
	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('part', null, {});
	}
};
