export const CONTRACT_TYPES = [
	{ value: 'cdi', label: 'CDI' },
	{ value: 'cdd', label: 'CDD' },
	{ value: 'freelance', label: 'Freelance' },
	{ value: 'alternance', label: 'Alternance' },
	{ value: 'stage', label: 'Stage' },
] as const;
export type ContractType = (typeof CONTRACT_TYPES)[number]['value'];
export const contractTypesKeys = CONTRACT_TYPES.map(({ value }) => value) as [
	ContractType,
	...ContractType[],
];

export type CvEventType = ContractType | 'Formation';

export const EVENT_TYPES = [
	...CONTRACT_TYPES,
	{ label: 'Formation', value: 'Formation' },
];
export const EVENT_TYPES_KEYS = EVENT_TYPES.map(
	type => type.value
) as unknown as [CvEventType, ...CvEventType[]];
