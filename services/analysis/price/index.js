const {
	supplier_profit_rate,
	mech4u_profit_rate,
} = require('./profit');
const { raw_material_price } = require('./raw_material');
const { volume_diff_price } = require('./volume');
const {
	heat_treatment_price,
	superficial_treatment_price,
} = require('./treatment');
const { tolerance_rate } = require('./tolerance');
const { finishing_rate } = require('./finishing');
const { screw_price } = require('./screw');
const { engraving_price } = require('./engraving');
const { report_price } = require('./report');

/**
 * In order to get closer to the real price for the "volume diff" part,
 * it's necessary to lower the price as a function of the volume
 * @param {number} raw_price				Price before the decrease multiplied by 100 (int)
 * @param {object} part						Part model (there are keys missing)
 *            {number} volume				Part's volume multiplied by 100 in mm3 (int)
 * @param {number} amount					How many parts to be manufactured
 * @return {number}							New price multiplied by 100 (int)
 */
function lower_price_by_volume(raw_price, part, amount) {
	const decrease_step_db = {
		'SMALL': 10,
		'MEDIUM': 2,
		'BIG': 0,
	};

	function part_size_category() {
		if (part.volume < 1000000) {
			return 'SMALL';
		}

		if (part.volume < 5000000) {
			return 'MEDIUM';
		}

		return 'BIG';
	}

	const step = decrease_step_db[part_size_category()];

	if (amount < 11 || step === 0) {
		return raw_price;
	}

	let final_price = raw_price;

	if (amount >= 11 && amount < 101) {
		final_price = final_price * (1 - (1 * step / 100));
	} else if (amount >= 101 && amount < 501) {
		final_price = final_price * (1 - (2 * step / 100));
	} else if (amount >= 501 && amount < 1001) {
		final_price = final_price * (1 - (3 * step / 100));
	} else if (amount >= 1001) {
		final_price = final_price * (1 - (4 * step / 100));
	}

	return Math.ceil(final_price);
}

/** 
 * Calculates the price of the part
 * @param {object} item							Item
 *            {object} part						Part
 *                {string} id					Part's id (UUID)
 *                {string} name					Part's name
 *                {number} volume				Part's volume multiplied by 100 in mm3 (int)
 *                {number} raw_material_volume	Part's raw material volume multiplied by 100 in mm3 (int)
 *            {object} material_type			Chosen material type
 *                {string} id					Material type's id (UUID)
 *                {string} name					Material type's name
 *                {number} price_per_kg			Material type's price per kg multiplied by 100 (int)
 *                {number} specific_weight		Material type's density multiplied by 100 in g/cm3 (int)
 *            {number} tolerance				Part's tolerance. It's a value between (0.00, 0.15]. The default is 0.15
 *            {string} finishing				Part's finishing type. It is an ENUM
 *            {string} engraving				Part's engraving. It is an ENUM
 *            {string} report					Part's report. It is an ENUM
 *            {object} heat_treatment			Chosen heat treatment (it can be null)
 *                {string} id					Heat treatment's id
 *                {string} name					Heat treatment's name
 *                {number} minimum_price		Heat treatment's minimum price
 *                {number} price_per_kg			Heat treatment's price per kg multiplied by 100 (int)
 *            {object} superficial_treatment	Chosen superficial treatment (it can be null)
 *                {string} id					Superficial treatment's id
 *                {string} name					Superficial treatment's name
 *                {number} minimum_price		Superficial treatment's minimum price
 *                {number} price_per_kg			Superficial treatment's price per kg multiplied by 100 (int)
 *            {object} screw					Screw config. It can be null
 *                {string} type					Screw type enum
 *                {number} amount				How many screws
 *            {number} amount					How many parts to be created (int)
 * @return {object}								Returned object with all prices
 *            {number} supplier					Supplier's profit
 *            {number} mech4u					Company's profit
 *            {number} raw_material				Raw material price
 *            {number} volume_diff				Price for the machinery to work
 *            {number} heat_treatment			Heat treatment's price
 *            {number} superficial_treatment	Superficial treatment's price
 *            {number} screws					Price for the number of screws
 *            {number} total					Total price of the part
 */
function part_price_calc(item) {
	const item_prices = {};

	item_prices.raw_material = raw_material_price(
		item.part,
		item.material_type,
		item.amount
	);
	item_prices.volume_diff = volume_diff_price(
		item.part,
		item.material_type,
		item.amount
	);

	const pre_raw_price = Object.values(item_prices).reduce((sum, current) => sum + current, 0),
		raw_price = lower_price_by_volume(pre_raw_price, item.part, item.amount);

	item_prices.tolerance = Math.ceil(raw_price * tolerance_rate(item.tolerance));
	item_prices.finishing = Math.ceil(raw_price * finishing_rate(item.finishing));
	item_prices.screws = screw_price(raw_price, item.screw);
	item_prices.engraving = engraving_price(raw_price, item.engraving);
	item_prices.report = report_price(raw_price, item.report);

	item_prices.heat_treatment = heat_treatment_price(
		item.part,
		item.material_type,
		item.heat_treatment,
		item.amount
	);
	item_prices.superficial_treatment = superficial_treatment_price(
		item.part,
		item.material_type,
		item.superficial_treatment,
		item.amount
	);

	const sub_total = Object.values(item_prices).reduce((sum, current) => sum + current, 0);
	item_prices.supplier = Math.ceil(sub_total * supplier_profit_rate(item.amount));
	item_prices.mech4u = Math.ceil(sub_total * mech4u_profit_rate(item.amount));

	return {
		...item_prices,
		total: Math.ceil(Object.values(item_prices).reduce((sum, current) => sum + current, 0)),
	};
}

/**
 * Calculates the price of the part batch
 * @param {object[]} items						Part batch
 *            {object} part						Part
 *                {string} id					Part's id (UUID)
 *                {string} name					Part's name
 *                {number} volume				Part's volume multiplied by 100 in mm3 (int)
 *                {number} raw_material_volume	Part's raw material volume multiplied by 100 in mm3 (int)
 *            {object} material_type			Chosen material type
 *                {string} id					Material type's id (UUID)
 *                {string} name					Material type's name
 *                {number} price_per_kg			Material type's price per kg multiplied by 100 (int)
 *                {number} specific_weight		Material type's density multiplied by 100 in g/cm3 (int)
 *            {number} tolerance				Part's tolerance. It's a value between (0.00, 0.15]
 *            {string} finishing				Part's finishing type. It is an ENUM
 *            {object} heat_treatment			Chosen heat treatment (it can be null)
 *                {string} id					Heat treatment's id
 *                {string} name					Heat treatment's name
 *                {number} minimum_price		Heat treatment's minimum price
 *                {number} price_per_kg			Heat treatment's price per kg multiplied by 100 (int)
 *            {object} superficial_treatment	Chosen superficial treatment (it can be null)
 *                {string} id					Superficial treatment's id
 *                {string} name					Superficial treatment's name
 *                {number} minimum_price		Superficial treatment's minimum price
 *                {number} price_per_kg			Superficial treatment's price per kg multiplied by 100 (int)
 *            {number} screw_amount				How many screws the part has (int)
 *            {number} amount					How many parts to be created (int)
 * @return {object}								Batch with price
 *             {...object} ...params			Same keys as the input params
 *             									there are going to be "unit_prices" as well
 *             									where it list all prices categories and the total
 *             {object} prices					All price categories for the whole batch
 */
function part_batch_price_calc(items) {
	const processed_heat_treatments = [],
		processed_superficial_treatments = [],
		processed_material_types = [];

	const result = {
		items: items.map(item => {
			if (item.heat_treatment !== null &&
				!processed_heat_treatments.find(t => t.id === item.heat_treatment.id)) {
				processed_heat_treatments.push({
					id: item.heat_treatment.id,
					minimum_price: item.heat_treatment.minimum_price,
				});
			}

			if (item.superficial_treatment !== null &&
				!processed_superficial_treatments.find(t => t.id === item.superficial_treatment.id)) {
				processed_superficial_treatments.push({
					id: item.superficial_treatment.id,
					minimum_price: item.superficial_treatment.minimum_price,
				});
			}

			if (!processed_material_types.find(mt => mt.id === item.material_type.id)) {
				processed_material_types.push({
					id: item.material_type.id,
					price_per_kg: item.material_type.price_per_kg,
				});
			}

			return {
				...item,
				unit_prices: part_price_calc(item),
			}
		}),
	};

	result.prices = result.items.reduce((current, item) => {
		Object.entries(item.unit_prices).forEach(([key, value]) => {
			if (!!value && !isNaN(value)) {
				if (!current[key]) {
					current[key] = 0;
				}

				current[key] += value * item.amount;
			}
		});

		return current;
	}, {});

	/**
	 * As requested, the "initial values" are going to be
	 * added part by part
	 *
	 * I'm leaving this commented in case we want to use it again
	 */
	//processed_heat_treatments.forEach(ht => {
	//	result.prices.heat_treatment += ht.minimum_price;
	//});

	//processed_superficial_treatments.forEach(st => {
	//	result.prices.superficial_treatment += st.minimum_price;
	//});

	//processed_material_types.forEach(mt => {
	//	result.prices.raw_material += Math.ceil(0.3 * mt.price_per_kg);
	//});

	result.prices.total = 0;

	result.prices.total = Object.values(result.prices).reduce((sum, current) => sum + current, 0);

	return result;
}

module.exports = {
	part_batch_price_calc,
	part_price_calc,
};
