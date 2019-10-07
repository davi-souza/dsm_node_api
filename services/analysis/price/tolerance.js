/**
 * Calculates how much the price increases by the chosen tolerance
 * @param {number} raw_price	Material price + service price multiplied by 100 (int)
 * @param {string} tolerance	Part's chosen tolerance. It's enum and it can be null
 * @return {number}				Rate
 */
function tolerance_price(raw_price, tolerance) {
	const tolerance_db = {
		'HIGH': 0,
		'MEDIUM': 0.025,
		'LOW': 0.05,
		'VERY_LOW': 0.10,
	};

	const rate = tolerance_db[
		tolerance ? tolerance : 'HIGH'
	];

	return Math.ceil(raw_price * rate);;
}

module.exports = {
	tolerance_price,
};
