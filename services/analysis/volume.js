const axios = require('axios');
const FormData = require('form-data');
const { CustomError } = require('../../libs/error');
const analysis_url = `${process.env.VOLUME_SERVICE_URL}/api/analysis/volume`;
const api_key = process.env.VOLUME_SERVICE_API_KEY;

/**
 * Sends file to Analysis Service and returns result
 * @param {buffer} buffer	File as number array as bytes
 * @return {object}
 *             {number} 	volume
 *             {number} 	raw_material_volume
 */
async function get_part_volume(buffer) {
	try {
		const form = new FormData();

		form.append('file', buffer);
		console.log(buffer);
		console.log(form);

		const res = await axios.post(analysis_url, form, {
			headers: {
				'X-API-Key': api_key,
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
