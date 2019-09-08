const { get_part } = require('../../services/db/part');
const { get_material_type } = require('../../services/db/material');
const { part_price_calc } = require('../../services/analysis/price');

async function ChangePartOptionsResolver(_, {part_id, material_type_id, qtd}) {
	const [part, material_type] = await Promise.all([
		get_part(part_id),
		get_material_type(material_type_id),
	]);

	const unit_price = part_price_calc(part, material_type);

	return {
		...part,
		material_type_id: material_type.id,
		unit_price,
		qtd,
	};
}

module.exports = {
	ChangePartOptionsResolver,
};
