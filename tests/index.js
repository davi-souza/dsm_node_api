const { login } = require('../services/db/user');

async function user_login() {
	const email = 'ddas.souza@gmail.com',
		password = '123';

	console.log(await login(email, password));
}

user_login();
