const { get_materials } = require('../../services/db/material');

async function QueryMaterialsResolver() {
	return await get_materials();
};

module.exports = {
	QueryMaterialsResolver,
};
