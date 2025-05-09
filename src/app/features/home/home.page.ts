import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LogoIcon, TypistComponent } from '@shared/components';
import { GithubService } from '../projects/services/github/github.service';

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
	github = inject(GithubService);
	protected readonly introTexts = [
		'Bienvenue sur mon portfolio 👋',
		'Je suis un développeur fullstack souhaitant construire des interfaces propres, intuitives et utiles',
		'Bonne visite ! ✨',
	];
}
