import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ContentfullService } from '@feat/contentfull/services/contentfull.service';
import { multiTypeSort } from '@shared/functions';
import type { nullish } from '@shared/types';
import { Job, type CvEvent } from '../types';
import { TrainingEvent } from '../types/training.type';

@Injectable()
export class CvService {
	private readonly contentfullService = inject(ContentfullService);
	private readonly router = inject(Router);

	// All events
	readonly sortedEvents = computed(() => {
		const entries = this.contentfullService.contentResource.value();
		const state = {
			loading: this.contentfullService.contentResource.isLoading(),
			error: this.contentfullService.contentResource.error(),
		};
		if (!entries || state.loading || state.error) {
			return { ...state, data: [] };
		}

		const trainings = entries.training.map(entry => new TrainingEvent(entry));
		const jobs = entries.exprience.map(entry => new Job(entry));

		return {
			...state,
			data: multiTypeSort([...trainings, ...jobs], 'startDate', 'desc'),
		};
	});

	// Active Event (Job or School) (used by modal)
	readonly activeEvent = signal<CvEvent | null>(null);

	setActiveEvent(event: CvEvent | string | nullish): void {
		if (typeof event === 'string') {
			const found = this.sortedEvents().data.find(j => j.id === event);
			if (found) {
				this.activeEvent.set(found);
			}
			return;
		}

		this.activeEvent.set(event ?? null);

		this.router
			.navigate(['/cv'], {
				queryParams: {
					eventId: event?.id ?? null,
				},
			})
			.catch(e =>
				console.error(
					`Une erreur est survenue lors de la redirection vers: /cv?jobId=${event?.id}. Causé par: `,
					e
				)
			);
	}

	slideEvent(direction: 'next' | 'previous'): void {
		const events = this.sortedEvents().data;
		const currentIndex = events.findIndex(
			job => job.id === this.activeEvent()?.id
		);

		// If current job is not found, set the first or last job as active
		if (currentIndex === -1) {
			const fallbackIndex = direction === 'next' ? 0 : events.length - 1;
			this.setActiveEvent(events[fallbackIndex]);
			return;
		}

		let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

		// Loop around if we reach the end or beginning of the array
		if (nextIndex >= events.length) {
			nextIndex = 0;
		}
		if (nextIndex < 0) {
			nextIndex = events.length - 1;
		}

		this.setActiveEvent(events[nextIndex]);
	}
}
