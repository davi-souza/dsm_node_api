const { GraphQLList } = require('graphql');
const { QueryMaterialsResolver } = require('../resolvers/material');
const { Material } = require('../types/material');

module.exports = {
	QueryMaterials: {
		type: new GraphQLList(Material),
		resolve: async (source, args, context, info) => {
			return await QueryMaterialsResolver();
		},
	}
};
