import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components';

@Component({
	selector: 'app-root',
	host: { class: 'flex flex-col' },
	template: `
		<app-header />
		<main
			class="flex-1 overflow-y-auto bg-linear-to-t from-primary-300 to-primary-700 relative">
			<div class="pattern"></div>
			<router-outlet />
		</main>
	`,
	styles: `
		:host {
			height: 100dvh;
		}
	`,
	imports: [RouterOutlet, HeaderComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
