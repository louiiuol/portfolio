import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-pill',
	host: {
		class:
			'rounded-xl bg-gray-200 text-gray-700 text-sm px-2.5 py-1 cursor-pointer hover:bg-gray-300',
	},
	template: `<ng-content />`,
	imports: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PillComponent {}
