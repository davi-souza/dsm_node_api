/**
 * Calculates the engraving price
 * @param {number} raw_price	Material + service price multiplied by 100 (int)
 * @param {string} engraving	Chosen engraving. It can be null
 * @return {number}				Engraving price multiplied by 100 (int)
 */
function engraving_price(raw_price, engraving) {
	const engraving_db = {
		'TYPED': {
			base: 1000,
			rate: 0.01,
		},
		'ELETRIC_PNEUMATIC_PEN': {
			base: 500,
			rate: 0.01,
		},
		'LOW_RELIEF_MACHINING': {
			base: 5000,
			rate: 0.01,
		},
		'LASER': {
			base: 2000,
			rate: 0.01,
		},
		'ELECTROCHEMISTRY': {
			base: 2000,
			rate: 0.01,
		},
	};

	if (!engraving || !Object.keys(engraving_db).includes(engraving)) {
		return 0;
	}

	const {base, rate} = engraving_db[engraving];

	return Math.ceil(base + raw_price * rate);
}

module.exports = {
	engraving_price,
};
