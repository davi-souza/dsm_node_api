function parse_material_item({id, category, name, price, specific_weight}) {
	/**
	 * Parse material item (from DynamoDB) to a real js object
	 * Params:
	 * - object with the following keys
	 *   - id: string (uuid)
	 *   - category: string
	 *   - name: string
	 *   - price: number (the real value must be divided by 100)
	 *   - specific_weight: obj
	 *     - value: number (the real value must be divided by 100)
	 *     - unit: string
	 *
	 * Return:
	 * - object with the same keys, but without aws' "S", "N", "M", etc
	 */
	return {
		id: id.S,
		category: category.S,
		name: name.S,
		price: parseInt(price.N, 10),
		specific_weight: {
			unit: specific_weight.M.unit.S,
			value: parseInt(specific_weight.M.value.N, 10),
		},
	};
}

module.exports = {
	parse_material_item
};
