import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	template: `<div class="flex bg-primary pt-12">
		<h1 class="text-2xl font-medium text-center">Welcome to my {{ title }}</h1>
		<router-outlet></router-outlet>
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	title = 'portfolio';
}
