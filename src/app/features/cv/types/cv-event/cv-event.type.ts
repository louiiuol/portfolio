import { entrySchema } from '@feat/contentfull/types';
import type { nullish } from '@shared/types';
import { z } from 'zod';
import type { JobEntry } from '../job/job.type';
import { placeSchema, type Place } from '../place/place.type';
import { skillSchema, type Skill } from '../skill/skill.type';
import { type TrainingEntry } from '../training/training.type';
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
	abstract location: Place;
	abstract skills: Skill[];

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
