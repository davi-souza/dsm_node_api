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

module.exports = {
	FinishingEnumType,
	DeliveryEnumType,
};
