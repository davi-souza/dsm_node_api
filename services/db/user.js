const uuid_v4 = require('uuid/v4');
const db = require('../../models');
const {
	password_hash,
	password_verify,
	jwt_sign,
} = require('../auth');
const { CustomError } = require('../../libs/error');

/**
 * Verifies if email and password are ok
 * and returns jwt
 * @param {string} email	User's email
 * @param {string} password	User's password
 * @return {object} 		Login payload
 */
async function login(email, password) {
	try {
		const fetched_user = await db.User.findOne({
			include: [
				{
					model: db.UserAddress,
					as: 'addresses',
					attributes: [
						'id',
						'state',
						'municipality',
						'address',
						'address_number',
						'complement',
						'postcode',
					],
				},
			],
			where: { email },
		});

		if (!fetched_user) {
			throw new CustomError('Usuário não encontrado', 404);
		}

		const password_match = await password_verify(fetched_user.password, password);

		if (!password_match) {
			throw new CustomError('Senha incorreta', 401);
		}

		const addresses = fetched_user.dataValues.addresses.map(address => ({
			...address.toJSON(),
		}));

		const jwt_payload = {
			...fetched_user.toJSON(),
			addresses,
		};

		delete jwt_payload['password'];

		const user_payload = {
			name: jwt_payload.name,
			email: jwt_payload.email,
			phone_number: jwt_payload.phone_number,
			addresses,
		};

		return {
			...user_payload,
			jwt: jwt_sign(jwt_payload),
		};
	} catch (err) {
		console.warn(err);

		if (err instanceof CustomError) {
			throw err;
		}

		throw new CustomError('Não foi possível fazer login', 500);
	}
}

/**
 * Register new user
 * and returns login payload
 * @param {string} name			User's name
 * @param {string} phone_number	User's phone number
 * @param {string} email		User's email
 * @param {string} password		User's password
 * @param {object[]} addresses	User's addresses
 *            {string} address
 *            {string} postcode
 * @return {object} 			Login payload
 */
async function register_user(name, phone_number, email, password, addresses) {
	try {
		const hashed_password = await password_hash(password);
		
		const new_user = await db.User.create({
			id: uuid_v4(),
			name,
			phone_number,
			email,
			password: hashed_password,
			addresses: addresses.map(address => ({
				...address,
				id: uuid_v4(),
				address: address.address.trim(),
				postcode: address.postcode.trim().replace(/[\-\.\s]g/, ''),
			})),
		}, {
			include: [{
				model: db.UserAddress,
				as: 'addresses',
			}],
		});

		const jwt_payload = {
			...new_user.dataValues,
			addresses: new_user.dataValues.addresses.map(address => ({
				...address.dataValues,
			})),
		};

		// delete jwt_payload['password'];

		const user_payload = {
			name: jwt_payload.name,
			email: jwt_payload.email,
			phone_number: jwt_payload.phone_number,
		};

		return {
			...user_payload,
			jwt: jwt_sign(jwt_payload),
		};
	} catch (err) {
		console.warn(err);

		throw new CustomError(err.message, 500);
	}
}

module.exports = {
	login,
	register_user,
};
