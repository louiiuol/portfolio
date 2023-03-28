import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	ViewEncapsulation,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

/**
 * Simple component to indicate sections and redirect to their routerLink.
 * @author louiiuol
 * @version 1.0.0
 */
@Component({
	selector: 'lou-scroll-indicators',
	standalone: true,
	imports: [CommonModule, RouterModule],
	template: `<a
		*ngFor="let link of routes"
		class="inline-block surface-300 w-1rem h-1rem border-circle"
		[routerLink]="[link]"
		[routerLinkActiveOptions]="{exact: true}"
		routerLinkActive="active"></a>`,
	styles: [
		`
			lou-scroll-indicators a.active {
				background-color: var(--surface-0) !important;
				transform: scale(1.2);
			}
		`,
	],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollIndicatorsComponent {
	@HostBinding('class') class =
		'block w-full md:mb-0 md:h-full md:w-auto py-5 flex md:flex-column justify-content-center gap-3';

	readonly routes = ['/', '/about', '/projects'];
}
