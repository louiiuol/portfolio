import {
	ChangeDetectionStrategy,
	Component,
	effect,
	inject,
	input,
} from '@angular/core';

import { ContentfullModule } from '@feat/cv/modules/contentfull/contentfull.module';
import { CVService } from '@feat/cv/services/cv.service';
import { LoaderComponent } from '@shared/components';
import { JobDialog } from '../components/job-dialog.component';
import { JobsTimelineComponent } from '../components/job-timeline.component';
import { JobService } from '../services/job.service';

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
							[jobs]="jobService.sortedJobs()"
							(setActiveJob)="jobService.setActiveJob($event)" />
					}
				}
			</section>
		</div>
		<!-- Job Modal -->
		<app-job-dialog
			[job]="jobService.activeJob()"
			(setActiveJob)="setActiveJob($event)" />
	`,
	imports: [
		ContentfullModule,
		LoaderComponent,
		JobsTimelineComponent,
		JobDialog,
	],
	providers: [CVService, JobService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CVPage {
	// I/O
	readonly jobId = input<string>();

	// Injectables
	protected readonly cvService = inject(CVService);
	protected readonly jobService = inject(JobService);

	constructor() {
		// Sync active job with the URL query params
		effect(() => this.jobService.setActiveJob(this.jobId()));
	}

	protected setActiveJob(target: 'previous' | 'next' | null): void {
		if (target === 'previous' || target === 'next') {
			this.jobService.slideJob(target);
		} else {
			this.jobService.setActiveJob(target);
		}
	}
}
