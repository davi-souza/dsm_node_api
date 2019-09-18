const supertest = require('supertest');
const app = require('../../app');

const test_app = supertest(app);

test('It should change part options', async () => {
	const query = `mutation RootMutation($input: ChangePartOptionsInputType!) {
	changePartOptions(input: $input) {
		id
		name
		material_type_id
		heat_treatment_id
		tolerance
		finishing
		amount
		unit_price
	}
}`.trim();

	const input = {
		part_id: 'b723951f-9776-4fb9-896d-a61f369423e0',
		material_type_id: '37a6e9ff-2eff-4ade-ab0e-11934015270d',
		heat_treatment_id: 'fb829a44-ed10-4333-897a-c17eb6eb26f7',
		superficial_treatment_id: '93305296-6767-4f5c-9de9-c1b9a8c67542',
		amount: 1,
	};

	return test_app
		.post('/api/graphql')
		.send({
			query,
			variables: { input, },
		})
		.then(res => {
			expect(res.statusCode).toBe(200);
		})
		.catch(console.warn);
});
