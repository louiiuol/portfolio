import { contractTypesKeys } from '@feat/cv/types';
import { z } from 'zod';
import { assetSchema } from '../asset/asset.type';
import { entrySchema } from '../entry.type';
import { placeSchema } from '../place/place.type';
import { formattedRichTextSchema } from '../rich-text/rich-text.type';
import { skillSchema } from '../skill/skill.type';

export const REMOTE_POLICIES = [
	{ value: 'à distance', label: 'À distance' },
	{ value: 'hybride', label: 'Hybride' },
	{ value: 'sur site', label: 'Sur site' },
] as const;
export type RemotePolicy = (typeof REMOTE_POLICIES)[number]['value'];
export const RemotePolicyKeys = REMOTE_POLICIES.map(p => p.value) as [
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
export type JobEntry = z.infer<typeof jobSchema>;
