import {Component, HostBinding} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {PrimeNGConfig} from 'primeng/api';

import {HeaderComponent} from './layout';

/**
 * Root component of the application
 * * Sets basic layout
 * * Configure PrimeNG
 * @author louiiuol
 * @version 0.1.0
 */
@Component({
	standalone: true,
	selector: 'lou-root',
	imports: [RouterOutlet, HeaderComponent],
	template: ` <!-- Root Component -->
		<lou-header></lou-header>
		<router-outlet></router-outlet>`,
})
export class AppComponent {
	@HostBinding('class') class =
		'h-screen sm:block relative flex flex-column-reverse';

	constructor(primengConfig: PrimeNGConfig) {
		primengConfig.ripple = true;
	}
}
