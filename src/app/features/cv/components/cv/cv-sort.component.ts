import {
	ChangeDetectionStrategy,
	Component,
	effect,
	output,
	signal,
} from '@angular/core';

import { MenuOverlay, SortIcon, type MenuItem } from '@shared/components';
import type { SortField } from '@shared/types';

const sortableFields: (MenuItem & SortField<'startDate'>)[] = [
	{
		label: 'Du plus récent au plus ancien',
		field: 'startDate',
		direction: 'desc',
	},
	{
		label: 'Du plus ancien au plus récent',
		field: 'startDate',
		direction: 'asc',
	},
];
export type JobSortableField = (typeof sortableFields)[number];

@Component({
	selector: 'app-job-sort',
	template: `
		<app-menu [menuItems]="sortableFields">
			<app-icon-sort class="text-slate-600" trigger />
		</app-menu>
	`,
	imports: [MenuOverlay, SortIcon],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvSortComponent {
	readonly sortChanged = output<JobSortableField | null>();

	protected sortableFields = [...sortableFields].map(f => ({
		...f,
		action: () => this.activeSort.set(f),
	}));

	private readonly activeSort = signal<JobSortableField | null>(null);
	private readonly syncSortChanged = effect(() =>
		this.sortChanged.emit(this.activeSort())
	);
}
