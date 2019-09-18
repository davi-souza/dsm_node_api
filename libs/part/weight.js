/**
 * Given the material type, calculates the part's weight
 * @param {object} part						Part model (there are keys missing)
 *            {number} volume				Part's volume multiplied by 100 in mm3 (int)
 *            {number} raw_material_volume	Part's raw material volume multiplied by 100 in mm3 (int)
 * @param {object} material_type			Material type model (there are keys missing)
 *            {number} specific_weight		Material type's density multiplied by 100 in g/cm3 (int)
 * @return {number}							Weight of the part multiplied by 100 in kg (int)
 */
function part_weight(part, material_type) {
	/** 
	 * Every metric is multiplied by 100 so it can be stored as int
	 * It's necessary to divide them by 100
	 *
	 * Due to conversion, it's necessary to divide by 10^-6
	 * But it's desirable to stored the price multiplied by 100 (to be int)
	 * Therefore, it's only necessary to divide by 10^-4
	 */
	return Math.ceil((part.volume / 100) * (material_type.specific_weight / 100) / 10000);
}

/**
 * Given the material type, calculates the raw materials's weight
 * @param {object} part						Part model (there are keys missing)
 *            {number} volume				Part's volume multiplied by 100 in mm3 (int)
 *            {number} raw_material_volume	Part's raw material volume multiplied by 100 in mm3 (int)
 * @param {object} material_type			Material type model (there are keys missing)
 *            {number} specific_weight		Material type's density multiplied by 100 in g/cm3 (int)
 * @return {number} 						Weight of the raw material multiplied by 100 in kg (int)
 */
function raw_material_weight(part, material_type) {
	/** 
	 * Every metric is multiplied by 100 so it can be stored as int
	 * It's necessary to divide them by 100
	 *
	 * Due to conversion, it's necessary to divide by 10^-6
	 * But it's desirable to stored the price multiplied by 100 (to be int)
	 * Therefore, it's only necessary to divide by 10^-4
	 */
	return Math.ceil((part.raw_material_volume / 100) * (material_type.specific_weight / 100) / 10000);
}

module.exports = {
	part_weight,
	raw_material_weight,
};
