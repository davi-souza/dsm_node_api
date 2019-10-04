const { raw_material_weight } = require('../../../libs/part/weight');

/**
 * 0.3 Kg multiplied by 100
 */
const initial_weight = 30;

/**
 * Calculates the raw material price
 * @param {object} part						Part model (there are keys missing)
 * @param {object} material_type			Material type model (there are keys missing)
 *            {number} price_per_kg			Material type's price per kg multiplied by 100 (int)
 * @param {number} amount					How many parts to be manufactured
 * @return {number}							Price multiplied by 100 (int)
 */
function raw_material_price(part, material_type, amount) {
	/** 
	 * All values are multiplied by 100.
	 * To get the real price multiplied by 100 as well, we need to divide the
	 * result by 100
	 */
	const price = raw_material_weight(part, material_type) * (material_type.price_per_kg) / 100;

	/**
	 * Our "input price" for every material type is considering a initial weight
	 * of 0.3 Kg. We need to divide the result by 100 because all values are
	 * multiplied by 100.
	 * Also, we are dividing the initial weight by the number of parts because
	 * we don't want to charge it for every part.
	 */
	//const input_price = (initial_weight / amount) * (material_type.price_per_kg) / 100;
	const input_price = 0;

	/**
	 * In order to increase profit, get the ceil
	 */
	return Math.ceil(price + input_price);
}

module.exports = {
	raw_material_price,
};
