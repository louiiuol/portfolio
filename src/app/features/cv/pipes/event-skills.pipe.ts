import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import type { CvEvent, Skill } from '../types';
import { isJob } from '../types';

@Pipe({
	name: 'eventSkills',
})
export class EventSkillsPipe implements PipeTransform {
	transform(value: CvEvent): Skill[] {
		return isJob(value)
			? value.skills
			: value.diplomas
					.map(diploma => diploma.skills)
					.flat()
					.filter(
						(skills, index, self) =>
							index === self.findIndex(skill => skill.name === skills.name)
					);
	}
}
