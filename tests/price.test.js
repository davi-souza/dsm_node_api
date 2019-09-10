const { part_price_calc } = require('../services/analysis/price');

const mock = {
	part: {
		id: '1d3c082d-624f-4af6-aa36-69bdbeff84fb',
		name: 'first_part.step',
		storage: 'this-is-us',
		volume: '418879',
		raw_material_volume: '2700000',
	},
	material_type: {
		id: '964daa78-3637-465d-a923-91cfebc059a9',
		name: 'PTFE (Teflon)',
		price_per_kg: 25000,
		specific_weight: 218,
	},
};

test('Should calculate the price right', () => {
	/**
	 * 1. 1472
	 * 2. 9076
	 */
	const price = part_price_calc(mock.part, mock.material_type);

	expect(price).toBe(9076);
});
