const uuid_v4 = require('uuid/v4');
const db = require('../../models');
const { get_material_type } = require('../../db/material');
const { get_part } = require('../../db/part');
const { part_price_calc } = require('../../analysis/price');
const { CustomError } = require('../../libs/error');

/**
 * Creates a order
 * @param {string} address				User's address (uuid)
 * @param {object[]} parts				Parts info
 *            {string} id				Part's id (uuid)
 *            {string} material_type_id	Part's material_type (uuid)
 *            {number} qtd				Part's qtd
 */
async function place_order(address, parts) {
	try {
		let total = 0;

		const part_to_create = [];

		for (const part of parts) {
			const [
				fetched_part,
				fetched_material_type
			] = await Promise.all([
				get_part(part.id),
				get_material_type(part.material_type_id)
			]);

			const price = part_price_calc(fetched_part, fetched_material_type);

			parts_to_create.push({
				...part,
				unit_price: price,
			});

			total += price;
		}

		const order = db.Order.create({
			id: uuid_v4(),
			orderParts: parts_to_create.map(part => ({
				id: uuid_v4(),
				qtd: part.qtd,
				unit_price: part.unit_price,
				material_type_id: part.material_type,
				part_id: part.id,
			})),
			address,
		}, {
			include: [
				{
					model: db.OrderPart,
					as: 'orderParts',
				},
				{
					model: db.UserAddress,
					as: 'address',
				},
			],
		});
	} catch (err) {
		console.warn(err);
	
		throw err;
	}

}
