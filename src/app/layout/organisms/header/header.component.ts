import {CommonModule} from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	ViewEncapsulation,
} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ButtonModule} from 'primeng/button';

import {IconComponent} from '@layout/atoms';
import {ContactComponent} from '@modules/contact';

/**
 * Header section of the entire application
 * @author louiiuol
 * @version 0.1.1
 */
@Component({
	standalone: true,
	imports: [
		CommonModule,
		ButtonModule,
		RouterModule,
		IconComponent,
		ContactComponent,
	],
	selector: 'lou-header',
	templateUrl: './header.component.html',
	styles: [
		`
			lou-header a.active {
				font-weight: bold !important;
			}
		`,
	],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	readonly navigationLinks = ['about'];
	@HostBinding('class') class =
		'block surface-ground shadow-2 fadein animation-duration-500';
}