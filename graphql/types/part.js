const {
	GraphQLDate,
	GraphQLBoolean,
	GraphQLEnumType,
	GraphQLFloat,
	GraphQLInputObjectType,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} = require('graphql');

const {
	FinishingEnumType,
	DeliveryEnumType,
	ToleranceEnumType,
	MarkingEnumType,
	ReportEnumType,
} = require('./enums');

const {
	ScrewInputType,
	ScrewType,
} = require('./screw');

const BatchDeliveryType = new GraphQLObjectType({
	name: 'BatchDeliveryType',
	fields: () => ({
		price: { type: new GraphQLNonNull(GraphQLInt), },
		at: { type: new GraphQLNonNull(GraphQLString), },
	}),
});

const PartOptionsInputType = new GraphQLInputObjectType({
	name: 'PartOptionsInputType',
	fields: () => ({
		part_id: { type: new GraphQLNonNull(GraphQLString), },
		material_type_id: { type: new GraphQLNonNull(GraphQLString), },
		heat_treatment_id: { type: GraphQLString, },
		superficial_treatment_id: { type: GraphQLString, },
		tolerance: { type: ToleranceEnumType, },
		finishing: { type: FinishingEnumType, },
		marking: { type: MarkingEnumType, },
		knurled: { type: GraphQLBoolean, },
		screw: { type: ScrewInputType, },
		report: { type: ReportEnumType, },
		additional_info: { type: GraphQLString, },
		amount: { type: new GraphQLNonNull(GraphQLInt), },
	}),
});

const PartBatchInfoInputType = new GraphQLInputObjectType({
	name: 'PartBatchInfoInputType',
	fields: () => ({
		parts: { type: new GraphQLNonNull(new GraphQLList(PartOptionsInputType)), },
		delivery: { type: new GraphQLNonNull(DeliveryEnumType), },
	}),
});

const AuxiliaryFileType = new GraphQLObjectType({
	name: 'AuxiliaryFileType',
	fields: () => ({
		id: { type: new GraphQLNonNull(GraphQLString), },
		name: { type: new GraphQLNonNull(GraphQLString), },
		storage: { type: new GraphQLNonNull(GraphQLString), },
	}),
});

const ClientMaterialAndTreatmentsType = new GraphQLObjectType({
	name: 'ClientMaterialAndTreatmentsType',
	fields: () => ({
		id: { type: new GraphQLNonNull(GraphQLString), },
		name: { type: new GraphQLNonNull(GraphQLString), },
	}),
});

const PartInfoType = new GraphQLObjectType({
	name: 'PartInfoType',
	fields: () => ({
		id: { type: new GraphQLNonNull(GraphQLString), },
		name: { type: new GraphQLNonNull(GraphQLString), },
		dimensions: { type: new GraphQLNonNull(GraphQLString), },
		auxiliary_files: { type: new GraphQLNonNull(new GraphQLList(AuxiliaryFileType)), },
		material_type: { type: new GraphQLNonNull(ClientMaterialAndTreatmentsType), },
		heat_treatment: { type: ClientMaterialAndTreatmentsType, },
		superficial_treatment: { type: ClientMaterialAndTreatmentsType, },
		tolerance: { type: ToleranceEnumType, },
		finishing: { type: FinishingEnumType, },
		marking: { type: MarkingEnumType, },
		knurled: { type: GraphQLBoolean, },
		screw: { type: ScrewType, },
		report: { type: ReportEnumType, },
		additional_info: { type: GraphQLString, },
		amount: { type: new GraphQLNonNull(GraphQLInt), },
		unit_price: { type: new GraphQLNonNull(GraphQLInt), },
	}),
});

const PartBatchInfoType = new GraphQLObjectType({
	name: 'PartBatchInfoType',
	fields: () => ({
		subtotal: { type: new GraphQLNonNull(GraphQLInt), },
		delivery: { type: new GraphQLNonNull(BatchDeliveryType), },
	}),
});

module.exports = {
	PartOptionsInputType,
	PartBatchInfoInputType,
	PartInfoType,
	PartBatchInfoType,
};
