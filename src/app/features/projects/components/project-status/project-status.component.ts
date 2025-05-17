import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from '@angular/core';
import type { ProjectStatus } from '@feat/contentful/types';

@Component({
	selector: 'app-project-status',
	host: {
		'class': 'bg-slate-100 border border-current text-sm rounded-lg px-2 py-1',
		'[class]': 'statusColor()',
	},
	template: ` {{ statusIcon() }} {{ statusLabel() }}`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectStatusComponent {
	readonly status = input.required<ProjectStatus>();

	protected readonly statusLabel = computed(() => {
		switch (this.status()) {
			case 'idea':
				return 'Idée';
			case 'draft':
				return 'Brouillon';
			case 'in_progress':
				return 'En cours';
			case 'done':
				return 'Terminé';
			default:
				return 'Inconnu';
		}
	});

	protected readonly statusColor = computed(() => {
		switch (this.status()) {
			case 'idea':
				return 'text-yellow-500';
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
