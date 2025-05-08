import type {
	Diploma,
	Place,
	Skill,
	TrainingEntry,
} from '@feat/contentfull/types';
import { diplomaSchema } from '@feat/contentfull/types';
import { CvEvent, cvEventSchema } from '@feat/cv/types';
import { isSchemaType } from '@shared/functions';
import { z } from 'zod';

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
