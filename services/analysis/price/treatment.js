const { part_weight } = require('../../../libs/part/weight');

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

	/**
	 * As both variables are multiplied by 100, we need to divide by 100 to correct the price
	 */
	const dynamic_price = heat_treatment.price_per_kg * part_weight(part, material_type) / 100;

	//const static_price = heat_treatment.minimum_price / amount;
	const static_price = 0;

	return Math.ceil(dynamic_price + static_price);
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

	/**
	 * As both variables are multiplied by 100, we need to divide by 100 to correct the price
	 */
	const dynamic_price = superficial_treatment.price_per_kg * part_weight(part, material_type) / 100;

	//const static_price = superficial_treatment.minimum_price / amount;
	const static_price = 0;

	return Math.ceil(dynamic_price + static_price);
}

module.exports = {
	heat_treatment_price,
	superficial_treatment_price,
};
