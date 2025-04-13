import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { multiTypeSort } from '../../../shared/functions';
import type { nullish } from '../../../shared/types';
import type { Job } from '../types';
import { CVService } from './cv.service';

@Injectable()
export class JobService {
	protected readonly cvService = inject(CVService);
	protected readonly router = inject(Router);

	// Jobs
	readonly sortedJobs = computed(() =>
		multiTypeSort(this.cvService.jobs(), 'startDate', 'desc')
	);

	// Active Job (modal)
	readonly activeJob = signal<Job | null>(null);

	setActiveJob(job: Job | string | nullish): void {
		if (typeof job === 'string') {
			const found = this.sortedJobs().find(j => j.id === job);

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
