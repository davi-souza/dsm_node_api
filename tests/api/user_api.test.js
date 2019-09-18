const supertest = require('supertest');
const app = require('../../app');

const test_app = supertest(app);

test('It should register a user', async () => {
	const query = `mutation RootMutation($input: RegisterUserInputType!) {
	registerUser (input: $input) {
		name,
		email,
		token
	}
}`.trim();

	const input = {
		name: "Davi Souza",
		phone_number: "12981764593",
		email: "ddas.souza@gmail.com",
		password: "123",
		addresses: [
			{
				state: 'SP',
				municipality: 'São José dos Campos',
				address: "Rua Republica do Iraque",
				address_number: 80,
				complement: 'Apt 64B',
				postcode: "12216-540",
			},
		],
	};

	const res = await test_app
		.post('/api/graphql')
		.send({
			query,
			variables: { input, },
		});
	
	expect(res.statusCode).toBe(200);
});

test('It should login', async () => {
	const query = `mutation RootMutation($input: LoginInputType!) {
	login (input: $input) {
		name
		email
		token
		addresses {
			id
			address
			address_number
			postcode
		}
	}
}`.trim();

	const input = {
		email: "ddas.souza@gmail.com",
		password: "123",
	};

	return test_app
		.post('/api/graphql')
		.send({
			query,
			variables: { input, },
		})
		.then(res => {
			console.log(res.body.data.login);
			expect(res.statusCode).toBe(200);
		})
		.catch(console.warn);
});
