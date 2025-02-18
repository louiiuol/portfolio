import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/organisms/header.component';

@Component({
	selector: 'app-root',
	host: { class: 'flex flex-col h-screen' },
	template: `
		<app-header />
		<main
			class="flex-1 overflow-y-auto bg-linear-to-t from-primary-300 to-primary-700">
			<router-outlet />
		</main>
	`,
	imports: [RouterOutlet, HeaderComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
