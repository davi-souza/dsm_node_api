const {
	GraphQLNonNull,
	GraphQLString,
	GraphQLInt,
} = require('graphql');
const { FrontPartType } = require('../types/part');
const { ChangePartOptionsResolver } = require('../resolvers/part');

module.exports = {
	ChangePartOptionsMutation : {
		type: new GraphQLNonNull(FrontPartType),
		args: {
			part_id: { type: new GraphQLNonNull(GraphQLString), },
			material_type_id: { type: new GraphQLNonNull(GraphQLString), },
			qtd: { type: new GraphQLNonNull(GraphQLInt), },
		},
		resolve: ChangePartOptionsResolver,
	},
};
