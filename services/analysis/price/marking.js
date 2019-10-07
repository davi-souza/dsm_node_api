/**
 * Calculates the marking price
 * @param {number} raw_price	Material + service price multiplied by 100 (int)
 * @param {string} marking		Chosen marking. It can be null
 * @return {number}				Marking price multiplied by 100 (int)
 */
function marking_price(raw_price, marking) {
	const marking_db = {
		'TYPED': {
			base: 0,
			rate: 0.03,
		},
		'ELETRIC_PNEUMATIC_PEN': {
			base: 0,
			rate: 0.02,
		},
		'LOW_RELIEF_MACHINING': {
			base: 0,
			rate: 0.1,
		},
		'LASER': {
			base: 0,
			rate: 0.08,
		},
		'ELECTROCHEMISTRY': {
			base: 0,
			rate: 0.05,
		},
	};

	if (!marking || !Object.keys(marking_db).includes(marking)) {
		return 0;
	}

	const {base, rate} = marking_db[marking];

	return Math.ceil(base + raw_price * rate);
}

module.exports = {
	marking_price,
};
