const { GraphQLEnumType } = require('graphql');

const FinishingEnumType = new GraphQLEnumType({
	name: 'FinishingEnumType',
	values: {
		'STANDARD': {
			value: 'STANDARD',
		},
		'RECTIFIED': {
			value: 'RECTIFIED',
		},
		'POLISHED': {
			value: 'POLISHED',
		},
	},
});

const DeliveryEnumType = new GraphQLEnumType({
	name: 'DeliveryEnumType',
	values: {
		'WORKINGDAYS_15': {
			value: 'WORKINGDAYS_15',
		},
		'WORKINGDAYS_10': {
			value: 'WORKINGDAYS_10',
		},
	},
});

const ScrewEnumType = new GraphQLEnumType({
	name: 'ScrewEnumType',
	values: {
		'EXTERNAL': {
			value: 'EXTERNAL',
		},
		'INTERNAL': {
			value: 'INTERNAL',
		},
	},
});

const EngravingEnumType = new GraphQLEnumType({
	name: 'EngravingEnumType',
	values: {
		'TYPED': {
			value: 'TYPED',
		},
		'ELETRIC_PNEUMATIC_PEN': {
			value: 'ELETRIC_PNEUMATIC_PEN',
		},
		'LOW_RELIEF_MACHINING': {
			value: 'LOW_RELIEF_MACHINING',
		},
		'LASER': {
			value: 'LASER',
		},
		'ELECTROCHEMISTRY': {
			value: 'ELECTROCHEMISTRY',
		},
	},
});

const ReportEnumType = new GraphQLEnumType({
	name: 'ReportEnumType',
	values: {
		'STANDARD': {
			value: 'STANDARD',
		},
		'MEASUREMENT_3D': {
			value: 'MEASUREMENT_3D',
		},
	},
});

module.exports = {
	FinishingEnumType,
	DeliveryEnumType,
	EngravingEnumType,
	ScrewEnumType,
	ReportEnumType,
};
