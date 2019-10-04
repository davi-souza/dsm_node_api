const {
	GraphQLInputObjectType,
	GraphQLInt,
	GraphQLNonNull,
	GraphQLObjectType,
} = require('graphql');

const {
	ScrewEnumType,
} = require('./enums');

const ScrewInputType = new GraphQLInputObjectType({
	name: 'ScrewInputType',
	fields: () => ({
		type: { type: new GraphQLNonNull(ScrewEnumType), },
		amount: { type: new GraphQLNonNull(GraphQLInt), },
	}),
});

const ScrewType = new GraphQLObjectType({
	name: 'ScrewType',
	fields: () => ({
		type: { type: new GraphQLNonNull(ScrewEnumType), },
		amount: { type: new GraphQLNonNull(GraphQLInt), },
	}),
});

module.exports = {
	ScrewInputType,
	ScrewType,
};
