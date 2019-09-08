const {
	GraphQLSchema,
	GraphQLObjectType,
} = require('graphql');
const { QueryMaterials } = require('../queries/material');
const {
	LoginMutation,
	RegisterUserMutation,
} = require('../mutations/user');
const { ChangePartOptionsMutation } = require('../mutations/part');

const rootQuery = new GraphQLObjectType({
	name: 'RootQuery',
	fields: () => ({
		materials: QueryMaterials,
	}),
});

const rootMutation = new GraphQLObjectType({
	name: 'RootMutation',
	fields: () => ({
		login: LoginMutation,
		changePartOptions: ChangePartOptionsMutation,
		registerUser: RegisterUserMutation,
	}),
});

module.exports = new GraphQLSchema({
	query: rootQuery,
	mutation: rootMutation,
});
