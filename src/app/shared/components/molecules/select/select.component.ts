import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';
import type { nullish } from '@shared/types';

@Component({
	selector: 'app-select',
	template: `
		<select
			class="outline-2 outline-primary-300 text-primary-800 py-0.5 px-1 rounded-lg"
			#selectInput
			[id]="uuid"
			[value]="selectedOption()"
			(change)="emit(selectInput.value)">
			<option disabled [selected]="!selectedOption()">
				{{ label() }}
			</option>
			@for (option of options(); track $index) {
				<option [value]="option.value">
					{{ option.label }}
				</option>
			}
		</select>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent<T extends string> {
	readonly options = input.required<{ value: T | nullish; label: string }[]>();
	readonly selectedOption = input<T | nullish>();
	readonly label = input<string>();
	readonly valueChanged = output<T | nullish>();

	protected readonly uuid = Math.random().toString(36).substring(7);
	// private readonly selectInput =
	// 	viewChild<ElementRef<HTMLSelectElement>>('selectInput');

	// constructor() {
	// 	effect(() => {
	// 		const input = this.selectInput();
	// 		const initialValue = this.selectedOption();
	// 		if (input && initialValue) {
	// 			input.nativeElement.value = initialValue;
	// 		}
	// 	});
	// }

	emit(value: string | nullish) {
		this.valueChanged.emit(value as T);
	}
}
