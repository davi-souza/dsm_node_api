const { GraphQLList } = require('graphql');
const { QueryMaterialsResolver } = require('../resolvers/material');
const { MaterialType } = require('../types/material');

module.exports = {
	QueryMaterials: {
		type: new GraphQLList(MaterialType),
		resolve: async (source, args, context, info) => {
			return await QueryMaterialsResolver();
		},
	}
};
