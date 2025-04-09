import {
	ChangeDetectionStrategy,
	Component,
	effect,
	input,
	output,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MaterialIcon } from '@shared/components/atoms';
import { isNotNullish, type nullish } from '@shared/types';
import { debounceTime, filter, map, shareReplay, startWith } from 'rxjs';

@Component({
	selector: 'app-search-input',
	host: {
		class:
			'flex items-center gap-2 outline-2 outline-primary-300 text-primary-800 py-0.5 px-1 rounded-lg',
	},
	template: `
		<app-icon-material name="search" />
		<div>
			<input
				class="appearance-none bg-transparent border-none focus:outline-none"
				role="searchbox"
				type="search"
				[formControl]="searchControl"
				[placeholder]="placeholder()"
				[style.maxWidth]="maxWidth()"
				[style.minWidth]="minWidth()"
				[style.width]="inputWidth()" />
			@if (hint()) {
				<p class="text-xs text-gray-500 mt-2">{{ hint() }}</p>
			}
		</div>
	`,
	imports: [ReactiveFormsModule, MaterialIcon],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {
	readonly value = input<string | nullish>();
	readonly placeholder = input('Rechercher par mot clé');
	readonly hint = input<string>();
	readonly searchChanged = output<string>();
	readonly minWidth = input('21ch');
	readonly maxWidth = input('30ch');

	protected readonly searchControl = new FormControl('');
	protected readonly setSearchControlValue = effect(() => {
		const searchValue = this.value();
		if (searchValue) {
			this.searchControl.setValue(searchValue);
		}
	});

	protected readonly searchTermSubscription = this.searchControl.valueChanges
		.pipe(
			debounceTime(400),
			startWith(this.value()),
			takeUntilDestroyed(),
			shareReplay(1),
			filter(isNotNullish)
		)
		.subscribe(searchValue => this.searchChanged.emit(searchValue));

	protected readonly inputWidth = toSignal(
		this.searchControl.valueChanges.pipe(
			map(value => `${(value?.length ?? 0) - 5}ch`)
		)
	);
}
