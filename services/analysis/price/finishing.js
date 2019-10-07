/**
 * Calculates how much the price increases by the chosen finishing
 * @param {number} raw_price	Material price + service price multiplied by 100 (int)
 * @param {string} finishing	Part's chosen finishing
 * @return {number}				Rate
 */
function finishing_price(raw_price, finishing) {
	const finishing_db = {
		'STANDARD': 0,
		'PRECISION': 0.025,
		'RECTIFIED': 0.05,
		'POLISHED': 0.10,
	};

	const rate = finishing_db[
		finishing ? finishing : 'STANDARD'
	];

	return Math.ceil(raw_price * rate);
}

module.exports = {
	finishing_price,
};
