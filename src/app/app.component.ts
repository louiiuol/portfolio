import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-root',
	template: `
		<div class="bg-primary flex pt-12">
			<h1 class="text-primary-500 w-full text-center text-2xl font-medium">
				Welcome to my {{ title }}
			</h1>
			<router-outlet />
		</div>
	`,
	imports: [RouterOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	title = 'portfolio';
}
