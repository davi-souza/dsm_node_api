const storage = require('./');

function is_duplicate({prefix}) {
	/**
	 * Check if file prefix already exists
	 * Params:
	 * - object with the following key
	 *   - prefix: str
	 *     prefix of the file
	 *
	 * Return:
	 * - Promise<boolean>
	 */
	return new Promise((resolve, reject) => {
		storage.listObjects({
			Bucket: 'mech4u',
			MaxKeys: 1,
			Prefix: `files/${prefix}`,
		}, (err, data) => {
			if (err) {
				reject(err);
			}

			resolve(data.Contents.length > 0);
		});
	});
}

module.exports = {
	is_duplicate,
};
