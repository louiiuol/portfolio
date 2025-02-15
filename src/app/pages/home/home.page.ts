import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/components/atoms/button/button.component';
import { IconLogoComponent } from '../../shared/components/atoms/icon/icon-logo.component';
import { TypistComponent } from '../../shared/components/molecules/typist.component';

@Component({
	selector: 'app-home-page',
  host: { class: 'page py-12 gap-16 items-center justify-between bg-linear-to-t from-primary-300 to-primary-700' },
	template: `
    <app-typist [toType]="introTexts" />
    <app-icon-logo class="w-full max-w-[70%] md:max-w-3xl" variant="expanded" />
    <div class="">
      <p class="text-white tex-2xl font-medium text-center py-6 ">Que souhaitez vous voir ?</p>
      <div class="flex flex-wrap gap-4 items-center justify-center">
        <a app-button size="large" color="white" appearance="stroked" routerLink="/about" class="btn">Mes expériences</a>
        <p class="text-white px-3">ou</p>
        <a app-button size="large" color="primary" routerLink="/projects" class="btn">Mes projets</a>
      </div>
    </div>
  `,
  imports: [IconLogoComponent, TypistComponent, ButtonComponent, RouterLink],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
	protected readonly title = 'portfolio';
  protected readonly introTexts = [
		'Bienvenue sur mon portfolio 👋',
    // "Je suis un développeur web qui aime construire des interfaces propres, intuitives et utiles",
    // "Je souhaites créer des applications utiles, et collaborer sur de nouveaux projets open sources!",
    // "n'hésitez pas à me contacter si vous avez un projet en tête !",
    "Bonne visite ! 🚀",
	];
}
