import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from '@angular/core';
import {
	getProjectStatusInfo,
	type ProjectStatus,
} from '@feat/contentful/types';

@Component({
	selector: 'app-project-status',
	host: {
		'class': 'bg-slate-100 border border-current text-sm rounded-lg px-2 py-1',
		'[style.color]': 'statusInfo()?.color',
	},
	template: `
		@if (statusInfo(); as info) {
			{{ info.icon }} {{ info.label }}
		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectStatusComponent {
	readonly status = input.required<ProjectStatus>();

	protected readonly statusInfo = computed(() =>
		getProjectStatusInfo(this.status())
	);
}
