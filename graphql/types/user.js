const {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLList,
} = require('graphql');

const UserLogin = new GraphQLObjectType({
	name: 'UserLogin',
	fields: () => ({
		name: {
			type: new GraphQLNonNull(GraphQLString),
		},
		email: {
			type: new GraphQLNonNull(GraphQLString),
		},
		phone_number: {
			type: new GraphQLNonNull(GraphQLString),
		},
		token: {
			type: new GraphQLNonNull(GraphQLString),
		},
	}),
});

module.exports = {
	UserLogin,
};
