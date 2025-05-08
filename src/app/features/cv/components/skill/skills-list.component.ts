import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from '@angular/core';
import type { Skill } from '@feat/contentfull/types';
import { SkillPillComponent } from './skill-pill.component';

@Component({
	selector: 'app-skills-list',
	host: {
		class: 'inline-flex flex-wrap gap-2 justify-start items-center',
	},
	template: `
		@for (skill of shownSkills(); track $index) {
			<app-skill-pill [skill]="skill" />
		} @empty {
			@if (showEmpty()) {
				<p class="text-sm text-slate-500">Aucune compétence associée</p>
			}
		}
		@if (!showAll()) {
			@let remainingSkills = skills().length - this.limit();
			@if (remainingSkills > 0) {
				<span class="text-xs text-slate-500 w-fit">
					+ {{ remainingSkills }} autres
				</span>
			}
		}
	`,
	imports: [SkillPillComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsListComponent {
	readonly skills = input.required<Array<Skill>>();
	readonly showAll = input(false, { transform: booleanAttribute });
	readonly showEmpty = input(false, { transform: booleanAttribute });
	readonly showMore = input(false, { transform: booleanAttribute });
	readonly limit = input(3);

	protected readonly shownSkills = computed(() =>
		this.showAll() ? this.skills() : this.skills().slice(0, this.limit())
	);
}
