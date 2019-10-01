module.exports = {
	up: async (queryInterface, Sequelize) => {
		const users = [
			{
				id: '68bb8827-a842-45df-bbe6-a9957eb4c8a1',
				name: 'Mech4u Tester',
				email: 'test.user@mech4u.com.br',
				password: '$argon2i$v=19$m=4096,t=3,p=1$28lVqvl8oZ7+6rjhj6Ysbw$C0BNipH047mRtgYYGvJGgZZeT/PF/9JDiErIE6wKkes',
				phone_number: '12981764593',
				created_at: new Date(),
				updated_at: new Date(),
			},
		];

		const userAddresses = [
			{
				id: 'd7816402-7b51-451a-b267-1a5ef8acc71b',
				user_id: '68bb8827-a842-45df-bbe6-a9957eb4c8a1',
				state: 'SP',
				municipality: 'São José dos Campos',
				address: 'Avenida Doutor Altino Bondensan',
				address_number: 500,
				complement: 'Nexus HUB',
				postcode: '12247016',
				created_at: new Date(),
				updated_at: new Date(),
			},
		];

		await queryInterface.bulkInsert('user', users);
		return queryInterface.bulkInsert('user_address', userAddresses);
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('material_type', null, {});
		return queryInterface.bulkDelete('material', null, {});
	}
};
