import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from '@angular/core';

@Component({
	selector: 'app-pill',
	host: {
		'class': 'rounded-xl text-sm px-2.5 py-1 cursor-pointer ',
		'[class]': 'appearanceClasses()',
	},
	template: `<ng-content />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PillComponent {
	readonly appearance = input<'default' | 'outline' | 'filled'>();
	readonly color = input<
		'primary' | 'accent' | 'green' | 'orange' | 'red' | 'white' | 'gray'
	>();

	protected readonly appearanceClasses = computed(() => {
		switch (this.appearance()) {
			case 'outline':
				return `border-2 border-${this.color()}-500 text-${this.color()}-500 hover:bg-${this.color()}-300`;
			case 'filled':
				return `bg-${this.color()}-500 hover:bg-${this.color()}-800 ${this.color() === 'white' ? 'text-gray-700' : 'text-white'}`;
			default:
				return `bg-${this.color()}-200 hover:bg-${this.color()}-400 text-${this.color()}-700`;
		}
	});
}
