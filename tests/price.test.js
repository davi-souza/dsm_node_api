const {
	part_price_calc,
	part_batch_price_calc,
} = require('../services/analysis/price');

const part = {
		id: 'd61a9c66-4b77-40cb-8342-58a770cfaff9',
		name: 'first_part.step',
		storage: 'this-is-us',
		volume: 1059403,
		raw_material_volume: 13820857,
	},
	material_type = {
		id: '30f33402-3153-4d97-b9e3-2b182c0404f2',
		name: 'Aço SAE O1 (VND)',
		price_per_kg: 4000,
		specific_weight: 783,
		hardness: 'HIGH',
	},
	tolerance = 0.15,
	finishing = 'STANDARD', 
	heat_treatment = {
		id: 'cbb8a58b-2e5f-4c72-8b21-e097c5c4c4a5',
		name: 'Têmpera',
		minimum_price: 6000,
		price_per_kg: 6000,
	},
	superficial_treatment = {
		id: '93305296-6767-4f5c-9de9-c1b9a8c67542',
		name: 'Zinco',
		minimum_price: 3500,
		price_per_kg: 3500,
	},
	screw_amount = 0;

test('It should calculated price be integer', () => {
	const price = part_price_calc({
		part,
		material_type,
		tolerance: 0.02,
		finishing: 'POLISHED',
		heat_treatment,
		superficial_treatment,
		screw_amount: 10,
		amount: 1,
	});

	expect(Number.isInteger(price.total)).toBeTruthy();
});

test('It should greater quantity costs less', () => {
	const price_less_parts = part_price_calc({
		part,
		material_type,
		tolerance,
		finishing,
		heat_treatment,
		superficial_treatment,
		screw_amount,
		amount: 1,
	});

	const price_more_parts = part_price_calc({
		part,
		material_type,
		tolerance,
		finishing,
		heat_treatment,
		superficial_treatment,
		screw_amount,
		amount: 10,
	});

	expect(price_less_parts.total).toBeGreaterThanOrEqual(price_more_parts.total);
});

test('It should lower hardness costs less', () => {
	const price_higher_hardness = part_price_calc({
		part,
		material_type: {
			...material_type,
			hardness: 'HIGH',
		},
		tolerance,
		finishing,
		heat_treatment,
		superficial_treatment,
		screw_amount,
		amount: 1,
	});

	const price_lower_hardness = part_price_calc({
		part,
		material_type: {
			...material_type,
			hardness: 'LOW',
		},
		tolerance,
		finishing,
		heat_treatment,
		superficial_treatment,
		screw_amount,
		amount: 1,
	});

	expect(price_higher_hardness.total).toBeGreaterThanOrEqual(price_lower_hardness.total);
});

test('It should increase price when screw amount if not 0', () => {
	const price_without_screws = part_price_calc({
		part,
		material_type,
		tolerance,
		finishing,
		heat_treatment,
		superficial_treatment,
		screw_amount: 0,
		amount: 1,
	});

	const price_with_screws = part_price_calc({
		part,
		material_type,
		tolerance,
		finishing,
		heat_treatment,
		superficial_treatment,
		screw_amount: 10,
		amount: 1,
	});

	expect(price_with_screws.total).toBeGreaterThanOrEqual(price_without_screws.total);
});

test('It should increase price when tolerance decrease', () => {
	const price_higher_tolerance = part_price_calc({
		part,
		material_type,
		tolerance,
		finishing,
		heat_treatment,
		superficial_treatment,
		screw_amount: 0,
		amount: 1,
	});

	const price_lower_tolerance = part_price_calc({
		part,
		material_type,
		tolerance: 0.08,
		finishing,
		heat_treatment,
		superficial_treatment,
		screw_amount: 10,
		amount: 1,
	});

	const price_very_lower_tolerance = part_price_calc({
		part,
		material_type,
		tolerance: 0.01,
		finishing,
		heat_treatment,
		superficial_treatment,
		screw_amount: 10,
		amount: 1,
	});

	expect(price_lower_tolerance.total).toBeGreaterThanOrEqual(price_higher_tolerance.total);
	expect(price_very_lower_tolerance.total).toBeGreaterThanOrEqual(price_lower_tolerance.total);
});

test('It should calculate batch correctly', () => {
	const batch = [
		{
			part,
			material_type,
			tolerance: 0.02,
			finishing: 'POLISHED',
			heat_treatment,
			superficial_treatment,
			screw_amount: 10,
			amount: 1,
		},
	];

	const {prices} = part_batch_price_calc(batch);

	expect(Number.isInteger(prices.total)).toBeTruthy();
});
