import { entrySchema } from '@feat/contentfull/types';
import { isSchemaType } from '@shared/functions';
import { z } from 'zod';
import { CvEvent, cvEventSchema } from './cv-event.type';
import type { Diploma } from './diploma.type';
import { diplomaSchema } from './diploma.type';
import type { Place } from './place.type';
import { placeSchema } from './place.type';
import type { Skill } from './skill.type';

export const trainingSchema = entrySchema.extend({
	name: z.string(),
	description: z.string(),
	startDate: z.coerce.date(),
	endDate: z.coerce.date().nullish(),
	diplomas: z.array(diplomaSchema),
	school: placeSchema,
});
export type TrainingInput = z.infer<typeof trainingSchema>;

export class TrainingEvent extends CvEvent {
	readonly type: 'Formation';
	readonly description: string;
	readonly location: Place;
	readonly name: string;
	readonly skills: Skill[];
	readonly diplomas: Diploma[];

	constructor(input: TrainingInput) {
		super(input);
		this.description = input.description;
		this.location = input.school;
		this.name = input.name;
		this.type = 'Formation';
		this.diplomas = input.diplomas;
		this.skills = input.diplomas
			.map(diploma => diploma.skills)
			.flat()
			.filter(
				(skills, index, self) =>
					index === self.findIndex(skill => skill.name === skills.name)
			);
	}
}

export const isTraining = (entry: unknown): entry is TrainingEvent =>
	isSchemaType(
		entry,
		cvEventSchema.extend({
			diplomas: z.array(diplomaSchema),
		}),
		'Training'
	);
