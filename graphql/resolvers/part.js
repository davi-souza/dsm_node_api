const { get_treatments } = require('../../libs/part/treatment');
const { get_batch_info } = require('../../libs/part/batch');
const { get_part } = require('../../services/db/part');
const { get_material_type } = require('../../services/db/material');
const { part_price_calc } = require('../../services/analysis/price');
const { get_mail_info } = require('../../services/analysis/mail');

async function PartOptionsResolver(_, {input}) {
	const {
		part_id,
		material_type_id,
		heat_treatment_id,
		superficial_treatment_id,
		tolerance,
		finishing,
		screw_amount,
		amount,
	} = input;

	const [
		part,
		material_type,
	] = await Promise.all([
		get_part(part_id),
		get_material_type.one(material_type_id),
	]);

	const {
		heat_treatment,
		superficial_treatment,
	} = get_treatments(material_type, heat_treatment_id, superficial_treatment_id);

	const { total } = part_price_calc({
		part,
		material_type,
		tolerance,
		finishing,
		heat_treatment,
		superficial_treatment,
		screw_amount,
		amount,
	});

	return {
		id: part.id,
		name: part.name,
		material_type_id,
		heat_treatment_id,
		superficial_treatment_id,
		tolerance,
		finishing,
		screw_amount,
		amount,
		unit_price: total,
	};
}

async function PartBatchInfoResolver(_, {input}) {
	const {
		parts,
		delivery,
	} = input;

	const {items, prices} = await get_batch_info(parts);

	const delivery_info = await get_mail_info(items, delivery);

	return {
		subtotal: prices.total,
		delivery: delivery_info,
	};
};

module.exports = {
	PartOptionsResolver,
	PartBatchInfoResolver,
};
