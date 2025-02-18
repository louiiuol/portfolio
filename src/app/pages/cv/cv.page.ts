import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CVComponent } from '@feat/cv/components/cv.component';
import { ButtonComponent } from '@shared/components/atoms/button/button.component';
import { IconMaterialComponent } from '@shared/components/atoms/icon/icon.component';

@Component({
	selector: 'app-cv-page',
	host: { class: 'page' },
	template: `
		<div
			class="bg-white p-4 rounded-lg shadow-lg min-h-full flex flex-col gap-4">
			<header class="flex justify-between items-start gap-4">
				<div>
					<h1 class="text-2xl font-semibold text-primary-700 leading-loose">
						Curriculum Vitae
					</h1>
					<p class="text-sm italic text-gray-500 max-w-prose text-balance">
						Retrouvez l'ensemble de mes expériences et compétences accumulées au
						cours de ces dernières années.. ⏳
					</p>
				</div>
				<button app-button appearance="icon-stroked">
					<app-icon-material name="download" size="2rem" />
				</button>
			</header>

			<app-cv />
		</div>
	`,
	imports: [CVComponent, IconMaterialComponent, ButtonComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CVPage {}
