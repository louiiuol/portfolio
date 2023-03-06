import {CommonModule} from '@angular/common';
import {Component, HostBinding} from '@angular/core';
import {ButtonModule} from 'primeng/button';

@Component({
	standalone: true,
	imports: [CommonModule, ButtonModule],
	selector: 'lou-header',
	template: `
		<a
			pButton
			id="logo"
			type="button"
			routerLink="/home"
			class="text-niconne text-4xl p-button-text p-button-sm"
			>Louis Godlewski</a
		>
		<ul id="navigation-links" class="flex gap-3">
			<li>
				<a
					pButton
					pRipple
					routerLink="/home"
					type="button"
					label="home"
					class="p-button-text p-button-sm"></a>
			</li>
			<li>
				<a
					pButton
					pRipple
					routerLink="/about"
					type="button"
					label="about"
					class="p-button-text p-button-sm"></a>
			</li>
			<li>
				<button
					pButton
					type="button"
					label="contact"
					class="p-button-sm"></button>
			</li>
		</ul>
	`,
})
export class HeaderComponent {
	@HostBinding('class') class =
		'surface-ground h-4rem flex px-5 py-2 align-items-center justify-content-between shadow-2';
}
