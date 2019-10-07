const { handle_graphql_error } = require('../../libs/error');
const { get_treatments } = require('../../libs/part/treatment');
const { get_batch_info } = require('../../libs/part/batch');
const { get_part } = require('../../services/db/part');
const { get_material_type } = require('../../services/db/material');
const { part_price_calc } = require('../../services/analysis/price');
const { get_mail_info } = require('../../services/analysis/mail');

async function PartOptionsResolver(_, {input}) {
	try {
		const {
			part_id,
			material_type_id,
			heat_treatment_id,
			superficial_treatment_id,
			tolerance,
			finishing,
			screw,
			marking,
			knurled,
			report,
			amount,
		} = input;

		const [
			part,
			material_type,
		] = await Promise.all([
			get_part(part_id),
			get_material_type(material_type_id),
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
			screw,
			marking,
			knurled,
			report,
			amount,
		});

		return {
			id: part.id,
			name: part.name,
			material_type: {
				id: material_type.id,
				name: material_type.name,
			},
			heat_treatment: heat_treatment ? {
				id: heat_treatment.id,
				name: heat_treatment.name,
			} : null,
			superficial_treatment: superficial_treatment ? {
				id: superficial_treatment.id,
				name: superficial_treatment.name,
			} : null,
			tolerance,
			finishing,
			screw,
			amount,
			unit_price: total,
		};
	} catch (err) {
		throw handle_graphql_error(err);
	}
}

async function PartBatchInfoResolver(_, {input}) {
	try {
		const {
			parts,
			delivery,
		} = input;

		const {items, prices} = await get_batch_info(parts);

		const delivery_info = await get_mail_info(items, delivery);
		delivery_info.at = delivery_info.at.toISOString();

		return {
			subtotal: prices.total,
			delivery: delivery_info,
		};
	} catch (err) {
		throw handle_graphql_error(err);
	}
};

module.exports = {
	PartOptionsResolver,
	PartBatchInfoResolver,
};
