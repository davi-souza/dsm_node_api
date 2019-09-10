/**
 * Calculates the price of the delivery
 * @return {number}	Price multiplied by 100 (int)
 */
function delivery_price() {
	return 0;
}

/**
 * Calculates the price of the work of the machine to remove the necessary volume
 * @param {number} raw_material_volume	Raw material volume in mm3 multiplied by 100 (int)
 * @param {number} volume				Part's final volume in mm3 multiplied by 100 (int)
 * @return {number}						Price multiplied by 100 (int)
 */
function volume_diff_price(raw_material_volume, volume) {
	/**
	 * removal_speed: How fast can the machine remove material in mm3/s
	 * price_per_hour: How much it cost to use the machine per hour
	 *                 in real*100/hour (to be an int)
	 */
	const removal_speed = 10,
		price_per_hour = 12000;

	/**
	 * Volume delta in mm3
	 */
	const volume_delta = (raw_material_volume - volume) / 100;

	/**
	 * Estimated time to remove the material. From raw_material to part
	 * In seconds
	 */
	const required_time = volume_delta / removal_speed;

	/**
	 * In order to increase profit, get the ceil
	 */
	return Math.ceil(required_time * price_per_hour / 60 / 60);
}

/**
 * Calculates the raw material price
 * @param {number} raw_material_volume	Raw material volume in mm3 multiplied by 100 (int)
 * @param {number} specific_weight		Density of the material type in g/cm3 multiplied by 100 (int)
 * @param {number} price_per_kg			Price per kg of the material part multiplied by 100 (int)
 * @return {number}						Price multiplied by 100 (int)
 */
function raw_material_price(raw_material_volume, specific_weight, price_per_kg) {
	/** 
	 * Every metric is multiplied by 100 so it can be stored as int
	 * It's necessary to divide them by 100
	 *
	 * Due to conversion, it's necessary to divide by 10^-6
	 * But it's desirable to stored the price multiplied by 100 (to be int)
	 * Therefore, it's only necessary to divide by 10^-4
	 */
	const price = (raw_material_volume / 100) * (specific_weight / 100) * (price_per_kg / 100) / 10000;

	/**
	 * In order to increase profit, get the ceil
	 */
	return Math.ceil(price);
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
	const { volume, raw_material_volume } = part,
		{ price_per_kg, specific_weight } = material_type;

	let price = raw_material_price(
		raw_material_volume,
		specific_weight,
		price_per_kg
	);

	price += volume_diff_price(
		raw_material_volume,
		volume
	);

	price += delivery_price();

	return price;
}

module.exports = {
	part_price_calc,
};
