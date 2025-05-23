import { entrySchema } from '@feat/contentful/types';
import type { nullish } from '@shared/types';
import { z } from 'zod';
import type { JobEntry } from '../../../contentful/types/job/job.type';
import {
	placeSchema,
	type PlaceEntry,
} from '../../../contentful/types/place/place.type';
import {
	skillSchema,
	type SkillEntry,
} from '../../../contentful/types/skill/skill.type';
import { type TrainingEntry } from '../../../contentful/types/training/training.type';
import type { CvEventType } from './cv-event-type.type';
import { EVENT_TYPES_KEYS } from './cv-event-type.type';

export type CvEventInput = JobEntry | TrainingEntry;

export abstract class CvEvent {
	id: string | nullish;
	startDate: Date;
	endDate: Date | nullish;

	abstract name: string;
	abstract description: string;
	abstract type: CvEventType;
	abstract location: PlaceEntry;
	abstract skills: SkillEntry[];

	constructor(input: CvEventInput) {
		this.id = input.id;
		this.startDate = input.startDate;
		this.endDate = input.endDate;
	}
}
export type CvEventField = keyof CvEvent;

/**
 * Used to validate objects as CvEvent
 */
export const cvEventSchema = entrySchema.extend({
	name: z.string(),
	description: z.string(),
	type: z.enum([...EVENT_TYPES_KEYS]),
	startDate: z.coerce.date(),
	endDate: z.coerce.date().nullish(),
	location: placeSchema,
	skills: z.array(skillSchema),
});
