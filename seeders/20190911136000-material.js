module.exports = {
	up: async (queryInterface, Sequelize) => {
		const materials = [
			{
				id: '7ba84dd7-f84c-4004-af4c-8c617ecc3cbb',
				name: 'Aço carbono',
				created_at: new Date(),
				material_type: [
					{
						id: '37a6e9ff-2eff-4ade-ab0e-11934015270d',
						name: 'Aço SAE 1020',
						price_per_kg: 1000,
						specific_weight: 787,
						created_at: new Date(),
						hardness: 'MEDIUM',
						heat_treatments: [
							'fb829a44-ed10-4333-897a-c17eb6eb26f7',
						],
						superficial_treatments: [
							'93305296-6767-4f5c-9de9-c1b9a8c67542',
							'0f325cd8-d0d9-466d-8424-d3c0d8af6e2e',
							'f403b3bd-5d64-4eea-9498-8a543d3bc07e',
							//'03ca130a-12f3-476b-af46-3df4ecd97c89',
						],
					},
					{
						id: '66026c00-cf5d-4c81-a0be-659d762c0a02',
						name: 'Aço SAE 1045',
						price_per_kg: 1500,
						specific_weight: 787,
						created_at: new Date(),
						hardness: 'MEDIUM',
						heat_treatments: [
							'cbb8a58b-2e5f-4c72-8b21-e097c5c4c4a5',
						],
						superficial_treatments: [
							'93305296-6767-4f5c-9de9-c1b9a8c67542',
							'0f325cd8-d0d9-466d-8424-d3c0d8af6e2e',
							'f403b3bd-5d64-4eea-9498-8a543d3bc07e',
							//'03ca130a-12f3-476b-af46-3df4ecd97c89',
						],
					},
					{
						id: '06280735-611d-4d7e-9597-12b912f91a74',
						name: 'Aço ASTM A36',
						price_per_kg: 1000,
						specific_weight: 785,
						created_at: new Date(),
						hardness: 'MEDIUM',
						heat_treatments: [
							'fb829a44-ed10-4333-897a-c17eb6eb26f7',
						],
						superficial_treatments: [
							'93305296-6767-4f5c-9de9-c1b9a8c67542',
							'0f325cd8-d0d9-466d-8424-d3c0d8af6e2e',
							'f403b3bd-5d64-4eea-9498-8a543d3bc07e',
							//'03ca130a-12f3-476b-af46-3df4ecd97c89',
						],
					},
				],
			},
			{
				id: 'e862810d-8fcf-4bab-8ac1-f5812fb3fb6f',
				name: 'Ferro fundido',
				created_at: new Date(),
				material_type: [
					{
						id: '4b666e53-9fcc-4637-9119-dabf8a324932',
						name: 'Ferro Fundido Nodular GGG40',
						price_per_kg: 1500,
						specific_weight: 726,
						created_at: new Date(),
						hardness: 'MEDIUM',
						heat_treatments: [],
						superficial_treatments: [
							'93305296-6767-4f5c-9de9-c1b9a8c67542',
							'f403b3bd-5d64-4eea-9498-8a543d3bc07e',
						],
					},
				],
			},
			{
				id: '4f2ca291-0423-4c20-8a3c-4c1d099542b4',
				name: 'Aço liga',
				created_at: new Date(),
				material_type: [
					{
						id: '66026696-ca78-4a3a-a847-8606778ee367',
						name: 'Aço SAE 4140',
						price_per_kg: 2000,
						specific_weight: 785,
						created_at: new Date(),
						hardness: 'MEDIUM',
						heat_treatments: [
							'cbb8a58b-2e5f-4c72-8b21-e097c5c4c4a5',
						],
						superficial_treatments: [
							'93305296-6767-4f5c-9de9-c1b9a8c67542',
							'0f325cd8-d0d9-466d-8424-d3c0d8af6e2e',
							'f403b3bd-5d64-4eea-9498-8a543d3bc07e',
							//'03ca130a-12f3-476b-af46-3df4ecd97c89',
						],
					},
					{
						id: '340376ae-cfef-4b75-bf32-c40695bbaddc',
						name: 'Aço SAE 4340',
						price_per_kg: 2000,
						specific_weight: 785,
						created_at: new Date(),
						hardness: 'HIGH',
						heat_treatments: [
							'cbb8a58b-2e5f-4c72-8b21-e097c5c4c4a5',
						],
						superficial_treatments: [
							'93305296-6767-4f5c-9de9-c1b9a8c67542',
							'0f325cd8-d0d9-466d-8424-d3c0d8af6e2e',
							'f403b3bd-5d64-4eea-9498-8a543d3bc07e',
							//'03ca130a-12f3-476b-af46-3df4ecd97c89',
						],
					},
					{
						id: '5a5fdf7d-8844-40c1-95c5-63e4a383513a',
						name: 'Aço SAE 5160',
						price_per_kg: 2000,
						specific_weight: 785,
						created_at: new Date(),
						hardness: 'HIGH',
						heat_treatments: [
							'cbb8a58b-2e5f-4c72-8b21-e097c5c4c4a5',
						],
						superficial_treatments: [
							'93305296-6767-4f5c-9de9-c1b9a8c67542',
							'0f325cd8-d0d9-466d-8424-d3c0d8af6e2e',
							'f403b3bd-5d64-4eea-9498-8a543d3bc07e',
							//'03ca130a-12f3-476b-af46-3df4ecd97c89',
						],
					},
					{
						id: 'b3373365-5a88-4351-9e4e-c206b163a1b7',
						name: 'Aço SAE 8620',
						price_per_kg: 2000,
						specific_weight: 785,
						created_at: new Date(),
						hardness: 'MEDIUM',
						heat_treatments: [
							//'cbb8a58b-2e5f-4c72-8b21-e097c5c4c4a5',
							'fb829a44-ed10-4333-897a-c17eb6eb26f7',
						],
						superficial_treatments: [
							'93305296-6767-4f5c-9de9-c1b9a8c67542',
							'0f325cd8-d0d9-466d-8424-d3c0d8af6e2e',
							'f403b3bd-5d64-4eea-9498-8a543d3bc07e',
							//'03ca130a-12f3-476b-af46-3df4ecd97c89',
						],
					},
				],
			},
			{
				id: '6692e0ce-7208-4298-8f2b-77fc04a411b5',
				name: 'Aço ferramenta',
				created_at: new Date(),
				material_type: [
					{
						id: '95b60f95-6e44-4648-8865-97a1f62a2068',
						name: 'Aço AISI D2',
						price_per_kg: 4000,
						specific_weight: 783,
						created_at: new Date(),
						hardness: 'HIGH',
						heat_treatments: [
							'cbb8a58b-2e5f-4c72-8b21-e097c5c4c4a5',
						],
						superficial_treatments: [
							'93305296-6767-4f5c-9de9-c1b9a8c67542',
							'0f325cd8-d0d9-466d-8424-d3c0d8af6e2e',
							'f403b3bd-5d64-4eea-9498-8a543d3bc07e',
							//'03ca130a-12f3-476b-af46-3df4ecd97c89',
						],
					},
					{
						id: '18baa916-0b61-40b0-8eb0-3a3b78d9e8d7',
						name: 'Aço AISI D6 (VC131)',
						price_per_kg: 4000,
						specific_weight: 783,
						created_at: new Date(),
						hardness: 'HIGH',
						heat_treatments: [
							'cbb8a58b-2e5f-4c72-8b21-e097c5c4c4a5',
						],
						superficial_treatments: [
							'93305296-6767-4f5c-9de9-c1b9a8c67542',
							'0f325cd8-d0d9-466d-8424-d3c0d8af6e2e',
							'f403b3bd-5d64-4eea-9498-8a543d3bc07e',
							//'03ca130a-12f3-476b-af46-3df4ecd97c89',
						],
					},
					{
						id: '30f33402-3153-4d97-b9e3-2b182c0404f2',
						name: 'Aço SAE O1 (VND)',
						price_per_kg: 4000,
						specific_weight: 783,
						created_at: new Date(),
						hardness: 'HIGH',
						heat_treatments: [
							'cbb8a58b-2e5f-4c72-8b21-e097c5c4c4a5',
						],
						superficial_treatments: [
							'93305296-6767-4f5c-9de9-c1b9a8c67542',
							'0f325cd8-d0d9-466d-8424-d3c0d8af6e2e',
							'f403b3bd-5d64-4eea-9498-8a543d3bc07e',
							//'03ca130a-12f3-476b-af46-3df4ecd97c89',
						],
					},
				],
			},
			{
				id: '6a827220-cf44-4e52-8626-0b5b26df6ecf',
				name: 'Aço inoxidável',
				created_at: new Date(),
				material_type: [
					//{
					//	id: 'bb9e4717-0718-400b-80aa-e31f9868b02a',
					//	name: 'Aço inoxidável AISI 303',
					//	price_per_kg: 4000,
					//	specific_weight: 800,
					//	created_at: new Date(),
					//	hardness: 'HIGH',
					//	heat_treatments: [],
					//	superficial_treatments: [
					//		'ed6370b6-3e2c-458b-9462-e6eb4eea7240',
					//	],
					//},
					{
						id: '2c5495ee-86a8-473e-83b6-b96f0e373393',
						name: 'Aço inoxidável AISI 304',
						price_per_kg: 4000,
						specific_weight: 800,
						created_at: new Date(),
						hardness: 'HIGH',
						heat_treatments: [],
						superficial_treatments: [
							'ed6370b6-3e2c-458b-9462-e6eb4eea7240',
						],
					},
					{
						id: '5bbde13b-cbae-4fd9-99c2-1ec2f3744fb1',
						name: 'Aço inoxidável AISI 316',
						price_per_kg: 4000,
						specific_weight: 800,
						created_at: new Date(),
						hardness: 'HIGH',
						heat_treatments: [],
						superficial_treatments: [
							'ed6370b6-3e2c-458b-9462-e6eb4eea7240',
						],
					},
					{
						id: 'f595b88f-3406-4f19-8279-bab3a8da32f7',
						name: 'Aço inoxidável AISI 420',
						price_per_kg: 4000,
						specific_weight: 800,
						created_at: new Date(),
						hardness: 'HIGH',
						heat_treatments: [
							'cbb8a58b-2e5f-4c72-8b21-e097c5c4c4a5'
						],
						superficial_treatments: [
							'93305296-6767-4f5c-9de9-c1b9a8c67542',
							'0f325cd8-d0d9-466d-8424-d3c0d8af6e2e',
							'f403b3bd-5d64-4eea-9498-8a543d3bc07e',
						],
					},
				],
			},
			{
				id: 'a02cb2b9-f6e9-462d-9c07-56bb50d1c902',
				name: 'Alumínio',
				created_at: new Date(),
				material_type: [
					{
						id: 'cfc560d7-b2e1-47d8-921c-1c4a5720205d',
						name: 'Alumínio 5083 / 5082',
						price_per_kg: 2600,
						specific_weight: 270,
						created_at: new Date(),
						hardness: 'LOW',
						heat_treatments: [],
						superficial_treatments: [
							'22b26118-c992-4d14-94e5-4ff1a942637d',
						],
					},
					{
						id: '973b0db1-7449-4d8b-b87b-137792292c1c',
						name: 'Alumínio 6061 T651',
						price_per_kg: 3000,
						specific_weight: 271,
						created_at: new Date(),
						hardness: 'LOW',
						heat_treatments: [],
						superficial_treatments: [
							'22b26118-c992-4d14-94e5-4ff1a942637d',
						],
					},
					{
						id: 'f7b652e1-b348-4505-b183-d8296cdeeb84',
						name: 'Alumínio 7075 T651',
						price_per_kg: 4500,
						specific_weight: 285,
						created_at: new Date(),
						hardness: 'LOW',
						heat_treatments: [],
						superficial_treatments: [
							'22b26118-c992-4d14-94e5-4ff1a942637d',
						],
					},
					{
						id: '539bc50b-61d5-461e-ac2d-3f136d2dbb1e',
						name: 'Alumínio 7021',
						price_per_kg: 4000,
						specific_weight: 280,
						created_at: new Date(),
						hardness: 'LOW',
						heat_treatments: [],
						superficial_treatments: [
							'22b26118-c992-4d14-94e5-4ff1a942637d',
						],
					},
					{
						id: '60808daf-4376-46e8-b22b-c82c4c1c00ca',
						name: 'Alumínio 6351 T6',
						price_per_kg: 3000,
						specific_weight: 271,
						created_at: new Date(),
						hardness: 'LOW',
						heat_treatments: [],
						superficial_treatments: [
							'22b26118-c992-4d14-94e5-4ff1a942637d',
						],
					},
					//{
					//	id: '812b20bd-1980-4b01-b973-1e27cc75e478',
					//	name: 'Alumínio Fundido SAE 323 T6',
					//	price_per_kg: 6000,
					//	specific_weight: 270,
					//	created_at: new Date(),
					//	hardness: 'LOW',
					//	heat_treatments: [],
					//	superficial_treatments: [
					//		'22b26118-c992-4d14-94e5-4ff1a942637d',
					//	],
					//},
				],
			},
			{
				id: '8cd36a57-741b-4fcb-9be9-45478f7730ce',
				name: 'Latão',
				created_at: new Date(),
				material_type: [
					{
						id: '52e3be55-f5b5-4fd7-8248-1a9bd36a3dfb',
						name: 'Latão SAE CAE360 / ASTM C36000',
						price_per_kg: 6000,
						specific_weight: 852,
						created_at: new Date(),
						hardness: 'LOW',
						heat_treatments: [],
						superficial_treatments: [],
					},
				],
			},
			{
				id: 'f67af1ec-e5d0-4e1d-9779-daa745f8db4f',
				name: 'Bronze',
				created_at: new Date(),
				material_type: [
					{
						id: 'f9227e8c-220d-4df8-805c-a61b8f818e48',
						name: 'Bronze SAE 620',
						price_per_kg: 16000,
						specific_weight: 890,
						created_at: new Date(),
						hardness: 'LOW',
						heat_treatments: [],
						superficial_treatments: [],
					},
					{
						id: 'bd64e667-5a67-4128-a225-e7b9e0946b39',
						name: 'Bronze SAE 68B',
						price_per_kg: 16000,
						specific_weight: 890,
						created_at: new Date(),
						hardness: 'LOW',
						heat_treatments: [],
						superficial_treatments: [],
					},
				],
			},
			{
				id: '911781fd-2ec2-4176-b628-1e37206614b8',
				name: 'Cobre',
				created_at: new Date(),
				material_type: [
					{
						id: '36afdc03-bf37-4477-b9b6-8b3ddb9d15d8',
						name: 'Cobre SAE CA110 / ASTM C11000',
						price_per_kg: 8000,
						specific_weight: 894,
						created_at: new Date(),
						hardness: 'LOW',
						heat_treatments: [],
						superficial_treatments: [],
					},
				],
			},
			{
				id: '71567859-9cac-4ebc-a138-5e515ebbe4bf',
				name: 'Plástico',
				created_at: new Date(),
				material_type: [
					{
						id: '7d4e6d47-743e-418e-8c8a-544844ac8929',
						name: 'PEAD (Polietileno)',
						price_per_kg: 3500,
						specific_weight: 95,
						created_at: new Date(),
						hardness: 'LOW',
						heat_treatments: [],
						superficial_treatments: [],
					},
					{
						id: '98ce73c4-810d-4adb-a4a0-619966335e33',
						name: 'POM (Poliacetal / "Delrin")',
						price_per_kg: 5500,
						specific_weight: 141,
						created_at: new Date(),
						hardness: 'LOW',
						heat_treatments: [],
						superficial_treatments: [],
					},
					{
						id: 'f3fec36f-84bb-4a0b-b8c8-cf8e0a9dd977',
						name: 'PTFE (Teflon)',
						price_per_kg: 25000,
						specific_weight: 218,
						created_at: new Date(),
						hardness: 'LOW',
						heat_treatments: [],
						superficial_treatments: [],
					},
					{
						id: 'd14ad88f-5e33-40b5-8c8a-0d820ad1fe2e',
						name: 'Nylon 6.6 (Poliamida - PA)',
						price_per_kg: 10500,
						specific_weight: 114,
						created_at: new Date(),
						hardness: 'LOW',
						heat_treatments: [],
						superficial_treatments: [],
					},
					{
						id: '918a5962-5f5c-4321-82f2-626d64f0f69d',
						name: 'Polietileno UHMW',
						price_per_kg: 12000,
						specific_weight: 96,
						created_at: new Date(),
						hardness: 'LOW',
						heat_treatments: [],
						superficial_treatments: [],
					},
				],
			},
		];

		for (material of materials) {
			await queryInterface.bulkInsert('material', [{
				id: material.id,
				name: material.name,
				created_at: material.created_at,
				updated_at: material.created_at,
			}]);

			for (type of material.material_type) {
				await queryInterface.bulkInsert('material_type', [{
					id: type.id,
					name: type.name,
					price_per_kg: type.price_per_kg,
					specific_weight: type.specific_weight,
					material_id: material.id,
					hardness: type.hardness,
					created_at: type.created_at,
					updated_at: type.created_at,
				}]);

				for (ht of type.heat_treatments) {
					await queryInterface.bulkInsert('material_type_heat_treatment', [{
						material_type_id: type.id,
						heat_treatment_id: ht,
						created_at: type.created_at,
						updated_at: type.created_at,
					}]);
				}

				for (st of type.superficial_treatments) {
					await queryInterface.bulkInsert('material_type_superficial_treatment', [{
						material_type_id: type.id,
						superficial_treatment_id: st,
						created_at: type.created_at,
						updated_at: type.created_at,
					}]);
				}
			}
		}
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('material_type', null, {});
		return queryInterface.bulkDelete('material', null, {});
	}
};
