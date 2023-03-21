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
 * @version 0.1.2
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
		<main
			id="global-container"
			class="flex flex-wrap-reverse align-items-end mx-3 gap-3">
			<lou-scroll-indicators></lou-scroll-indicators>
			<div id="page-content" class="mt-6 md:mt-3">
				<router-outlet></router-outlet>
			</div>
		</main>
	`,
})
export class AppComponent {
	@HostBinding('class') class =
		'h-screen sm:block relative flex flex-column-reverse gap-2';

	constructor(primengConfig: PrimeNGConfig) {
		primengConfig.ripple = true;
	}
}
