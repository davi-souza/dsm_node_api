const { get_materials } = require('../../libs/dynamodb/material');

async function get_materials_resolver() {
	return await get_materials();
};

module.exports = {
	get_materials_resolver,
};
