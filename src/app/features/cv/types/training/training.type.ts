import type {
	DiplomaEntry,
	PlaceEntry,
	SkillEntry,
	TrainingEntry,
} from '@feat/contentful/types';
import { diplomaSchema } from '@feat/contentful/types';
import { CvEvent, cvEventSchema } from '@feat/cv/types/cv-event/cv-event.type';
import { isSchemaType } from '@shared/functions';
import { z } from 'zod';

export class Training extends CvEvent {
	readonly type: 'Formation';
	readonly description: string;
	readonly location: PlaceEntry;
	readonly name: string;
	readonly skills: SkillEntry[];
	readonly diplomas: DiplomaEntry[];

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
			// need to tell which level is higher than other ..
			.sort((current, next) => current.level.localeCompare(next.level))
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
