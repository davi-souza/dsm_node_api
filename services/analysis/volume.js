const api_key = process.env.VOLUME_SERVICE_API_KEY;
const request = require('request');
const { CustomError } = require('../../libs/error');
const analysis_url = `${process.env.VOLUME_SERVICE_URL}/api/analysis/volume`;

/**
 * Sends file to Analysis Service and returns result
 * @param {buffer} buffer	File as number array as bytes
 * @return {object}
 *             {number} 	volume
 *             {number} 	raw_material_volume
 */
function get_part_volume(buffer, filename, mimetype) {
	return new Promise(function(resolve, reject) {
		let form_data = {
			quality: 80,
			file: {
				value: buffer,
				options: {
					contentType: mimetype,
					filename,
				},
			},
		};

		request.post({
			url: analysis_url,
			formData: form_data,
			headers: {'x-api-key': api_key},
		}, function(err, res, body) {
			if (err) {
				reject(new CustomError('Não foi possível enviar arquivo', 500));
			}


			if (res.statusCode !== 200) {
				const {errors} = JSON.parse(body);

				reject(new CustomError(errors[0].message, res.statusCode));
			}

			resolve(JSON.parse(body));
		});
	});
}

module.exports = {
	get_part_volume,
};
