import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ContentfullService } from '@feat/contentfull/services/contentfull.service';
import { multiTypeSort, removeNullishProps } from '@shared/functions';
import type { nullish, SortDirection } from '@shared/types';
import type { EventSortableField } from '../components/cv/cv-sort.component';
import type { CvEvent, CvEventField, CvEventType } from '../types';
import { isSkill, Job, Training } from '../types';

export type CvFilters = {
	eventType?: CvEventType | nullish;
	skills?: string[];
};
const initialFilters: CvFilters = {
	eventType: null,
	skills: [],
};

@Injectable()
export class CvService {
	private readonly contentfullService = inject(ContentfullService);
	private readonly router = inject(Router);

	readonly skills = computed(() =>
		(this.contentfullService.contentResource.value()?.skill ?? []).filter(
			isSkill
		)
	);

	readonly filters = signal<CvFilters>(initialFilters);
	readonly sort = signal<{ sortBy: CvEventField; direction: SortDirection }>({
		sortBy: 'startDate',
		direction: 'asc',
	});

	// All CV events
	readonly sortedEvents = computed(() => {
		const entries = this.contentfullService.contentResource.value();
		const states = {
			loading: this.contentfullService.contentResource.isLoading(),
			error: this.contentfullService.contentResource.error(),
		};
		if (!entries || states.loading || states.error) {
			return { ...states, data: [] };
		}

		let filtered = [
			...entries.training.map(entry => new Training(entry)),
			...entries.exprience.map(entry => new Job(entry)),
		];

		const { eventType, skills } = this.filters();

		if (eventType) {
			filtered = filtered.filter(job => job.type === eventType);
		}

		if (skills?.length) {
			filtered = filtered.filter(job =>
				skills.some(s => job.skills.map(s => s.name).includes(s))
			);
		}

		const { sortBy, direction } = this.sort();

		return {
			...states,
			data: multiTypeSort(filtered, sortBy, direction),
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
					`Une erreur est survenue lors de la redirection vers: /cv?event=${event?.id}. Causé par: `,
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

	updateFilters(filters: Partial<CvFilters>): void {
		this.filters.set(
			removeNullishProps({
				...this.filters(),
				...filters,
			})
		);
	}

	updateSort(sortBy: EventSortableField | null) {
		this.sort.set({
			sortBy: sortBy?.field ?? 'startDate',
			direction: sortBy?.direction ?? 'asc',
		});
	}
}
