const db = require('./');
const {
	parse_material_item,
} = require('./parse');

function promise_get_materials() {
	/**
	 * Get all material from DynamoDB table
	 *
	 * Return:
	 * - Promise<AWS_RETURN>
	 *   https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#scan-property
	 */
	const params = {
		TableName: 'materials',
	};

	return new Promise((resolve, reject) => {
		db.scan(params, (err, data) => {
			if (err) {
				reject(err);
			}

			resolve(data);
		});
	});
}

async function get_materials() {
	/**
	 * Get all material from DB using promise
	 *
	 * Return:
	 * - Promise<material>
	 *   material: obj with the following keys
	 *     - id: string (uuid)
	 *     - category: string
	 *     - name: string
	 *     - price: number (the real value must be divided by 100)
	 *     - specific_weight: obj
	 *       - value: number (the real value must be divided by 100)
	 *       - unit: string
	 */
	try {
		const result = await promise_get_materials();

		return result.Items.map(parse_material_item);
	} catch (err) {
		console.log(err);
		return [];
	}
}

module.exports = {
	get_materials,
};
