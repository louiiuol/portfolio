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

import { SkillService } from '@feat/cv/services/skill.service';

import {
	EVENT_TYPES,
	type ContractType,
	type CvEventType,
	type Skill,
} from '@feat/cv/types';
import { deepEqualObjects, isEmpty } from '@shared/functions';
import { isNotNullish, type nullish } from '@shared/types';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { debounceTime } from 'rxjs';

export type CvFilters = {
	contractType?: ContractType | nullish;
	skills: Skill['name'][];
};

@Component({
	selector: 'app-cv-filters',
	host: { class: 'inline-flex items-center gap-4 flex-1' },
	template: `
		<form
			class="flex gap-2 items-center justify-start flex-1 md:flex-0"
			[formGroup]="filtersForm">
			<p-select
				class="md:w-52 !hidden md:!flex"
				optionLabel="label"
				optionValue="value"
				placeholder="Type de contrat"
				showClear
				size="small"
				[formControl]="filtersForm.controls.eventType"
				[options]="eventTypes" />

			<p-multiselect
				class="lg:w-52 !hidden lg:!flex"
				emptyFilterMessage="Aucune compétence"
				optionLabel="name"
				optionValue="name"
				placeholder="Compétences"
				showClear
				size="small"
				[formControl]="filtersForm.controls.skills"
				[options]="cvService.skills()" />
		</form>

		<ng-content select="[suffix]" />
	`,

	imports: [
		ReactiveFormsModule,
		SelectModule,
		IconFieldModule,
		InputIconModule,
		MultiSelectModule,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvFiltersComponent {
	readonly filters = input.required<CvFilters>();
	readonly filtersChanged = output<CvFilters>();

	protected readonly cvService = inject(SkillService);

	protected readonly filtersForm = new FormGroup({
		eventType: new FormControl<CvEventType | nullish>(null),
		skills: new FormControl<Skill['name'][]>([], {
			nonNullable: true,
		}),
	});

	protected readonly eventTypes = EVENT_TYPES;

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
