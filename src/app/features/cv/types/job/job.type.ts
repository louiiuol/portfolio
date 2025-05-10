import {
	RemotePolicyKeys,
	type FormattedRichText,
	type JobEntry,
	type PlaceEntry,
	type RemotePolicy,
	type SkillEntry,
} from '@feat/contentful/types';

import { isSchemaType } from '@shared/functions';
import { z } from 'zod';
import type { ContractType } from '../cv-event/cv-event-type.type';
import { CvEvent, cvEventSchema } from '../cv-event/cv-event.type';

export class Job extends CvEvent {
	readonly type: ContractType;
	readonly description: string;
	readonly location: PlaceEntry;
	readonly name: string;
	readonly tasks: FormattedRichText;
	readonly remotePolicy: RemotePolicy;
	readonly skills: SkillEntry[];

	constructor(input: JobEntry) {
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
