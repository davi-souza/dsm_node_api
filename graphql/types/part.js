const {
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
} = require('graphql');

const FrontPartType = new GraphQLObjectType({
	name: 'FrontPartType',
	fields: () => ({
		id: {
			type: new GraphQLNonNull(GraphQLString),
		},
		name: {
			type: new GraphQLNonNull(GraphQLString),
		},
		material_type_id: {
			type: new GraphQLNonNull(GraphQLString),
		},
		unit_price: {
			type: new GraphQLNonNull(GraphQLInt),
		},
		qtd: {
			type: new GraphQLNonNull(GraphQLInt),
		},
	}),
});

module.exports = {
	FrontPartType,
};
