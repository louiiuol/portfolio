import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import type { Skill, Training } from '../types';

@Pipe({
	name: 'trainingSkills',
})
export class TrainingSkillsPipe implements PipeTransform {
	/**
	 * This pipe extracts all skills from the diplomas associated with the training and returns a flattened array of unique skills.
	 * @param value The training object containing diplomas and skills
	 * @returns An array of unique skills from all diplomas associated with the training
	 */
	transform = (value: Training): Skill[] =>
		value.diplomas
			.map(diploma => diploma.skills)
			.flat()
			.filter(
				(skills, index, self) =>
					index === self.findIndex(skill => skill.name === skills.name)
			);
}
