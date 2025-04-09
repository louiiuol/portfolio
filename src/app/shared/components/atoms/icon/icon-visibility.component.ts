import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-icon-visibility',
	template: `👁️`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisibilityIcon {}
