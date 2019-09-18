const { material_type } = require('../../services/db/material');

test('It should fetch all material types', () => {
	return material_type.all().then(types => {
		expect(types.length).toBeGreaterThan(0);
	});
});

test('It should fetch one material types', () => {
	const id = '37a6e9ff-2eff-4ade-ab0e-11934015270d';
	return material_type.one(id).then(type => {
		console.log(type)
		expect(type.id).toBe(id);
	});
});
