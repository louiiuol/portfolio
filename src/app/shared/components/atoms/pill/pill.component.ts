import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-pill',
	host: {
		class: 'rounded-lg px-2.5 py-0.5 text-sm',
	},
	template: `<ng-content />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PillComponent {}
