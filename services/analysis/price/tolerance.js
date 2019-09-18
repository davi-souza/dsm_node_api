/**
 * Calculates how much the price increases by the chosen tolerance
 * @param {string} tolerance	Part's chosen tolerance
 * @return {number}				Rate
 */
function tolerance_rate(tolerance) {
	if (!tolerance || tolerance >= 0.15) {
		return 0;
	} else if (tolerance >= 0.03) {
		return 0.05;
	}

	return 0.10;
}

module.exports = {
	tolerance_rate,
};
