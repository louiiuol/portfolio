import {Component, HostBinding} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MessageService, PrimeNGConfig} from 'primeng/api';
import {ToastModule} from 'primeng/toast';

import {ScrollIndicatorsComponent} from './layout/molecules';
import {HeaderComponent} from './layout/organisms';

/**
 * Root component of the application
 * * Sets basic layout
 * * Configure PrimeNG
 * @author louiiuol
 * @version 0.1.1
 */
@Component({
	standalone: true,
	selector: 'lou-root',
	imports: [
		RouterOutlet,
		HeaderComponent,
		ToastModule,
		ScrollIndicatorsComponent,
	],
	providers: [MessageService],
	template: `
		<lou-header></lou-header>
		<p-toast key="root" position="top-right"></p-toast>
		<main>
			<lou-scroll-indicators></lou-scroll-indicators>
			<router-outlet></router-outlet>
		</main>
	`,
})
export class AppComponent {
	@HostBinding('class') class =
		'h-screen sm:block relative flex flex-column-reverse';

	constructor(primengConfig: PrimeNGConfig) {
		primengConfig.ripple = true;
	}
}
