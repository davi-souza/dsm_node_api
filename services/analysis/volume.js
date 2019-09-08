const axios = require('axios');
const { CustomError } = require('../../libs/error');
const analysis_url = 'https://mech4u-volume-analysis.herokuapp.com/api/analysis/volume';

/**
 * Sends file to Analysis Service and returns result
 * @param {string} filename	Name of the file
 * @param {number[]} buffer	File as number array as bytes
 * @return {object}
 *             {number} volume
 *             {number} raw_material_volume
 */
async function get_part_volume(filename, buffer) {
	try {
		const res = await axios.post(analysis_url, {
			file: {
				filename,
				buffer,
			},
		}, {
			headers: {
				'X-API-Key': 'ubhyjz455EV7XTFm829TquuZMZOHfPFE',
			},
		});

		return res.data;
	} catch (err) {
		console.warn(err);
		if (err.response) {
			throw new CustomError(err.message, err.response.status);
		}
		throw new CustomError(err.message, 500);
	}
}

module.exports = {
	get_part_volume,
};
