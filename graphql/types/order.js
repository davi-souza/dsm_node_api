const {
	GraphQLInputObjectType,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} = require('graphql');

const {
	FinishingEnumType,
	DeliveryEnumType,
} = require('./enums');

const {
	PartOptionsInputType,
} = require('./part');

const PlaceOrderInputType = new GraphQLInputObjectType({
	name: 'PlaceOrderInputType',
	fields: () => ({
		parts: { type: new GraphQLNonNull(new GraphQLList(PartOptionsInputType)), },
		delivery: { type: new GraphQLNonNull(DeliveryEnumType), },
		user_address_id: { type: new GraphQLNonNull(GraphQLString,) },
	}),
});

module.exports = {
	PlaceOrderInputType,
};
