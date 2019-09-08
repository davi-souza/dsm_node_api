/**
 * Calculates the price of the part by the material type
 * @param {number} raw_material_volume	Raw material volume in mm3 multiplied by 100 (int)
 * @param {number} specific_weight		Density of the material type in g/cm3 multiplied by 100 (int)
 * @param {number} price_per_kg			Price per kg of the material part multiplied by 100 (int)
 * @return {number}						Part price multiplied by 100 (int)
 */
function price_by_material_price(raw_material_volume, specific_weight, price_per_kg) {
	/** 
	 * Every metric is multiplied by 100 so it can be stored as int
	 * It's necessary to divide them by 100
	 */
	let price = (raw_material_volume / 100) * (specific_weight / 100) * (price_per_kg / 100);

	/**
	 * Due to conversion, it's necessary to divide by 10^-6
	 * But it's desirable to stored the price multiplied by 100 (to be int)
	 * Therefore, it's only necessary to divide by 10^-4
	 */
	price = price * Math.pow(10, -4);

	/**
	 * In order to get more profit, get the ceil
	 */
	price = Math.ceil(price);

	return price;
}

/** Calculates the price of the part
 * @param {object} part	Part
 *            {string} id					Id (UUID)
 *            {string} name					Name
 *            {number} volume				Volume in mm3 multiplied by 100 (int)
 *            {number} raw_material_volume	Raw material volume in mm3 multiplied by 100 (int)
 * @param {object} material_type		Material type
 *            {string} id				Id (UUID)
 *            {string} name				Name
 *            {number} price_per_kg		Price per kg multiplied by 100 (int)
 *            {number} specific_weight	Density in g/cm3 multiplied by 100 (int)
 * @return {number} Price per unit of the Part multiplied by 100 (int)
 */
function part_price_calc(part, material_type) {
	const { raw_material_volume } = part,
		{ price_per_kg, specific_weight } = material_type;

	const material_type_price = price_by_material_price(
		raw_material_volume,
		specific_weight,
		price_per_kg
	);

	return material_type_price;
}

module.exports = {
	part_price_calc,
};
