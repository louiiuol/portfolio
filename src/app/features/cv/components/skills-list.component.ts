import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Skill } from '../types';
import { SkillPillComponent } from './skill-pill.component';

@Component({
	selector: 'app-skills-list',
	host: {
		class: 'flex gap-2 flex-wrap justify-start items-center w-full mt-1',
	},
	template: ` @for (skill of skills().slice(0, 3); track $index) {
			<app-skill-pill [skill]="skill" />
		}
		@let remainingSkills = skills().length - 3;
		@if (remainingSkills > 0) {
			<span class="text-xs text-gray-500">
				+ {{ remainingSkills }} autres
			</span>
		}`,
	imports: [SkillPillComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsListComponent {
	skills = input.required<Array<Skill>>();
}
