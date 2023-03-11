import {CommonModule} from '@angular/common';
import {Component, HostBinding} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {IconComponent} from '../../atoms';

/**
 * Header section of the entire application
 * @author louiiuol
 * @version 0.1.0
 */
@Component({
	standalone: true,
	imports: [CommonModule, ButtonModule, RouterModule, IconComponent],
	selector: 'lou-header',
	templateUrl: './header.component.html',
})
export class HeaderComponent {
	readonly navigationLinks = ['about'];
	@HostBinding('class') class =
		'surface-ground pr-5 py-2 shadow-2 flex align-items-center justify-content-between';

	contact(): void {
		alert('coming soon ! 🔥');
	}
}
