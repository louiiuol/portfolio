import {CommonModule} from '@angular/common';
import {Component, HostBinding} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {IconComponent} from '../../atoms';

/**
 * Header section of the entire application
 * @author louiiuol
 * @version 0.1.1
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
		'block surface-ground shadow-2 fadein animation-duration-500';

	contact(): void {
		alert('coming soon ! 🔥');
	}
}