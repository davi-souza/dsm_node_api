const {
	login,
	register_user,
} = require('../../services/db/user');

async function MutationLoginResolver(email, password) {
	return await login(email, password);
}

async function MutationRegisterUserResolver(name, phone_number, email, password, addresses) {
	return await register_user(name, phone_number, email, password, addresses);
}

module.exports = {
	MutationLoginResolver,
	MutationRegisterUserResolver,
};
