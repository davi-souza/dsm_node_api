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
async function create_part(name, storage, volume, raw_material_volume) {
	try {
		const part = await db.Part.create({
			id: uuid_v4(),
			name,
			storage,
			volume: parseInt(volume*100, 10),
			raw_material_volume: parseInt(raw_material_volume*100, 10),
		});

		return {
			...part.dataValues,
		};
	} catch (err) {
		console.warn(err);
		throw new CustomError(err.message, 500);
	}
}

/** Fetch parts
 *  @return {object[]}	Part model
 */
async function get_parts() {
	try {
		const parts = await db.Part.findAll({
			order: [
				['created_at', 'ASC'],
				['name', 'ASC'],
			],
			raw: true,
		});

		return parts;
	} catch (err) {
		console.warn(err);
		throw new CustomError(err.message, 500);
	}
}

/** Fetch a part by primary key 
 *  @param {string}	id	Part id (uuid)
 *  @return {object}	Part model
 */
async function get_part(id) {
	try {
		const part = await db.Part.findOne({
			where: { id },
			raw: true,
		});

		return part;
	} catch (err) {
		console.warn(err);
		throw new CustomError(err.message, 500);
	}
}

module.exports = {
	create_part,
	get_parts,
	get_part,
};
