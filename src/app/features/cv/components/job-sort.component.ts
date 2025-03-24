import {
	ChangeDetectionStrategy,
	Component,
	effect,
	output,
	signal,
} from '@angular/core';

import type { JobField } from '@feat/cv/types';
import {
	IconMaterialComponent,
	MenuOverlay,
	type MenuItem,
} from '@shared/components';
import type { SortField } from '@shared/types';

const sortableFields: (MenuItem & SortField<JobField>)[] = [
	{ label: 'Ordre alphabétique', field: 'title', direction: 'asc' },
	{
		label: 'Du plus récent au plus ancien',
		field: 'startDate',
		direction: 'asc',
	},
	{
		label: 'Du plus ancien au plus récent',
		field: 'startDate',
		direction: 'desc',
	},
];
export type JobSortableField = (typeof sortableFields)[number];

@Component({
	selector: 'app-job-sort',
	template: `
		<app-menu [menuItems]="sortableFields">
			<app-icon-material class="text-accent-400" name="sort" trigger />
		</app-menu>
	`,
	imports: [IconMaterialComponent, MenuOverlay],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobSortComponent {
	protected sortableFields = [...sortableFields].map(f => ({
		...f,
		action: () => this.activeSort.set(f),
	}));

	private readonly activeSort = signal<JobSortableField | null>(null);

	readonly sortChanged = output<JobSortableField | null>();

	constructor() {
		effect(() => this.sortChanged.emit(this.activeSort()));
	}
}
