import type { FormattedRichText } from '@feat/contentfull/types';
import { entrySchema, formattedRichTextSchema } from '@feat/contentfull/types';

import { isSchemaType } from '@shared/functions';
import { z } from 'zod';
import { assetSchema } from '../asset/asset.type';
import type { ContractType } from '../cv-event/cv-event-type.type';
import { contractTypesKeys } from '../cv-event/cv-event-type.type';
import { CvEvent, cvEventSchema } from '../cv-event/cv-event.type';
import type { Place } from '../place/place.type';
import { placeSchema } from '../place/place.type';
import type { Skill } from '../skill/skill.type';
import { skillSchema } from '../skill/skill.type';

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
export type JobInput = z.infer<typeof jobSchema>;
export const isJobInput = (entry: unknown): entry is JobInput =>
	isSchemaType(entry, jobSchema, 'JobInput');

export class Job extends CvEvent {
	readonly type: ContractType;
	readonly description: string;
	readonly location: Place;
	readonly name: string;
	readonly tasks: FormattedRichText;
	readonly remotePolicy: RemotePolicy;
	readonly skills: Skill[];

	constructor(input: JobInput) {
		super(input);
		this.description = input.summary;
		this.location = input.company;
		this.name = input.title;
		this.tasks = input.description;
		this.type = input.contractType;
		this.remotePolicy = input.remotePolicy;
		this.skills = input.skills;
	}
}

export const isJob = (entry: unknown): entry is Job =>
	isSchemaType(
		entry,
		cvEventSchema.extend({
			remotePolicy: z.enum(RemotePolicyKeys),
		}),
		'Job'
	);
