import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import type { Training } from '../types';

@Pipe({
	name: 'trainingSkills',
})
export class TrainingSkillsPipe implements PipeTransform {
	transform(value: Training) {
		return value.diplomas
			.map(diploma => diploma.skills)
			.flat()
			.filter((skills, index, self) => {
				return index === self.findIndex(skill => skill.name === skills.name);
			});
	}
}
