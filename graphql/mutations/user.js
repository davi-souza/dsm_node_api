const {
	GraphQLNonNull,
	GraphQLString,
	GraphQLList,
} = require('graphql');
const {
	UserLogin,
	LoginInputType,
	RegisterUserInputType,
} = require('../types/user');
const {
	MutationLoginResolver,
	MutationRegisterUserResolver,
} = require('../resolvers/user');

module.exports = {
	LoginMutation: {
		type: new GraphQLNonNull(UserLogin),
		args: {
			input: { type: new GraphQLNonNull(LoginInputType), },
		},
		resolve: async (_, {input}) => {
			const {email, password} = input;
			return await MutationLoginResolver(email, password);
		},
	},
	RegisterUserMutation: {
		type: new GraphQLNonNull(UserLogin),
		args: {
			input: { type: new GraphQLNonNull(RegisterUserInputType), },
		},
		resolve: async (_, {input}) => {
			const {name, phone_number, email, password, addresses} = input;
			return await MutationRegisterUserResolver(name, phone_number, email, password, addresses);
		},
	},
};
