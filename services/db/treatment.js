const db = require('../../models');
const { CustomError } = require('../../libs/error');

function process_treatment(treatment) {
	return treatment.toJSON();
}

/**
 * Fetch heat treatment with a given id
 * @param {string} id					Heat treatment's id (uuid)
 * @return {Promise<object>}			Heat treatment model
 *             {string}	id
 *             {string} name
 *             {number} minimum_price	Minimum price multiplied by 100 (int)
 *             {number} price_per_kg	Price per kg multiplied by 100 (int)
 */
async function get_heat_treatment(id) {
	try {
		const heat_treatment = await db.HeatTreatment.findOne({
			attributes: [
				'id',
				'name',
				'minimum_price',
				'price_per_kg',
			],
			where: { id, },
		});

		return heat_treatment.toJSON();
	} catch (err) {
		console.warn(err);
		throw new CustomError(err.message, 500);
	}
}

/**
 * Fetch superficial treatment with a given id
 * @param {string} id					Superficial treatment's id (uuid)
 * @return {Promise<object>}			Superficial treatment model
 *             {string}	id
 *             {string} name
 *             {number} minimum_price	Minimum price multiplied by 100 (int)
 *             {number} price_per_kg	Price per kg multiplied by 100 (int)
 */
async function get_superficial_treatment(id) {
	try {
		const superficial_treatment = await db.SuperficialTreatment.findOne({
			attributes: [
				'id',
				'name',
				'minimum_price',
				'price_per_kg',
			],
			where: { id, },
		});

		return superficial_treatment.toJSON();
	} catch (err) {
		console.warn(err);
		throw new CustomError(err.message, 500);
	}
}

module.exports = {
	get_heat_treatment,
	get_superficial_treatment,
};
