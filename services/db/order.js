const uuid_v4 = require('uuid/v4');
const db = require('../../models');
const { CustomError } = require('../../libs/error');
const { new_order_email } = require('../../services/email');

function process_order(order) {
	return {
		...order.dataValues,
		address: order.address.dataValues,
		user: order.address.dataValues.user.dataValues,
		parts: order.parts.map(op => ({
			...op.dataValues,
			part: op.part.dataValues,
			material_type: op.material_type.dataValues,
			heat_treatment: op.heat_treatment ? op.heat_treatment.dataValues : null,
			superficial_treatment: op.superficial_treatment ? op.superficial_treatment.dataValues : null,
		}))
	};
}

function supplier_payment_calc(prices) {
	return Object.entries(prices).reduce((sum, [key, value]) => {
		if (!['mech4u', 'total'].includes(key)) {
			sum += value;
		}
		return sum;

	}, 0);
}

function process_item(item) {
	return {
		id: uuid_v4(),
		part_id: item.part.id,
		amount: item.amount,
		material_type_id: item.material_type.id,
		heat_treatment_id: item.heat_treatment.id,
		superficial_treatment_id: item.superficial_treatment.id,
		tolerance: Math.ceil(item.tolerance * 100),
		finishing: item.finishing,
		raw_material_price: item.unit_prices.raw_material,
		volume_diff_price: item.unit_prices.volume_diff,
		heat_treatment_price: item.unit_prices.heat_treatment,
		superficial_treatment_price: item.unit_prices.superficial_treatment,
		tolerance_price: item.unit_prices.superficial_treatment,
		finishing_price: item.unit_prices.finishing,
		screw_price: item.unit_prices.screws,
		supplier_profit: item.unit_prices.supplier,
		mech4u_profit: item.unit_prices.mech4u,
	};
}

/**
 * Creates a order
 *
 * OBS: "unit_prices" and "prices" have the same keys
 *     - supplier
 *     - mech4u
 *     - raw_material
 *     - volume_diff
 *     - heat_treatment
 *     - superficial_treatment
 *     - tolerance
 *     - finishing
 *     - screws
 *     - total
 * @params {object[]} items
 *             {object} part					Part model
 *             {object} material_type			Material Type model
 *             {number} tolerance				Tolerance (can be null and not int)
 *             {string} finishing				Finishing (can be null and not int)
 *             {object} heat_treatment			Heat treatment model (can be null)
 *             {object} superficial_treatment	Superficial treatment model (can be null)
 *             {number} screw_amount			Number of screws (can be 0)
 *             {number} amount					Number of parts (minimum 1)
 *             {object} unit_prices				Object with the prices categories of the part
 * @param {object} prices						Object with total of the prices categories
 * @param {object} delivery						Object with delivery info
 *            {number} price					Delivery price (int)
 *            {date} at							Delivery estimated date
 * @param {object} user_info
 *            {object} user						User model
 *            {object} address					User Address model
 */
function place_order(items, prices, delivery, user_info) {
	return db.sequelize
		.transaction(transaction => {
			return db.Part.update({
				user_id: user_info.user.id,
			}, {
				where: {
					id: {
						[db.Sequelize.Op.in]: Array.from(new Set(items.map(item => item.part.id))),
					},
				},
				transaction,
			}).then((_) => {
				return db.Order.create({
					id: uuid_v4(),
					status: 'PENDING',
					user_address_id: user_info.address.id,
					supplier_payment: supplier_payment_calc(prices),
					mech4u_payment: prices.mech4u,
					delivery_cost: delivery.price,
					delivery_at: delivery.at,
					tax_payment: 0,
					parts: items.map(process_item),
				}, {
					transaction,
					include: [{
						model: db.OrderPart,
						as: 'parts',
					}],
				});
			});
		})
		.then(created_order => {
			 Promise.all([
				db.Order.findOne({
					include: [
						{
							model: db.UserAddress,
							as: 'address',
							include: [{
								model: db.User,
								as: 'user',
							}],
						},
						{
							model: db.OrderPart,
							as: 'parts',
							include: [
								{
									model: db.Part,
									as: 'part',
								},
								{
									model: db.MaterialType,
									as: 'material_type',
								},
								{
									model: db.HeatTreatment,
									as: 'heat_treatment',
								},
								{
									model: db.SuperficialTreatment,
									as: 'superficial_treatment',
								},
							],
						},
					],
					where: {
						id: created_order.dataValues.id,
					},
				}),
				db.Supplier.findAll({
					attributes: ['name', 'email'],
					raw: true,
				})
			 ]).then(([raw_order, suppliers]) => {
				 const order = process_order(raw_order);
				 return new_order_email(order.user, suppliers, order);
			 });
		})
		.catch(console.warn);
}

module.exports = {
	place_order,
};
