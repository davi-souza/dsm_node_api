const { CustomError, handle_graphql_error } = require('../../libs/error');
const { get_materials } = require('../../services/db/material');

async function QueryMaterialsResolver() {
	try {
		return await get_materials();
	} catch (err) {
		return handle_graphql_error(err);
	}
};

module.exports = {
	QueryMaterialsResolver,
};
