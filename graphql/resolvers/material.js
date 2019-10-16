const { CustomError, handle_graphql_error } = require('../../libs/error');
const { get_material_types } = require('../../services/db/material');

async function QueryMaterialsResolver() {
	try {
		return await get_material_types();
	} catch (err) {
		return handle_graphql_error(err);
	}
};

module.exports = {
	QueryMaterialsResolver,
};
