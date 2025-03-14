import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MenuOverlay, SortIcon, type MenuItem } from '@shared/components';
import type { SortField } from '@shared/types';
import { CvService } from '../../services/cv.service';
import type { CvEventField } from '../../types';

const sortableFields: (MenuItem & SortField<CvEventField>)[] = [
	{
		label: 'Du plus récent au plus ancien',
		sortBy: 'startDate',
		direction: 'desc',
	},
	{
		label: 'Du plus ancien au plus récent',
		sortBy: 'startDate',
		direction: 'asc',
	},
	{
		label: 'Par ordre alphabétique',
		sortBy: 'name',
		direction: 'asc',
	},
	{
		label: 'Par ordre inverse alphabétique',
		sortBy: 'name',
		direction: 'desc',
	},
];
export type EventSortableField = (typeof sortableFields)[number];

@Component({
	selector: 'app-cv-sort',
	template: `
		<app-menu [menuItems]="sortableFields">
			<app-icon-sort class="text-accent-300 mt-1.5" trigger />
		</app-menu>
	`,
	imports: [MenuOverlay, SortIcon],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvSortComponent {
	protected readonly sortableFields = [...sortableFields].map(f => ({
		...f,
		action: () => this.cvService.sort.set(f),
	}));

	protected readonly cvService = inject(CvService);
}
