import {CommonModule} from '@angular/common';
import {Component, HostBinding, ViewEncapsulation} from '@angular/core';
import {RouterModule} from '@angular/router';
import {IconComponent, TypistComponent} from '../../atoms';

/**
 * Introduction Page: greets user w/ custom animations and redirect to 'about' page
 * @author louiiuol
 * @version 0.1.0
 */
@Component({
	standalone: true,
	imports: [CommonModule, RouterModule, IconComponent, TypistComponent],
	selector: 'lou-home',
	styleUrls: ['./home.component.scss'],
	encapsulation: ViewEncapsulation.None,
	template: `<!-- Introduction Page -->
		<main
			class="h-full flex flex-column justify-content-evenly align-items-center">
			<lou-icon
				id="intro-loader"
				name="logo-expanded"
				class="w-12 mx-auto sm:w-8 max-w-screen "></lou-icon>
			<lou-typist
				class="invisible fadein animation-duration-1000 animation-delay-4 animation-forwards text-xl sm:text-5xl"
				[toType]="introTexts"
				[startingDelay]="5"
				[newTextDelay]="2"></lou-typist>
			<a [routerLink]="['/about']">
				<i
					class="pi pi-arrow-circle-down text-6xl text-50 invisible fadein animation-duration-2000 animation-iteration-2 animation-delay-10 animation-forwards">
				</i>
			</a>
		</main> `,
})
export class HomeComponent {
	@HostBinding('class') class = 'user-view';

	introTexts = [
		'Welcome to my portfolio,',
		"I'm a web developer that loves building clean, intuitive and useful UIs ",
		'I can help you designing your wireframes, business logic, or architecture',
		'I want to create useful apps, that helps peoples and society, not another wasting time toy ..',
		"I'd like to collaborate on new projects, feel free to contact me if you have a project in mind !",
	];
}
