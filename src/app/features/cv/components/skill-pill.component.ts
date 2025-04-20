import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Tooltip } from 'primeng/tooltip';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

@Component({
	selector: 'app-skill-pill',
	host: {
		class:
			'text-accent-400 border border-accent-400 px-3 py-1 text-xs rounded-lg cursor-help w-fit',
	},
	template: `
		<span
			class="min-w-fit whitespace-nowrap"
			autoHide="false"
			[pTooltip]="skill().description"
			[tooltipPosition]="tooltipPosition()">
			{{ skill().name }}
		</span>
	`,
	imports: [Tooltip],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillPillComponent {
	readonly skill = input.required<{ name: string; description?: string }>();
	readonly tooltipPosition = input<TooltipPosition>('top');
}
