import {
	ChangeDetectionStrategy,
	Component,
	effect,
	inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { EVENT_TYPES, type CvEventType, type Skill } from '@feat/cv/types';
import { deepEqualObjects, isEmpty } from '@shared/functions';
import { isNotNullish, type nullish } from '@shared/types';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { debounceTime } from 'rxjs';
import { CvService } from '../../services/cv.service';

@Component({
	selector: 'app-cv-filters',
	template: `
		<form
			class="flex flex-wrap gap-2 items-center justify-start flex-1 max-w-lg"
			[formGroup]="filtersForm">
			<p-select
				class="flex-1"
				optionLabel="label"
				optionValue="value"
				placeholder="Type de contrat"
				showClear
				size="small"
				[formControl]="filtersForm.controls.eventType"
				[options]="eventTypes" />

			@if (cvService.skills(); as skills) {
				<p-multiselect
					class="flex-1"
					emptyFilterMessage="Aucune compétence"
					optionLabel="name"
					optionValue="name"
					placeholder="Compétences"
					showClear
					size="small"
					[formControl]="filtersForm.controls.skills"
					[options]="skills" />
			} @else {
				<span class="bg-slate-200 rounded-lg w-52 flex-1">chargement</span>
			}

			<ng-content select="[suffix]" />
		</form>
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
	protected readonly cvService = inject(CvService);

	protected readonly filtersForm = new FormGroup({
		eventType: new FormControl<CvEventType | nullish>(null, {
			nonNullable: true,
		}),
		skills: new FormControl<Skill['name'][]>([], {
			nonNullable: true,
		}),
	});

	protected readonly eventTypes = EVENT_TYPES;

	constructor() {
		// Patch filters effect
		effect(() => {
			const filtersInput = this.cvService.filters();
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
				const filtersInput = this.cvService.filters();
				if (!deepEqualObjects(filtersOutput, filtersInput)) {
					this.cvService.updateFilters({
						...filtersOutput,
						skills: filtersOutput.skills?.filter(isNotNullish) ?? [],
					});
				}
			});
	}
}
