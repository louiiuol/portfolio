import {CommonModule} from '@angular/common';
import {Component, HostBinding} from '@angular/core';
import {NgxLoadingModule} from 'ngx-loading';

@Component({
	standalone: true,
	imports: [CommonModule, NgxLoadingModule],
	selector: 'lou-home',
	template: `<!-- Introduction Page -->
		<main
			class="h-full flex flex-column justify-content-evenly align-items-center">
			<img
				id="intro-loader"
				alt="Logo used as a loader"
				src="assets/images/svg/logo-expanded.svg"
				class="w-6 mx-auto max-w-30rem" />
			<span>Typist element</span>
			<i class="pi pi-times"></i>
		</main> `,
})
export class HomeComponent {
	@HostBinding('class') class = 'user-view';
}
