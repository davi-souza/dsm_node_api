const cache = require('./material_cache');
const db = require('../../models');
const { CustomError } = require('../../libs/error');

/** Gets the query result of 'get_materials'
 *  and extracts only the necessary data
 *  @param {object} materials	The query result (material moodel)
 *  @return {object}			The processed result
 */
function process_material(material) {
	return {
		...material.dataValues,
		material_types: material.dataValues.material_types.map(type => ({
			...type.dataValues,
		})),
	};
}

/** Fetch materials and material_types
 *  Also, process the query result
 *  @return {object[]}	Materials and their types
 */
async function get_materials() {
	if (cache.materials.length > 0) {
		return Promise.resolve(cache.materials);
	}

	try {
		let materials = await db.Material.findAll({
			attributes: ['id', 'name'],
			include: [
				{
					model: db.MaterialType,
					as: 'material_types',
					order: [
						['name', 'ASC'],
					],
				},
			],
			order: [
				['name', 'ASC'],
			],
		});

		const fetched_materials = materials.map(process_material);

		cache.materials = fetched_materials;

		cache.updated_at = new Date();

		return fetched_materials;
	} catch (err) {
		console.warn(err);
		throw new CustomError(err.message, 500);
	}
}

/** 
 * Fetch all material types
 * Also, process the query result
 * @return {object}	Material type model
 */
async function get_material_types() {
	try {
		let material_type = await db.MaterialType.findAll({
			attributes: [
				'id',
				'name',
				'price_per_kg',
				'specific_weight',
			],
			include: [
				{
					model: db.Material,
					as: 'material',
				},
			],
		});

		return {
			...material_type.dataValues,
			material: {
				...material_type.dataValues.material.dataValues,
			},
		};
	} catch (err) {
		console.warn(err);
		throw new CustomError(err.message, 500);
	}
}

/** 
 * Fetch as material_type by primary key 
 * Also, process the query result
 * @param {string}	id	Material type id (uuid)
 * @return {object}	Material type model
 */
async function get_material_type(id) {
	try {
		let material_type = await db.MaterialType.findOne({
			attributes: [
				'id',
				'name',
				'price_per_kg',
				'specific_weight',
			],
			include: [
				{
					model: db.Material,
					as: 'material',
				},
			],
			where: { id },
		});

		return {
			...material_type.dataValues,
			material: {
				...material_type.dataValues.material.dataValues,
			},
		};
	} catch (err) {
		console.warn(err);
		throw new CustomError(err.message, 500);
	}
}

module.exports = {
	get_materials,
	get_material_type,
};
