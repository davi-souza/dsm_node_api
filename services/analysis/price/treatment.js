const { part_weight } = require('../../../libs/part/weight');

function get_treatment_price(repository, treatment, total_weight) {
	const {id} = treatment;

	if (!(id in repository)) {
		return 0;
	}

	for (const {max_weight, min_weight, price_per_kg} of repository[id]) {
		if (max_weight && total_weight <= max_weight) {
			return price_per_kg;
		} else if (min_weight && total_weight > min_weight) {
			return price_per_kg;
		}
	}

	return 0;
}

/**
 * Calculates the price to apply the chosen heat treatment
 * @param {object} part					Part model (there are keys missing)
 *            {number} volume			Part's volume multiplied by 100 in mm3 (int)
 * @param {object} material_type		Chosen material type (there are keys missing)
 *            {number} specific_weight	Material type's specific weight multiplied by 100 in g/cm3 (int)
 * @param {object} heat_treatment		Heat Treatment model (there are keys missing)
 *            {string} minimum_price	Heat Treatment's minimum_price multiplied by 100 (int)
 *            {string} price_per_kg		Heat Treatment's price per kg multiplied by 100 (int)
 * @param {number} amount				How many parts to manufactured
 * @return {number}						Heat treatment's price multiplied by 100 (int)
 */
function heat_treatment_price(part, material_type, heat_treatment, amount) {
	if (!heat_treatment) {
		return 0;
	}

	const weight = part_weight(part, material_type),
		price_per_kg = get_treatment_price(heat_price_repository, heat_treatment, weight * amount);

	/**
	 * As both variables are multiplied by 100, we need to divide by 100 to correct the price
	 */
	return Math.ceil(price_per_kg * weight / 100);
}

/**
 * Calculates the price to apply the chosen superficial treatment
 * @param {object} part						Part model (there are keys missing)
 *            {number} volume				Part's volume multiplied by 100 in mm3 (int)
 * @param {object} material_type			Chosen material type (there are keys missing)
 *            {number} specific_weight		Material type's specific weight multiplied by 100 in g/cm3 (int)
 * @param {object} superficial_treatment	Chosen heat treatment
 *            {string} minimum_price		Superficial Treatment's minimum_price multiplied by 100 (int)
 *            {string} price_per_kg			Superficial Treatment's price per kg multiplied by 100 (int)
 * @param {number} part_weight				Part's weight multiplied by 100 in kg (int)
 * @param {number} amount					How many parts to manufactured
 * @return {number}							Superficial treatment's price multiplied by 100 (int)
 */
function superficial_treatment_price(part, material_type, superficial_treatment, amount) {
	if (!superficial_treatment) {
		return 0;
	}

	const weight = part_weight(part, material_type),
		price_per_kg = get_treatment_price(superficial_price_repository, superficial_treatment, weight * amount);

	/**
	 * As both variables are multiplied by 100, we need to divide by 100 to correct the price
	 */
	return Math.ceil(price_per_kg * weight / 100);
}

const heat_price_repository = {
	'cbb8a58b-2e5f-4c72-8b21-e097c5c4c4a5': [
		{ max_weight: 100, price_per_kg: 24000, },
		{ max_weight: 500, price_per_kg: 20000, },
		{ max_weight: 1000, price_per_kg: 16000, },
		{ max_weight: 1500, price_per_kg: 12000, },
		{ max_weight: 2000, price_per_kg: 8000, },
		{ max_weight: 2500, price_per_kg: 4000, },
		{ max_weight: 3000, price_per_kg: 2500, },
		{ min_weight: 3000, price_per_kg: 1500, },
	],
	'fb829a44-ed10-4333-897a-c17eb6eb26f7': [
		{ max_weight: 100, price_per_kg: 28000, },
		{ max_weight: 500, price_per_kg: 23500, },
		{ max_weight: 1000, price_per_kg: 19000, },
		{ max_weight: 1500, price_per_kg: 14500, },
		{ max_weight: 2000, price_per_kg: 10000, },
		{ max_weight: 2500, price_per_kg: 5500, },
		{ max_weight: 3000, price_per_kg: 3500, },
		{ min_weight: 3000, price_per_kg: 2000, },
	],
};

const superficial_price_repository = {
	'93305296-6767-4f5c-9de9-c1b9a8c67542': [
		{ max_weight: 100, price_per_kg: 14000, },
		{ max_weight: 500, price_per_kg: 12000, },
		{ max_weight: 1000, price_per_kg: 10000, },
		{ max_weight: 1500, price_per_kg: 8000, },
		{ max_weight: 2000, price_per_kg: 6000, },
		{ max_weight: 2500, price_per_kg: 4000, },
		{ max_weight: 3000, price_per_kg: 2000, },
		{ max_weight: 3500, price_per_kg: 1500, },
		{ max_weight: 4000, price_per_kg: 1000, },
		{ min_weight: 4000, price_per_kg: 700, },
	],
	'0f325cd8-d0d9-466d-8424-d3c0d8af6e2e': [
		{ max_weight: 100, price_per_kg: 16000, },
		{ max_weight: 500, price_per_kg: 14000, },
		{ max_weight: 1000, price_per_kg: 12000, },
		{ max_weight: 1500, price_per_kg: 10000, },
		{ max_weight: 2000, price_per_kg: 8000, },
		{ max_weight: 2500, price_per_kg: 6000, },
		{ max_weight: 3000, price_per_kg: 4000, },
		{ max_weight: 3500, price_per_kg: 2000, },
		{ max_weight: 4000, price_per_kg: 1500, },
		{ min_weight: 4000, price_per_kg: 1000, },
	],
	'f403b3bd-5d64-4eea-9498-8a543d3bc07e': [
		{ max_weight: 100, price_per_kg: 12000, },
		{ max_weight: 500, price_per_kg: 10500, },
		{ max_weight: 1000, price_per_kg: 9000, },
		{ max_weight: 1500, price_per_kg: 7500, },
		{ max_weight: 2000, price_per_kg: 6000, },
		{ max_weight: 2500, price_per_kg: 4500, },
		{ max_weight: 3000, price_per_kg: 3000, },
		{ max_weight: 3500, price_per_kg: 1500, },
		{ max_weight: 4000, price_per_kg: 1000, },
		{ min_weight: 4000, price_per_kg: 600, },
	],
	'22b26118-c992-4d14-94e5-4ff1a942637d': [
		{ max_weight: 100, price_per_kg: 40000, },
		{ max_weight: 500, price_per_kg: 35500, },
		{ max_weight: 1000, price_per_kg: 31000, },
		{ max_weight: 1500, price_per_kg: 26500, },
		{ max_weight: 2000, price_per_kg: 22000, },
		{ max_weight: 2500, price_per_kg: 17500, },
		{ max_weight: 3000, price_per_kg: 13000, },
		{ max_weight: 3500, price_per_kg: 8500, },
		{ max_weight: 4000, price_per_kg: 6000, },
		{ min_weight: 4000, price_per_kg: 4000, },
	],
	'ed6370b6-3e2c-458b-9462-e6eb4eea7240': [
		{ max_weight: 100, price_per_kg: 40000, },
		{ max_weight: 500, price_per_kg: 35500, },
		{ max_weight: 1000, price_per_kg: 31000, },
		{ max_weight: 1500, price_per_kg: 26500, },
		{ max_weight: 2000, price_per_kg: 22000, },
		{ max_weight: 2500, price_per_kg: 17500, },
		{ max_weight: 3000, price_per_kg: 13000, },
		{ max_weight: 3500, price_per_kg: 8500, },
		{ max_weight: 4000, price_per_kg: 6000, },
		{ min_weight: 4000, price_per_kg: 4000, },
	],
};

module.exports = {
	heat_treatment_price,
	superficial_treatment_price,
};
