import {CommonModule} from '@angular/common';
import {Component, HostBinding} from '@angular/core';
import {NgxLoadingModule} from 'ngx-loading';
import {IconComponent} from '../atoms';

@Component({
	standalone: true,
	imports: [CommonModule, NgxLoadingModule, IconComponent],
	selector: 'lou-home',
	template: `<!-- Introduction Page -->
		<main
			class="h-full flex flex-column justify-content-evenly align-items-center">
			<lou-icon
				id="intro-loader"
				name="logo-expanded"
				class="w-6 mx-auto max-w-30rem"></lou-icon>
			<span>Typist element</span>
			<i class="pi pi-times"></i>
		</main> `,
})
export class HomeComponent {
	@HostBinding('class') class = 'user-view';
}
