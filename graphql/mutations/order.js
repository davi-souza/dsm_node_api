const { GraphQLNonNull } = require('graphql');
const { PartBatchInfoType } = require('../types/part');
const { PlaceOrderInputType } = require('../types/order');
const { PlaceOrderResolver } = require('../resolvers/order');

module.exports = {
	PlaceOrderMutation: {
		type: new GraphQLNonNull(PartBatchInfoType),
		args: {
			input: { type: new GraphQLNonNull(PlaceOrderInputType), },
		},
		resolve: PlaceOrderResolver,
	},
};
