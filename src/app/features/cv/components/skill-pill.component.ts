import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Tooltip } from 'primeng/tooltip';

@Component({
	selector: 'app-skill-pill',
	host: {
		class:
			'text-accent-400 border border-accent-400 px-3 py-1 text-xs rounded-lg cursor-help',
	},
	template: `
		<span
			class=""
			autoHide="false"
			tooltipPosition="bottom"
			[pTooltip]="skill().description">
			{{ skill().name }}
		</span>
	`,
	imports: [Tooltip],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillPillComponent {
	skill = input.required<{ name: string; description?: string }>();
}
