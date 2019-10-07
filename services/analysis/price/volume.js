/**
 *  Calculates the removal speed
 *  @param {object} material_type	The query result (material model)
 *             {string} hardness	How hard is the material (LOW, MEDIUM or HIGH)
 *  @param {number} amount			How many parts to be processed (int)
 *  @return number 					Machining time in mm3/s multiplied by 100 (int)
 */
function machining_speed(material_type, amount) {
	const speed_db = {
		'LOW': {
			base_speed: 2200,
			step: 200,
		},
		'MEDIUM': {
			base_speed: 1600,
			step: 200,
		},
		'HIGH': {
			base_speed: 1000,
			step: 200,
		},
	};

	const {base_speed, step} = speed_db[material_type.hardness];

	if (amount < 2) {
		return base_speed;
	} else if (amount < 6) {
		return base_speed + step;
	} else if (amount < 21) {
		return base_speed + 2 * step;
	} else if (amount < 51) {
		return base_speed + 3 * step;
	} else if (amount < 101) {
		return base_speed + 4 * step;
	} else if (amount < 500) {
		return base_speed + 5 * step;
	} else if (amount < 1000) {
		return base_speed + 6 * step;
	}

	return base_speed + 7 * step;
}

/**
 * Calculates the price of the work of the machine to remove the necessary volume
 * @param {object} part						Part model (there are keys missing)
 *            {number} volume				Part's volume multiplied by 100 in mm3 (int)
 *            {number} raw_material_volume	Part's volume multiplied by 100 in mm3 (int)
 * @param {object} material_type			Material type model
 * @param {number} amount					How many parts to make (int)
 * @return {number}							Price multiplied by 100 (int)
 */
function volume_diff_price(part, material_type, amount) {
	const removal_speed = machining_speed(material_type, amount) / 100;

	/**
	 * price_per_hour: How much it cost to use the machine per hour
	 *                 in real*100/hour (to be an int)
	 */
	const price_per_hour = 10000;

	/**
	 * Volume delta in mm3
	 */
	const volume_delta = (part.raw_material_volume - part.volume) / 100;

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

module.exports = {
	machining_speed,
	volume_diff_price,
};
