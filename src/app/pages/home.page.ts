import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-home-page',
	template: ` <h1 class="text-2xl font-medium">Coming soon ..</h1> `,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}
