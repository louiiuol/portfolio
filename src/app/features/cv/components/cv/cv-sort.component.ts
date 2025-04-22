import {
	ChangeDetectionStrategy,
	Component,
	effect,
	output,
	signal,
} from '@angular/core';

import { MenuOverlay, SortIcon, type MenuItem } from '@shared/components';
import type { SortField } from '@shared/types';
import type { CvEventField } from '../../types';

const sortableFields: (MenuItem & SortField<CvEventField>)[] = [
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
	{
		label: 'Par ordre alphabétique',
		field: 'name',
		direction: 'asc',
	},
	{
		label: 'Par ordre inverse alphabétique',
		field: 'name',
		direction: 'desc',
	},
];
export type EventSortableField = (typeof sortableFields)[number];

@Component({
	selector: 'app-cv-sort',
	template: `
		<app-menu [menuItems]="sortableFields">
			<app-icon-sort class="text-accent-300" trigger />
		</app-menu>
	`,
	imports: [MenuOverlay, SortIcon],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvSortComponent {
	readonly sortChanged = output<EventSortableField | null>();

	protected sortableFields = [...sortableFields].map(f => ({
		...f,
		action: () => this.activeSort.set(f),
	}));

	private readonly activeSort = signal<EventSortableField | null>(null);
	private readonly syncSortChanged = effect(() =>
		this.sortChanged.emit(this.activeSort())
	);
}
