const uuid_v4 = require('uuid/v4');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const materials = [
			{
				id: uuid_v4(),
				name: 'Aço carbono',
				created_at: new Date(),
				material_type: [
					{
						id: uuid_v4(),
						name: 'Aço SAE 1020',
						price_per_kg: 1000,
						specific_weight: 787,
						created_at: new Date(),
					},
					{
						id: uuid_v4(),
						name: 'Aço SAE 1045',
						price_per_kg: 1500,
						specific_weight: 787,
						created_at: new Date(),
					},
					{
						id: uuid_v4(),
						name: 'Aço ASTM A36',
						price_per_kg: 1000,
						specific_weight: 785,
						created_at: new Date(),
					},
				],
			},
			{
				id: uuid_v4(),
				name: 'Ferro fundido',
				created_at: new Date(),
				material_type: [
					{
						id: uuid_v4(),
						name: 'Ferro Fundido Nodular GGG40',
						price_per_kg: 1500,
						specific_weight: 726,
						created_at: new Date(),
					},
				],
			},
			{
				id: uuid_v4(),
				name: 'Aço liga',
				created_at: new Date(),
				material_type: [
					{
						id: uuid_v4(),
						name: 'Aço SAE 4140',
						price_per_kg: 2000,
						specific_weight: 785,
						created_at: new Date(),
					},
					{
						id: uuid_v4(),
						name: 'Aço SAE 4340',
						price_per_kg: 2000,
						specific_weight: 785,
						created_at: new Date(),
					},
					{
						id: uuid_v4(),
						name: 'Aço SAE 5160',
						price_per_kg: 2000,
						specific_weight: 785,
						created_at: new Date(),
					},
					{
						id: uuid_v4(),
						name: 'Aço SAE 8620',
						price_per_kg: 2000,
						specific_weight: 785,
						created_at: new Date(),
					},
				],
			},
			{
				id: uuid_v4(),
				name: 'Aço ferramenta',
				created_at: new Date(),
				material_type: [
					{
						id: uuid_v4(),
						name: 'Aço AISI D2',
						price_per_kg: 4000,
						specific_weight: 783,
						created_at: new Date(),
					},
					{
						id: uuid_v4(),
						name: 'Aço AISI D6 (VC131)',
						price_per_kg: 4000,
						specific_weight: 783,
						created_at: new Date(),
					},
					{
						id: uuid_v4(),
						name: 'Aço SAE O1 (VND)',
						price_per_kg: 4000,
						specific_weight: 783,
						created_at: new Date(),
					},
				],
			},
			{
				id: uuid_v4(),
				name: 'Aço inoxidável',
				created_at: new Date(),
				material_type: [
					{
						id: uuid_v4(),
						name: 'Aço inoxidável AISI 303',
						price_per_kg: 4000,
						specific_weight: 800,
						created_at: new Date(),
					},
					{
						id: uuid_v4(),
						name: 'Aço inoxidável AISI 304',
						price_per_kg: 4000,
						specific_weight: 800,
						created_at: new Date(),
					},
					{
						id: uuid_v4(),
						name: 'Aço inoxidável AISI 316',
						price_per_kg: 4000,
						specific_weight: 800,
						created_at: new Date(),
					},
					{
						id: uuid_v4(),
						name: 'Aço inoxidável AISI 420',
						price_per_kg: 4000,
						specific_weight: 800,
						created_at: new Date(),
					},
				],
			},
			{
				id: uuid_v4(),
				name: 'Alumínio',
				created_at: new Date(),
				material_type: [
					{
						id: uuid_v4(),
						name: 'Alumínio 5083 / 5082',
						price_per_kg: 2600,
						specific_weight: 270,
						created_at: new Date(),
					},
					{
						id: uuid_v4(),
						name: 'Alumínio 6061 T651',
						price_per_kg: 3000,
						specific_weight: 271,
						created_at: new Date(),
					},
					{
						id: uuid_v4(),
						name: 'Alumínio 7075 T651',
						price_per_kg: 4500,
						specific_weight: 285,
						created_at: new Date(),
					},
					{
						id: uuid_v4(),
						name: 'Alumínio 7021',
						price_per_kg: 4000,
						specific_weight: 280,
						created_at: new Date(),
					},
					{
						id: uuid_v4(),
						name: 'Alumínio 6351 T6',
						price_per_kg: 3000,
						specific_weight: 271,
						created_at: new Date(),
					},
					{
						id: uuid_v4(),
						name: 'Alumínio Fundido SAE 323 T6',
						price_per_kg: 6000,
						specific_weight: 270,
						created_at: new Date(),
					},
				],
			},
			{
				id: uuid_v4(),
				name: 'Latão',
				created_at: new Date(),
				material_type: [
					{
						id: uuid_v4(),
						name: 'Latão SAE CAE360 / ASTM C36000',
						price_per_kg: 6000,
						specific_weight: 852,
						created_at: new Date(),
					},
				],
			},
			{
				id: uuid_v4(),
				name: 'Bronze',
				created_at: new Date(),
				material_type: [
					{
						id: uuid_v4(),
						name: 'Bronze SAE 620',
						price_per_kg: 16000,
						specific_weight: 890,
						created_at: new Date(),
					},
					{
						id: uuid_v4(),
						name: 'Bronze SAE 68B',
						price_per_kg: 16000,
						specific_weight: 890,
						created_at: new Date(),
					},
				],
			},
			{
				id: uuid_v4(),
				name: 'Cobre',
				created_at: new Date(),
				material_type: [
					{
						id: uuid_v4(),
						name: 'Cobra SAE CA110 / ASTM C11000',
						price_per_kg: 8000,
						specific_weight: 894,
						created_at: new Date(),
					},
				],
			},
			{
				id: uuid_v4(),
				name: 'Pĺástico',
				created_at: new Date(),
				material_type: [
					{
						id: uuid_v4(),
						name: 'PEAD (Polietileno)',
						price_per_kg: 3500,
						specific_weight: 95,
						created_at: new Date(),
					},
					{
						id: uuid_v4(),
						name: 'POM (Poliacetal / "Delrin")',
						price_per_kg: 5500,
						specific_weight: 141,
						created_at: new Date(),
					},
					{
						id: uuid_v4(),
						name: 'PTFE (Teflon)',
						price_per_kg: 25000,
						specific_weight: 218,
						created_at: new Date(),
					},
					{
						id: uuid_v4(),
						name: 'Nylon 6.6 (Poliamida - PA)',
						price_per_kg: 10500,
						specific_weight: 114,
						created_at: new Date(),
					},
					{
						id: uuid_v4(),
						name: 'Polietileno UHMW',
						price_per_kg: 12000,
						specific_weight: 96,
						created_at: new Date(),
					},
				],
			},
		];

		await queryInterface.bulkInsert('material', materials.map(mat => ({
			id: mat.id,
			name: mat.name,
			created_at: mat.created_at,
		})));

		for (material of materials) {
			await queryInterface.bulkInsert('material_type', material.material_type.map(type => ({
				id: type.id,
				name: type.name,
				price_per_kg: type.price_per_kg,
				specific_weight: type.specific_weight,
				material_id: material.id,
				created_at: type.created_at,
			})));
		}
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('material_type', null, {});
		return queryInterface.bulkDelete('material', null, {});
	}
};
