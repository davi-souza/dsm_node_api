const db = require('../../models');
const uuid_v4 = require('uuid/v4');
const { CustomError } = require('../../libs/error');

/**
 * Create a part at db
 * @param {string} name					Part's name
 * @param {string} storage				Storage key (path)
 * @param {number} volume				Part's volume in mm3
 * @param {number} raw_material_volume	Raw material volume of the part
 * @return {object} 					Return the created part
 */
async function create_part(name, storage, volume, raw_material_volume, boundbox_dimensions) {
	try {
		const part = await db.Part.create({
			id: uuid_v4(),
			name,
			storage,
			volume: parseInt(volume, 10),
			raw_material_volume: parseInt(raw_material_volume, 10),
			x_length: parseInt(boundbox_dimensions.x.length, 10),
			y_length: parseInt(boundbox_dimensions.y.length, 10),
			z_length: parseInt(boundbox_dimensions.z.length, 10),
		});

		return part.toJSON();
	} catch (err) {
		console.warn(err);

		throw new CustomError('Não foi possível criar uma peça', 500);
	}
}

/** Fetch parts
 *  @return {object[]}	Part model
 */
async function get_parts(where = {}) {
	try {
		const parts = await db.Part.findAll({
			order: [
				['created_at', 'ASC'],
				['name', 'ASC'],
			],
			where,
		});

		return parts.map(part => part.toJSON());
	} catch (err) {
		console.warn(err);

		throw new CustomError('Não foi possível consultar a(s) peça(s)', 500);
	}
}

/**
 * Fetch parts by an array of ids
 * @return {object[]}	Part model
 */
function get_parts_by_ids(ids) {
	return get_parts({
		id: {
			[db.Sequelize.Op.in]: Array.from(new Set(ids)),
		},
	});
}

/** Fetch a part by primary key 
 *  @param {string}	id	Part id (uuid)
 *  @return {object}	Part model
 */
async function get_part(id) {
	try {
		const part = await db.Part.findOne({
			include: [
				{
					model: db.AuxiliaryFile,
					as: 'auxiliaryFiles',
					attributes: [
						'id',
						'name',
						'storage',
					],
				},
			],
			where: { id },
		});

		return part.toJSON();
	} catch (err) {
		console.warn(err);

		throw new CustomError('Não foi possível consultar a peça', 500);
	}
}

/**
 * Create a auxiliary file at db
 * @param {number} part_id				Part's id
 * @param {string} storage				Storage key (path)
 * @param {string} name					File's name
 * @return {object} 					Return the created aux file
 */
async function create_auxiliary_file(part_id, name, storage) {
	try {
		const aux_file = await db.AuxiliaryFile.create({
			id: uuid_v4(),
			part_id,
			name,
			storage,
		});

		return aux_file.toJSON();
	} catch (err) {
		console.warn(err);

		throw new CustomError('Não foi possível criar arquivo auxiliar', 500);
	}
}

/**
 * Update part
 * @param {number} part_id				Part's id
 * @param {object} changes				Changes to make
 */
async function update_part(part_id, changes) {
	try {
		const x = await db.Part.update(
			changes,
			{where: { id: part_id }, }
		);

		return;
	} catch (err) {
		console.warn(err);

		throw new CustomError('Não foi possível criar arquivo auxiliar', 500);
	}
}

module.exports = {
	create_part,
	get_parts,
	get_parts_by_ids,
	get_part,
	update_part,
	create_auxiliary_file,
};
