import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LogoIcon } from '@shared/components/atoms/icon/icon-logo.component';
import { TypistComponent } from '@shared/components/molecules/typist/typist.component';

@Component({
	selector: 'app-home-page',
	host: { class: 'page gap-16 items-center justify-start px-3 pt-3' },
	template: `
		<app-typist class="max-w-xl" [toType]="introTexts" />
		<app-icon-logo
			class="w-full max-w-[60%] lg:max-w-3xl my-auto"
			variant="expanded" />
	`,
	imports: [LogoIcon, TypistComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
	protected readonly title = 'portfolio';
	protected readonly introTexts = [
		'Bienvenue sur mon portfolio 👋',
		// "Je suis un développeur web qui aime construire des interfaces propres, intuitives et utiles",
		// "Je souhaites créer des applications utiles, et collaborer sur de nouveaux projets open sources!",
		// "n'hésitez pas à me contacter si vous avez un projet en tête !",
		'Bonne visite ! 🚀',
	];
}
