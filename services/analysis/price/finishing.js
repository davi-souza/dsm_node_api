/**
 * Calculates how much the price increases by the chosen finishing
 * @param {string} finishing	Part's chosen finishing
 * @return {number}				Rate
 */
function finishing_rate(finishing) {
	if (finishing === 'POLISHED') {
		return 0.10;
	} else if (finishing === 'RECTIFIED') {
		return 0.05;
	}

	return 0;
}

module.exports = {
	finishing_rate,
};
