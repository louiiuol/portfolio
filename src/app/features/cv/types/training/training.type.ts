import { entrySchema } from '@feat/contentfull/types';
import { isSchemaType } from '@shared/functions';
import { z } from 'zod';
import { CvEvent, cvEventSchema } from '../cv-event/cv-event.type';
import type { Diploma } from '../diploma/diploma.type';
import { diplomaSchema } from '../diploma/diploma.type';
import type { Place } from '../place/place.type';
import { placeSchema } from '../place/place.type';
import type { Skill } from '../skill/skill.type';

export const trainingSchema = entrySchema.extend({
	name: z.string(),
	description: z.string(),
	startDate: z.coerce.date(),
	endDate: z.coerce.date().nullish(),
	diplomas: z.array(diplomaSchema),
	school: placeSchema,
});
export type TrainingEntry = z.infer<typeof trainingSchema>;

export class Training extends CvEvent {
	readonly type: 'Formation';
	readonly description: string;
	readonly location: Place;
	readonly name: string;
	readonly skills: Skill[];
	readonly diplomas: Diploma[];

	constructor(input: TrainingEntry) {
		super(input);
		this.description = input.description;
		this.location = input.school;
		this.name = input.name;
		this.type = 'Formation';
		this.diplomas = input.diplomas;
		this.skills = this.diplomas
			.map(diploma => diploma.skills)
			.flat()
			.filter(
				(skills, index, self) =>
					index === self.findIndex(skill => skill.name === skills.name)
			);
	}
}

export const isTraining = (entry: unknown): entry is Training =>
	isSchemaType(
		entry,
		cvEventSchema.extend({
			diplomas: z.array(diplomaSchema),
		}),
		'Training'
	);
