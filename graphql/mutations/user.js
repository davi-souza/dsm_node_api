const {
	GraphQLNonNull,
	GraphQLString,
	GraphQLList,
} = require('graphql');
const {
	RegisterInput,
	UserLogin,
} = require('../types/user');
const {
	MutationLoginResolver,
	MutationRegisterUserResolver,
} = require('../resolvers/user');

module.exports = {
	LoginMutation: {
		type: new GraphQLNonNull(UserLogin),
		args: {
			email: { type: new GraphQLNonNull(GraphQLString), },
			password: { type: new GraphQLNonNull(GraphQLString), },
		},
		resolve: async (_, {email, password}) => {
			return await MutationLoginResolver(email, password);
		},
	},
	RegisterUserMutation: {
		type: new GraphQLNonNull(UserLogin),
		args: {
			name: { type: new GraphQLNonNull(GraphQLString), },
			phone_number: { type: new GraphQLNonNull(GraphQLString), },
			email: { type: new GraphQLNonNull(GraphQLString), },
			password: { type: new GraphQLNonNull(GraphQLString), },
			addresses: { type: new GraphQLNonNull( new GraphQLList(GraphQLString) ), },
		},
		resolve: async (_, {name, phone_number, email, password, addresses}) => {
			return await MutationRegisterUserResolver(name, phone_number, email, password, addresses);
		},
	},
};
