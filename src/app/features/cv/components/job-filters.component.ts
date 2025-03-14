import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';
import { SearchInputComponent } from '@shared/components';

import { SelectComponent } from '@shared/components/molecules/select/select.component';
import type { nullish } from '@shared/types/nullish.type';
import type { ContractType } from '../types/job.type';

export type JobFilters = {
	search?: string | nullish;
	contractType?: ContractType | nullish;
};

@Component({
	selector: 'app-job-filters',
	host: { class: 'inline-flex justify-start items-center gap-3' },
	template: `
		<app-search-input
			[value]="filters()?.search"
			(searchChanged)="updateFilters({ search: $event })" />

		<app-select
			label="Type de contrat"
			[options]="contractOptions"
			[selectedOption]="filters()?.contractType"
			(valueChanged)="updateFilters({ contractType: $event })" />
	`,
	imports: [SearchInputComponent, SelectComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobFiltersComponent {
	readonly filters = input<JobFilters>();
	readonly filtersChanged = output<JobFilters>();

	protected readonly contractOptions: {
		value: ContractType | '**';
		label: string;
	}[] = [
		{ value: '**', label: 'Tous type de contrat' },
		{ value: 'cdi', label: 'CDI' },
		{ value: 'cdd', label: 'CDD' },
		{ value: 'freelance', label: 'Freelance' },
		{ value: 'alternance', label: 'Alternance' },
		{ value: 'stage', label: 'Stage' },
	];

	protected readonly updateFilters = (filters: Partial<JobFilters>) => {
		this.filtersChanged.emit({
			...this.filters(),
			...filters,
		});
	};
}
