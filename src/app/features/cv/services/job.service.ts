import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { multiTypeSort } from '@shared/functions';
import type { nullish } from '@shared/types';
import { ContentfullService } from '../modules/contentfull/services/contentfull.service';
import { isJob, type Job } from '../types';

@Injectable()
export class JobService {
	private readonly contentfullService = inject(ContentfullService);

	protected readonly router = inject(Router);

	// Jobs
	readonly sortedJobs = computed(() => ({
		loading: this.contentfullService.contentResource.isLoading(),
		error: this.contentfullService.contentResource.error(),
		data: multiTypeSort(
			(this.contentfullService.contentResource.value()?.exprience ?? []).filter(
				isJob
			),
			'startDate',
			'desc'
		),
	}));

	// Active Job (modal)
	readonly activeJob = signal<Job | null>(null);

	setActiveJob(job: Job | string | nullish): void {
		if (typeof job === 'string') {
			const found = this.sortedJobs().data.find(j => j.id === job);

			if (found) {
				this.activeJob.set(found);
			}
			return;
		}

		this.activeJob.set(job ?? null);

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

	slideJob(direction: 'next' | 'previous'): void {
		const jobs = this.sortedJobs().data;
		const currentJob = this.activeJob();
		const currentIndex = jobs.findIndex(job => job.id === currentJob?.id);

		// If current job is not found, set the first or last job as active
		if (currentIndex === -1) {
			const fallbackIndex = direction === 'next' ? 0 : jobs.length - 1;
			this.setActiveJob(jobs[fallbackIndex]);
			return;
		}

		let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

		// Loop around if we reach the end or beginning of the array
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
