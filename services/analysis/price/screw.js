/**
 * Calculates the price with screws
 * @param {number} raw_price	Price of the material and service multiplied by 100 (int)
 * @param {object} screw		Chosen screw config. It can be null/undefined
 * @return {number}				Price multiplied by 100 (int)
 */
function screw_price(raw_price, screw) {
	if (!screw) {
		return 0;
	}

	if (screw.type === 'EXTERNAL') {
		return Math.ceil(raw_price * 0.10);
	}

	return Math.ceil(raw_price * 0.02 * Math.ceil(screw.amount / 10));
}

module.exports = {
	screw_price,
};

