const {
	GraphQLNonNull,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
} = require('graphql');
const {
	PartOptionsInputType,
	PartBatchInfoInputType,
	PartInfoType,
	PartBatchInfoType,
} = require('../types/part');
const {
	PartOptionsResolver,
	PartBatchInfoResolver,
} = require('../resolvers/part');

module.exports = {
	ChangePartOptionsMutation : {
		type: new GraphQLNonNull(PartInfoType),
		args: {
			input: { type: new GraphQLNonNull(PartOptionsInputType,), },
		},
		resolve: PartOptionsResolver,
	},
	PartBatchInfoMutation: {
		type: new GraphQLNonNull(PartBatchInfoType),
		args: {
			input: { type: new GraphQLNonNull(PartBatchInfoInputType), },
		},
		resolve: PartBatchInfoResolver,
	},
};
