const {
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
} = require('graphql');

const MaterialType = new GraphQLObjectType({
	name: 'MaterialType',
	fields: () => ({
		id: {
			type: new GraphQLNonNull(GraphQLString),
		},
		name: {
			type: new GraphQLNonNull(GraphQLString),
		},
		price_per_kg: {
			type: new GraphQLNonNull(GraphQLInt),
		},
		specific_weight: {
			type: new GraphQLNonNull(GraphQLInt),
		},
	}),
});

const Material = new GraphQLObjectType({
	name: 'Material',
	fields: () => ({
		id: {
			type: new GraphQLNonNull(GraphQLString),
		},
		name: {
			type: new GraphQLNonNull(GraphQLString),
		},
		material_types: {
			type: new GraphQLList(MaterialType),
		},
	}),
});

module.exports = {
	Material,
	MaterialType,
};
