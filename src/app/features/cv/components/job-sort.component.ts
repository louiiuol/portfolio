import {
	ChangeDetectionStrategy,
	Component,
	effect,
	output,
	signal,
} from '@angular/core';
import type { MenuItem } from '@shared/components';
import { MenuOverlay } from '@shared/components';
import { IconMaterialComponent } from '@shared/components/atoms/icon/icon.component';
import type { SortField } from '@shared/types/sort.type';
import type { JobField } from '../types/job.type';

const sortableFields: (MenuItem & SortField<JobField>)[] = [
	{ label: 'Ordre alphabétique', field: 'title', direction: 'asc' },
	{
		label: 'Du plus récent au plus ancien',
		field: 'startDate',
		direction: 'asc',
		action: () => {},
	},
	{
		label: 'Du plus ancien au plus récent',
		field: 'startDate',
		direction: 'desc',
	},
];
export type SortableField = (typeof sortableFields)[number];

@Component({
	selector: 'app-job-sort',
	host: { class: '' },
	template: `
		<app-menu [menuItems]="sortableFields">
			<app-icon-material
				class="text-accent-400 size-6"
				name="sort"
				size="small"
				trigger />
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

	private readonly activeSort = signal<SortableField | null>(null);

	readonly sortChanged = output<SortableField | null>();

	constructor() {
		effect(() => this.sortChanged.emit(this.activeSort()));
	}
}
