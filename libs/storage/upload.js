const storage = require('./');
const { is_duplicate } = require('./check');
const uuid_v4 = require('uuid/v4');

function upload_file({filename, buffer}) {
	/**
	 * Check if file prefix already exists
	 * Params:
	 * - object with the following keys
	 *   - filename: str
	 *     name of the file originally (with extension)
	 *   - buffer: Buffer
	 *     file buffer
	 *
	 * Return:
	 * - Promise<S3 upload result> 
	 *   https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
	 */
	return new Promise(async (resolve, reject) => {
		let prefix;

		do {
			prefix = uuid_v4();
		} while(!prefix || (await is_duplicate({prefix})));

		storage.upload({
			Bucket: 'mech4u',
			Key: `files/${prefix}_${filename}`,
			Body: buffer,
		}, (err, data) => {
			if (err) {
				reject(err);
			}
			resolve(data);
		});
	});
}

module.exports = {
	upload_file,
};
