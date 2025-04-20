import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
	selector: 'app-skill-pill',
	host: {
		class:
			'text-accent-400 border border-accent-400 px-3 py-1 text-xs rounded-lg  w-fit',
	},
	template: `
		<span class="min-w-fit whitespace-nowrap">
			{{ skill().name }}
		</span>
	`,

	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillPillComponent {
	readonly skill = input.required<{ name: string; description?: string }>();
}
