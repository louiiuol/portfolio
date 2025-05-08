import type { FormattedRichText, Place, Skill } from '@feat/contentfull/types';

import { isSchemaType } from '@shared/functions';
import { z } from 'zod';
import {
	RemotePolicyKeys,
	type JobEntry,
	type RemotePolicy,
} from '../../../contentfull/types/job/job.type';
import type { ContractType } from '../../../cv/types/cv-event/cv-event-type.type';
import {
	CvEvent,
	cvEventSchema,
} from '../../../cv/types/cv-event/cv-event.type';

export class Job extends CvEvent {
	readonly type: ContractType;
	readonly description: string;
	readonly location: Place;
	readonly name: string;
	readonly tasks: FormattedRichText;
	readonly remotePolicy: RemotePolicy;
	readonly skills: Skill[];

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
