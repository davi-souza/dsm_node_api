/**
 * Calculates how much the price increases the number os screws
 * @param {number} screw_amount	Part's number of screws
 * @return {number}				Rate
 */
function screws_rate(screw_amount) {
	if (screw_amount > 0) {
		return 0.05;
	}

	return 0;
}

module.exports = {
	screws_rate,
};

