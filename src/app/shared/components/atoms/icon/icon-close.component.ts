import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-icon-close',
	template: `x`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseIcon {}
