const { get_treatments } = require('./treatment');
const { get_parts_by_ids } = require('../../services/db/part');
const { get_material_types_by_ids } = require('../../services/db/material');
const { part_batch_price_calc } = require('../../services/analysis/price');

async function get_batch_info(parts) {
	const [
		fetched_parts,
		fetched_material_types,
	] = await Promise.all([
		get_parts_by_ids(parts.map(p => p.part_id)),
		get_material_types_by_ids(parts.map(p => p.material_type_id)),
	]);

	const pre_items = parts.map(p => {
		const material_type = fetched_material_types
			.find(fmt => fmt.id === p.material_type_id);

		const {
			heat_treatment,
			superficial_treatment,
		} = get_treatments(material_type, p.heat_treatment_id, p.superficial_treatment_id);

		return {
			part: fetched_parts.find(fp => fp.id === p.part_id),
			material_type,
			heat_treatment,
			superficial_treatment,
			tolerance: p.tolerance,
			finishing: p.finishing,
			inspection_id: p.inspection_id,
			screw_amount: p.screw_amount,
			amount: p.amount,
		};	
	});

	const {items, prices} = part_batch_price_calc(pre_items);

	return {
		items,
		prices,
	};
}

module.exports = {
	get_batch_info,
};
