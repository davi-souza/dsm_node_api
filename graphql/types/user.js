const {
	GraphQLInt,
	GraphQLInputObjectType,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} = require('graphql');

const LoginInputType = new GraphQLInputObjectType({
	name: 'LoginInputType',
	fields: () => ({
		email: { type: new GraphQLNonNull(GraphQLString), },
		password: { type: new GraphQLNonNull(GraphQLString), },
	}),
});

const RefreshTokenInputType = new GraphQLInputObjectType({
	name: 'RefreshTokenInputType',
	fields: () => ({
		token: { type: new GraphQLNonNull(GraphQLString), },
	}),
});

const AddressInputType = new GraphQLInputObjectType({
	name: 'AddressInputType',
	fields: () => ({
		state: { type: new GraphQLNonNull(GraphQLString), },
		municipality: { type: new GraphQLNonNull(GraphQLString), },
		address: { type: new GraphQLNonNull(GraphQLString), },
		address_number: { type: new GraphQLNonNull(GraphQLInt), },
		complement: { type: GraphQLString, },
		postcode: { type: new GraphQLNonNull(GraphQLString), },
	}),
});

const RegisterUserInputType = new GraphQLInputObjectType({
	name: 'RegisterUserInputType',
	fields: () => ({
		name: { type: new GraphQLNonNull(GraphQLString), },
		phone_number: { type: new GraphQLNonNull(GraphQLString), },
		email: { type: new GraphQLNonNull(GraphQLString), },
		password: { type: new GraphQLNonNull(GraphQLString), },
		addresses: { type: new GraphQLNonNull(new GraphQLList(AddressInputType)), },
	}),
});

const AddressType = new GraphQLObjectType({
	name: 'AddressType',
	fields: () => ({
		id: { type: new GraphQLNonNull(GraphQLString), },
		state: { type: new GraphQLNonNull(GraphQLString), },
		municipality: { type: new GraphQLNonNull(GraphQLString), },
		address: { type: new GraphQLNonNull(GraphQLString), },
		address_number: { type: new GraphQLNonNull(GraphQLInt), },
		complement: { type: GraphQLString, },
		postcode: { type: new GraphQLNonNull(GraphQLString), },
	}),
});

const UserLogin = new GraphQLObjectType({
	name: 'UserLogin',
	fields: () => ({
		name: { type: new GraphQLNonNull(GraphQLString), },
		email: { type: new GraphQLNonNull(GraphQLString), },
		token: { type: new GraphQLNonNull(GraphQLString), },
		addresses: { type: new GraphQLList(AddressType), },
	}),
});

module.exports = {
	UserLogin,
	LoginInputType,
	RegisterUserInputType,
};
