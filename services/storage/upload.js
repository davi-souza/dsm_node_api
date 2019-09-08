const storage = require('./');
const { is_duplicate } = require('./check');
const uuid_v4 = require('uuid/v4');
const { CustomError } = require('../../libs/error');

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
function upload_file({filename, buffer}) {
	return Promise.resolve({key:'this-is-us'});

	//return new Promise((resolve, reject) => {
	//	let prefix = uuid_v4();

	//	storage.upload({
	//		Bucket: 'mech4u',
	//		Key: `files/${prefix}_${filename}`,
	//		Body: buffer,
	//	}, (err, data) => {
	//		if (err) {
	//			console.warn(err);
	//			reject(CustomError(err.message, 500));
	//		}
	//		resolve(data);
	//	});
	//});
}

module.exports = {
	upload_file,
};
