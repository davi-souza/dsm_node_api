const cache = require('./material_cache');
const db = require('../../models');
const { CustomError } = require('../../libs/error');

/** Gets the query result of 'get_material_types'
 *  and extracts only the necessary data
 *  @param {object} material_types	The query result (material type model)
 *  @return {object}				The processed result
 */
function process_material_type(material_type) {
	function check_material() {
		if (!material_type.material) {
			return {};
		}

		return {
			material: material_type.material.dataValues,
		};
	}

	return {
		...material_type.dataValues,
		...check_material(),
		heat_treatments: material_type.heat_treatments.map(ht => ht.dataValues),
		superficial_treatments: material_type.superficial_treatments.map(st => st.dataValues),
	};
}

/** Gets the query result of 'get_materials'
 *  and extracts only the necessary data
 *  @param {object} materials	The query result (material model)
 *  @return {object}			The processed result
 */
function process_material(material) {
	return {
		...material.dataValues,
		material_types: material.material_types.map(process_material_type),
	};
}

/** Fetch materials and material_types
 *  Also, process the query result
 *  @return {object[]}	Materials and their types
 */
async function get_materials() {
	if (!!cache.material && scache.materials.length > 0) {
		return Promise.resolve(cache.materials);
	}

	try {
		const materials = await db.Material.findAll({
			attributes: ['id', 'name'],
			include: [
				{
					model: db.MaterialType,
					as: 'material_types',
					order: [
						['name', 'ASC'],
					],
					attributes: [
						'id',
						'name',
						'price_per_kg',
						'specific_weight',
					],
					include: [
						{
							model: db.HeatTreatment,
							as: 'heat_treatments',
							through: 'material_type_heat_treatment',
							attributes: [
								'id',
								'name',
								'minimum_price',
								'price_per_kg',
							],
							order: [
								['name', 'ASC'],
							],
						},
						{
							model: db.SuperficialTreatment,
							as: 'superficial_treatments',
							through: 'material_type_superficial_treatment',
							attributes: [
								'id',
								'name',
								'minimum_price',
								'price_per_kg',
							],
							order: [
								['name', 'ASC'],
							],
						},
					],
				},
			],
			order: [
				['name', 'ASC'],
			],
		});

		if (!materials) {
			return [];
		}

		const fetched_materials = materials.map(process_material);

		cache.materials = fetched_materials;

		cache.updated_at = new Date();

		return fetched_materials;
	} catch (err) {
		console.warn(err);

		throw new CustomError('Não foi possível consultar os materiais', 500);
	}
}

/** 
 * Fetch all material types filtered by `where`
 * Also, process the query result
 * @param {object} where	Sequelize where operator
 *                          https://sequelize.org/master/manual/querying.html#operators
 * @return {object}	Material type model
 */
async function get_material_types(where = {}) {
		try {
		const material_types = await db.MaterialType.findAll({
			attributes: [
				'id',
				'name',
				'price_per_kg',
				'specific_weight',
				'hardness',
			],
			include: [
				{
					model: db.Material,
					as: 'material',
					attributes: [
						'id',
						'name',
					],
				},
				{
					model: db.HeatTreatment,
					as: 'heat_treatments',
					through: 'material_type_heat_treatment',
					attributes: [
						'id',
						'name',
						'minimum_price',
						'price_per_kg',
					],
					order: [
						['name', 'ASC'],
					],
				},
				{
					model: db.SuperficialTreatment,
					as: 'superficial_treatments',
					through: 'material_type_superficial_treatment',
					attributes: [
						'id',
						'name',
						'minimum_price',
						'price_per_kg',
					],
					order: [
						['name', 'ASC'],
					],
				},
			],
			where,
			order: [
				['name', 'ASC'],
			],
		});

		if (!material_types) {
			return [];
		}

		return material_types.map(process_material_type);
	} catch (err) {
		console.warn(err);

		throw new CustomError('Não foi possível consultar os tipos de materiais', 500);
	}
}

function get_material_types_by_ids(ids) {
	return get_material_types({
		id: {
			[db.Sequelize.Op.in]: Array.from(new Set(ids)),
		},
	});
}

/** 
 * Fetch as material_type by primary key 
 * Also, process the query result
 * @param {string}	id	Material type id (uuid)
 * @return {object}	Material type model
 */
async function get_material_type(id) {
	try {
		const material_type = await db.MaterialType.findOne({
			attributes: [
				'id',
				'name',
				'price_per_kg',
				'specific_weight',
				'hardness',
			],
			include: [
				{
					model: db.Material,
					as: 'material',
					attributes: [
						'id',
						'name',
					],
				},
				{
					model: db.HeatTreatment,
					as: 'heat_treatments',
					through: 'material_type_heat_treatment',
					attributes: [
						'id',
						'name',
						'minimum_price',
						'price_per_kg',
					],
				},
				{
					model: db.SuperficialTreatment,
					as: 'superficial_treatments',
					through: 'material_type_superficial_treatment',
					attributes: [
						'id',
						'name',
						'minimum_price',
						'price_per_kg',
					],
				},
			],
			where: { id, },
		});

		if (!material_type) {
			throw new CustomError('Tipo de material não existe', 400);
		}

		return process_material_type(material_type);
	} catch (err) {
		console.warn(err);

		if (err instanceof CustomError) {
			throw err;
		}

		throw new CustomError('Não foi possível consultar o tipo de material', 500);
	}
}

module.exports = {
	get_materials,
	get_material_types,
	get_material_types_by_ids,
	get_material_type,
};
