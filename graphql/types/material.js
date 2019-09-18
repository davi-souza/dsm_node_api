const {
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} = require('graphql');

const HeatSuperficialTreatmentType = new GraphQLObjectType({
	name: 'HeatSuperficialTreatmentType',
	fields: () => ({
		id: { type: new GraphQLNonNull(GraphQLString), },
		name: { type: new GraphQLNonNull(GraphQLString), },
		minimum_price: { type: new GraphQLNonNull(GraphQLInt), },
		price_per_kg: { type: new GraphQLNonNull(GraphQLInt), },
	}),
});

const MaterialType = new GraphQLObjectType({
	name: 'MaterialType',
	fields: () => ({
		id: { type: new GraphQLNonNull(GraphQLString), },
		name: { type: new GraphQLNonNull(GraphQLString), },
		price_per_kg: { type: new GraphQLNonNull(GraphQLInt), },
		specific_weight: { type: new GraphQLNonNull(GraphQLInt), },
		heat_treatments: { type: new GraphQLList(HeatSuperficialTreatmentType), },
		superficial_treatments: { type: new GraphQLList(HeatSuperficialTreatmentType), },
	}),
});

const Material = new GraphQLObjectType({
	name: 'Material',
	fields: () => ({
		id: { type: new GraphQLNonNull(GraphQLString), },
		name: { type: new GraphQLNonNull(GraphQLString), },
		material_types: { type: new GraphQLNonNull(new GraphQLList(MaterialType)), },
	}),
});

module.exports = {
	Material,
	MaterialType,
};
