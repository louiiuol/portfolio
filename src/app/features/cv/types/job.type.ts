import { entrySchema, formattedRichTextSchema } from '@feat/contentfull/types';

import { isSchemaType } from '@shared/functions';
import { z } from 'zod';
import { assetSchema } from './asset.type';
import { placeSchema } from './place.type';
import { skillSchema } from './skill.type';

export const CONTRACT_TYPES = [
	{ value: 'cdi', label: 'CDI' },
	{ value: 'cdd', label: 'CDD' },
	{ value: 'freelance', label: 'Freelance' },
	{ value: 'alternance', label: 'Alternance' },
	{ value: 'stage', label: 'Stage' },
] as const;
export type ContractType = (typeof CONTRACT_TYPES)[number]['value'];
const contractTypesKeys = CONTRACT_TYPES.map(({ value }) => value) as [
	ContractType,
	...ContractType[],
];

export const REMOTE_POLICIES = [
	{ value: 'à distance', label: 'À distance' },
	{ value: 'hybride', label: 'Hybride' },
	{ value: 'sur site', label: 'sur site' },
] as const;
export type RemotePolicy = (typeof REMOTE_POLICIES)[number]['value'];
const RemotePolicyKeys = REMOTE_POLICIES.map(p => p.value) as [
	RemotePolicy,
	...RemotePolicy[],
];

// JOB
export const jobSchema = entrySchema.extend({
	company: placeSchema,
	remotePolicy: z.enum(RemotePolicyKeys),
	contractType: z.enum(contractTypesKeys),
	title: z.string(),
	summary: z.string(),
	description: formattedRichTextSchema, // tasks
	startDate: z.coerce.date(),
	endDate: z.coerce.date().nullish(),
	assets: z.array(assetSchema).nullish(),
	skills: z.array(skillSchema),
});
export type Job = z.infer<typeof jobSchema>;
export type JobField = keyof Job;
export const isJob = (entry: unknown): entry is Job =>
	isSchemaType(entry, jobSchema, 'Job');
