/**
 * Calculates the report price
 * @param {number} raw_price	Material + service price multiplied by 100 (int)
 * @param {string} report		Chosen report. It can be null
 * @return {number}				Engraving price multiplied by 100 (int)
 */
function report_price(raw_price, report) {
	const report_db = {
		'STANDARD': {
			base: 0,
			rate: 0,
		},
		'MEASUREMENT_3D': {
			base: 5000,
			rate: 0.03,
		},
	};

	if (!report || !Object.keys(report_db).includes(report)) {
		return 0;
	}

	const {base, rate} = report_db[report];
	
	return Math.ceil(base + rate * raw_price);
}

module.exports = {
	report_price,
};
