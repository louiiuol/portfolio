import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ContentfullModule } from '../modules/contentfull/contentfull.module';
import { CVService } from '../services/cv.service';
import { JobCard } from './job-card.component';

@Component({
	selector: 'app-cv',
	host: {
		class: 'h-full flex flex-col gap-4',
	},
	template: `
		<nav class="w-full flex justify-start items-center gap-3">
			<p>Filters coming ...</p>
			<!-- <span>skills</span>
					<span>sort</span>
					<span>Job type (cdi, stage ..)</span> -->
		</nav>
		@if (cvService.resourceState().isLoading) {
			<p
				class="text-primary-900 text-base italic text-center leading-loose my-6">
				Chargement des informations du CV ⏳
			</p>
		} @else {
			@if (cvService.resourceState().error) {
				<p>
					Impossible de récupérer les informations du CV. Merci de réessayer
					plus tard.. 🙏
				</p>
			} @else {
				<section
					class="flex flex-col items-center justify-start gap-4 w-full h-full overflow-y-auto flex-1">
					@for (job of cvService.jobs(); track $index) {
						<app-job-card [job]="job" />
					} @empty {
						<p
							class="text-primary-900 text-sm italic text-center leading-loose">
							Aucune expérience disponible. Merci de réessayer plus tard.. 🙏
						</p>
					}
				</section>
			}
		}
	`,
	imports: [JobCard, ContentfullModule],
	providers: [CVService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CVComponent {
	protected readonly cvService = inject(CVService);
}
