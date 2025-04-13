import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	input,
	linkedSignal,
} from '@angular/core';
import { Router } from '@angular/router';

import { ContentfullModule } from '@feat/cv/modules/contentfull/contentfull.module';
import { CVService } from '@feat/cv/services/cv.service';
import type { Job } from '@feat/cv/types';
import { LoaderComponent } from '@shared/components';
import { multiTypeSort } from '@shared/functions';
import { JobDialog } from '../components/job-dialog.component';
import { JobsTimelineComponent } from '../components/job-timeline.component';

@Component({
	selector: 'app-cv-page',
	host: { class: 'page' },
	template: `
		<div
			class="bg-white p-2 sm:p-4 rounded-lg shadow-lg min-h-full flex flex-col gap-4 max-w-[1024px] w-full mx-auto">
			<header class="flex gap-4 justify-between items-center">
				<h1 class="text-2xl font-semibold text-primary-700">
					Curriculum Vitae
				</h1>
				<!-- <button app-button appearance="icon-stroked">
					<app-icon-download class="size-[1rem] sm:size-[2rem] text-2xl" />
				</button> -->
			</header>

			<!-- Content -->
			<section
				class="flex flex-col items-center justify-start gap-4 w-full h-full overflow-y-auto flex-1 relative inset-shadow-sm  bg-gray-50 rounded-lg p-2 sm:p-4">
				@if (cvService.resourceState.isLoading()) {
					<app-loader message="chargement des informations du CV" />
				} @else {
					@if (cvService.resourceState.error()) {
						<p
							class="text-gray-700 italic max-w-prose text-pretty text-center mt-6 mx-auto">
							Impossible de récupérer les informations du CV. Merci de réessayer
							plus tard... 🙏
						</p>
					} @else {
						<app-jobs-timeline
							[jobs]="sortedJobs()"
							(setActiveJob)="setActiveJob($event)" />
					}
				}
			</section>
		</div>
		<!-- Job Modal -->
		<app-job-dialog [job]="activeJob()" (setActiveJob)="setActiveJob($event)" />
	`,
	imports: [
		ContentfullModule,
		LoaderComponent,
		JobsTimelineComponent,
		JobDialog,
	],
	providers: [CVService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CVPage {
	// I/O
	readonly jobId = input<string>();

	// Injectables
	protected readonly cvService = inject(CVService);
	protected readonly router = inject(Router);

	// Jobs
	protected readonly sortedJobs = computed(() =>
		multiTypeSort(this.cvService.jobs(), 'startDate', 'desc')
	);

	// Active Job (modal)
	protected readonly activeJob = linkedSignal<Job | null>(
		() => this.cvService.jobs().find(job => job.id === this.jobId()) ?? null
	);

	protected setActiveJob(job: Job | 'previous' | 'next' | null): void {
		if (job === 'previous' || job === 'next') {
			this.slideJob(job);
			return;
		}

		this.activeJob.set(job);

		this.router
			.navigate(['/cv'], {
				queryParams: {
					jobId: job?.id ?? null,
				},
			})
			.catch(e =>
				console.error(
					`Une erreur est survenue lors de la redirection vers: /cv?jobId=${job?.id}. Causé par: `,
					e
				)
			);
	}

	protected slideJob(direction: 'next' | 'previous'): void {
		const jobs = this.cvService.jobs();
		const currentJob = this.activeJob();
		const currentIndex = jobs.findIndex(job => job.id === currentJob?.id);

		// Si le job courant n'est pas trouvé, on fallback sur le premier ou dernier
		if (currentIndex === -1) {
			const fallbackIndex = direction === 'next' ? 0 : jobs.length - 1;
			this.setActiveJob(jobs[fallbackIndex]);
			return;
		}

		let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

		// Boucle circulaire si on dépasse
		if (nextIndex >= jobs.length) {
			nextIndex = 0;
		}
		if (nextIndex < 0) {
			nextIndex = jobs.length - 1;
		}

		const nextJob = jobs[nextIndex];
		this.setActiveJob(nextJob);
	}
}
