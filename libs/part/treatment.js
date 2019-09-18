/**
 * Check if material type supports the chosen treatments
 * Throws an error if it doesn't support
 * @param {object} material_type				Material type model
 * @param {string} heat_treatment_id			Heat treatment's id (uuid)
 * @param {string} superficial_treatment_id		Superficial treatment's id (uuid)
 * @return {object}								Treatments
 *             {object}	heat_treatment			Heat treatment model (it can be null)
 *             {object}	superficial_treatment	Superficial treatment model (it can be null)
 */
function get_treatments(material_type, heat_treatment_id, superficial_treatment_id) {
	const treatments = {};
	
	if (!heat_treatment_id) {
		treatments.heat_treatment = null;
	} else {
		treatments.heat_treatment = material_type
			.heat_treatments.find(ht => ht.id === heat_treatment_id);

		delete treatments.heat_treatment.material_type_heat_treatment;

		if (!treatments.heat_treatment) {
			throw new Error('O tipo do material não suporta este tratamento térmico');
		}
	}

	if (!superficial_treatment_id) {
		treatments.superficial_treatment = null;
	} else {
		treatments.superficial_treatment = material_type
			.superficial_treatments.find(st => st.id === superficial_treatment_id);

		delete treatments.superficial_treatment.material_type_superficial_treatment;

		if (!treatments.superficial_treatment) {
			throw new Error('O tipo do material não suporta este tratamento superficial');
		}
	}

	return treatments;
}

module.exports = {
	get_treatments,
};
