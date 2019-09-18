/**
 * Supplier profit percentage
 * @param {number} amount	How much parts are going to be make
 * @return {number}			Percentage (0 <= p <= 1)
 */
function supplier_profit_rate(amount) {
	if (amount < 3) {
		return 0.30;
	} else if (amount < 11) {
		return 0.25;
	} else if (amount < 51) {
		return 0.20;
	} else if (amount < 101) {
		return 0.15;
	} else if (amount < 501) {
		return 0.10;
	}

	return 0.05;
}

/**
 * Mech4u profit percentage
 * @param {number} amount	How much parts are going to be make
 * @return {number}			Percentage (0 <= p <= 1)
 */
function mech4u_profit_rate(amount) {
	return 0.20;
}

module.exports = {
	supplier_profit_rate,
	mech4u_profit_rate,
};
