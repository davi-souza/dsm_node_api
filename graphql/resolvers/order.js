const { CustomError, handle_graphql_error } = require('../../libs/error');
const { get_batch_info } = require('../../libs/part/batch');
const { jwt_verify } = require('../../services/auth');
const { get_mail_info } = require('../../services/analysis/mail');
const { place_order } = require('../../services/db/order');

function get_user(authorization) {
	//if (!authorization ||
	//	typeof authorization !== 'string' ||
	//	!authorization.startsWith('Bearer ')) {
	//	throw new CustomError('Não autorizado', 401);
	//}

	//try {
	//	const jwt = authorization.replace('Bearer ', '');

	//	return jwt_verify(jwt);
	//} catch (err) {
	//	throw new CustomError('Usuário não autorizado', 401);
	//}
	return {
		id: 'e50ca7bb-f13b-4fa7-9473-0f32f48adc98',
		addresses: [
			{
				id: '3d2e4731-2423-47c5-8008-05798e647463',
			},
		],
	};
}

function get_user_address(user, address_id) {
	if (!user.addresses) {
		throw new CustomError('Usuário sem endereços cadastrados', 400);
	}

	const address = user.addresses.find(ad => ad.id === address_id);

	if (!address) {
		throw new CustomError('Endereço não pertence ao usuário', 400);
	}

	return address;
}

async function PlaceOrderResolver(_, {input}, {headers}) {
	try {
		const user = get_user(headers.authorization);

		const {
			parts,
			delivery,
			user_address_id,
		} = input;

		const address = get_user_address(user, user_address_id);

		const {items, prices} = await get_batch_info(parts);

		const delivery_info = await get_mail_info(items, delivery);

		await place_order(items, prices, delivery_info, {user, address});

		return {
			subtotal: prices.total,
			delivery: delivery_info,
		};
	} catch (err) {
		throw handle_graphql_error(err);
	}
};

module.exports = {
	PlaceOrderResolver,
};
