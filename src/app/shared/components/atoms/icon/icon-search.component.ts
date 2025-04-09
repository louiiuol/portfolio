import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-icon-search',
	template: `🔍`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchIcon {}
