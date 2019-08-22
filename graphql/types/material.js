const {
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLString,
	GraphQLInt,
} = require('graphql');

const specific_weight_type = new GraphQLObjectType({
	name: 'SpecificWeight',
	fields: () => ({
		unit: {
			type: new GraphQLNonNull(GraphQLString),
		},
		value: {
			type: new GraphQLNonNull(GraphQLInt),
		},
	}),
});

const material_type = new GraphQLObjectType({
	name: 'Material',
	fields: () => ({
		id: {
			type: new GraphQLNonNull(GraphQLString),
		},
		name: {
			type: new GraphQLNonNull(GraphQLString),
		},
		category: {
			type: new GraphQLNonNull(GraphQLString),
		},
		price: {
			type: new GraphQLNonNull(GraphQLInt),
		},
		specific_weight: {
			type: new GraphQLNonNull(specific_weight_type),
		},
	}),
});

module.exports = material_type;
