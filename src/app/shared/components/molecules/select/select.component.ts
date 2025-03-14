import type { ElementRef } from '@angular/core';
import {
	ChangeDetectionStrategy,
	Component,
	effect,
	input,
	output,
	viewChild,
} from '@angular/core';
import type { nullish } from '@shared/types/nullish.type';

@Component({
	selector: 'app-select',
	template: `
		<select
			class="outline-2 outline-primary-300 text-primary-800 py-0.5 px-1 rounded-lg"
			#selectInput
			[id]="uuid"
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
export class SelectComponent<T> {
	readonly options = input.required<{ value: T | nullish; label: string }[]>();
	readonly selectedOption = input<T | nullish>();
	readonly label = input<string>();
	readonly valueChanged = output<T>();

	protected readonly uuid = Math.random().toString(36).substring(7);
	private readonly selectInput =
		viewChild<ElementRef<HTMLSelectElement>>('selectInput');

	constructor() {
		effect(() => {
			const input = this.selectInput();
			const initialValue = this.selectedOption();
			if (input && initialValue) {
				input.nativeElement.value = initialValue as string;
			}
		});
	}

	emit(value: string | nullish) {
		this.valueChanged.emit(value as T);
	}
}
