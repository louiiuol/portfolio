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

	protected readonly statusColor = computed(() => {
		switch (this.status()) {
			case 'idea':
				return '#e6df5c';
			case 'draft':
				return 'text-blue-500';
			case 'in_progress':
				return 'text-green-500';
			case 'done':
				return 'text-gray-500';
			default:
				return 'text-red-500';
		}
	});

	protected readonly statusIcon = computed(() => {
		switch (this.status()) {
			case 'idea':
				return '💡';
			case 'draft':
				return '📝';
			case 'in_progress':
				return '🔄';
			case 'done':
				return '✅';
			default:
				return '❓';
		}
	});
}
