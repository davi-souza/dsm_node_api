const { raw_material_weight } = require('../../../libs/part/weight');

/**
 * Calculates the raw material price
 * @param {object} part						Part model (there are keys missing)
 * @param {object} material_type			Material type model (there are keys missing)
 *            {number} price_per_kg			Material type's price per kg multiplied by 100 (int)
 * @return {number}							Price multiplied by 100 (int)
 */
function raw_material_price(part, material_type) {
	/** 
	 * Both values are multiplied by 100.
	 * To get the real price multiplied by 100 as well, we need to divide the
	 * result by 100
	 */
	const price = raw_material_weight(part, material_type) * (material_type.price_per_kg) / 100;

	/**
	 * In order to increase profit, get the ceil
	 */
	return Math.ceil(price);
}

module.exports = {
	raw_material_price,
};
