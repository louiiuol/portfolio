import {
	ChangeDetectionStrategy,
	Component,
	effect,
	inject,
	input,
	output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CVService } from '@feat/cv/services/cv.service';
import { CONTRACT_TYPES, type ContractType, type Skill } from '@feat/cv/types';
import { deepEqualObjects, isEmpty } from '@shared/functions';
import { isNotNullish, type nullish } from '@shared/types';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { debounceTime } from 'rxjs';

export type JobFilters = {
	search?: string | nullish;
	contractType?: ContractType | nullish;
	skills: Skill['name'][];
};

@Component({
	selector: 'app-job-filters',
	host: { class: 'inline-flex justify-start items-center gap-3' },
	template: `
		<form class="flex gap-3 items-center" [formGroup]="filtersForm">
			<p-iconfield>
				<p-inputicon styleClass="pi pi-search" />
				<input
					pInputText
					placeholder="Rechercher par mot clé"
					pSize="small"
					type="search"
					[formControl]="filtersForm.controls.search" />
			</p-iconfield>

			<p-select
				class="w-full md:w-56"
				optionLabel="label"
				optionValue="value"
				placeholder="Type de contrat"
				showClear
				size="small"
				[formControl]="filtersForm.controls.contractType"
				[options]="contractOptions" />

			<p-multiselect
				class="max-w-xs"
				filter="false"
				optionLabel="name"
				optionValue="name"
				placeholder="Compétences"
				showClear
				showToggleAll="false"
				size="small"
				[formControl]="filtersForm.controls.skills"
				[options]="cvService.skills()" />
		</form>
	`,
	imports: [
		ReactiveFormsModule,
		SelectModule,
		IconFieldModule,
		InputIconModule,
		InputText,
		MultiSelectModule,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobFiltersComponent {
	readonly filters = input.required<JobFilters>();
	readonly filtersChanged = output<JobFilters>();

	protected readonly cvService = inject(CVService);

	protected readonly filtersForm = new FormGroup({
		search: new FormControl<string | nullish>(null),
		contractType: new FormControl<ContractType | nullish>(null),
		skills: new FormControl<Skill['name'][]>([], {
			nonNullable: true,
		}),
	});

	protected readonly contractOptions = [...CONTRACT_TYPES];

	constructor() {
		// Patch filters effect
		effect(() => {
			const filtersInput = this.filters();
			if (
				!deepEqualObjects(filtersInput, this.filtersForm.value) &&
				!isEmpty(filtersInput)
			) {
				this.filtersForm.patchValue(filtersInput);
			}
		});

		// Emit filters changed
		this.filtersForm.valueChanges
			.pipe(debounceTime(300), takeUntilDestroyed())
			.subscribe(filtersOutput => {
				const filtersInput = this.filters();
				if (!deepEqualObjects(filtersOutput, filtersInput)) {
					this.filtersChanged.emit({
						...filtersOutput,
						skills: filtersOutput.skills?.filter(isNotNullish) ?? [],
					});
				}
			});
	}
}
