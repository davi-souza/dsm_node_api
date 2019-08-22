const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
} = require('graphql');

const material_type = require('../types/material');

const {
	get_materials_resolver,
} = require('../resolvers/material');

const rootQuery = new GraphQLObjectType({
	name: 'RootQuery',
	fields: () => ({
		getMaterials: {
			type: new GraphQLList(material_type),
			resolve: async (source, args, context, info) => {
				return await get_materials_resolver();
			},
		},
	}),
});

module.exports = new GraphQLSchema({
	query: rootQuery,
});
