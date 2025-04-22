import {
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	inject,
	input,
	linkedSignal,
	model,
} from '@angular/core';

import { Router } from '@angular/router';
import { ContentfullModule } from '@feat/contentfull/contentfull.module';
import {
	ButtonComponent,
	Card,
	ErrorMessageComponent,
	LoaderComponent,
} from '@shared/components';
import {
	deepEqualObjects,
	isEmpty,
	multiTypeSort,
	removeNullishProps,
} from '@shared/functions';
import { isNotNullish, type nullish, type SortDirection } from '@shared/types';

import { CvFiltersComponent } from '../components/cv/cv-filters.component';
import type { EventSortableField } from '../components/cv/cv-sort.component';
import { CvSortComponent } from '../components/cv/cv-sort.component';
import { CvTimelineComponent } from '../components/cv/cv-timeline.component';
import { EventDialog } from '../components/event/event-dialog.component';
import { CvService } from '../services/cv.service';
import { SkillService } from '../services/skill.service';
import type { CvEventField, CvEventType, Skill } from '../types';

const initialFilters: { eventType: CvEventType | null; skills: string[] } = {
	eventType: null,
	skills: [],
};
type CvFilters = typeof initialFilters;

@Component({
	selector: 'app-cv-page',
	host: { class: 'page' },
	template: `
		<app-card
			class="min-h-full  max-w-[1024px] w-full mx-auto !rounded-none sm:!rounded-lg">
			<h1 heading>Curriculum Vitae</h1>
			<nav class="flex gap-6 justify-between items-center" subHeader>
				<app-cv-filters
					[filters]="filters()"
					(filtersChanged)="updateFilters($event)">
					@if (!filtersEqualsInitialOne()) {
						<button
							class="sm:!block !hidden"
							app-button
							appearance="stroked"
							color="red"
							pTooltip="Réinitialiser les filtres"
							size="small"
							suffix
							tooltipPosition="bottom"
							(click)="resetFilters()">
							Réinitialiser
						</button>
					}
				</app-cv-filters>
				<app-cv-sort class="ml-auto" (sortChanged)="updateSort($event)" />
			</nav>

			<!-- Main content -->
			@if (cvService.sortedEvents().loading) {
				<app-loader message="chargement des informations du CV" />
			} @else if (cvService.sortedEvents().error) {
				<app-error-message [errorMessage]="errorMessage" />
			} @else {
				<app-cv-timeline
					[events]="filteredJobs()"
					(setActiveEvent)="cvService.setActiveEvent($event)" />
			}
		</app-card>

		<!-- Job Modal -->
		<app-event-dialog
			[event]="cvService.activeEvent()"
			(setActiveEvent)="switchActiveEvent($event)" />
	`,
	imports: [
		ContentfullModule,
		LoaderComponent,
		CvTimelineComponent,
		EventDialog,
		Card,
		ErrorMessageComponent,
		CvFiltersComponent,
		CvSortComponent,
		ButtonComponent,
	],
	providers: [CvService, SkillService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvPage {
	// I/O
	readonly eventId = input<string>();
	readonly sortBy = model<CvEventField | nullish>();
	readonly skills = model<Skill['name'][]>();
	readonly sortDirection = model<SortDirection | nullish>();
	readonly eventType = input<CvEventType | nullish>();

	protected readonly cvService = inject(CvService);
	protected readonly router = inject(Router);

	protected readonly errorMessage =
		'Impossible de récupérer les informations du CV. Merci de réessayer plus tard... 🙏';

	// Sync active job with the URL query params
	private readonly syncJobId = effect(() =>
		this.cvService.setActiveEvent(this.eventId())
	);

	protected switchActiveEvent(target: 'previous' | 'next' | null): void {
		if (target === 'previous' || target === 'next') {
			this.cvService.slideEvent(target);
		} else {
			this.cvService.setActiveEvent(target);
		}
	}

	protected readonly filters = linkedSignal(() => {
		const skills = this.skills();
		return {
			eventType: this.eventType(),
			skills: removeNullishProps(
				Array.isArray(skills) ? skills : [skills]
			).filter(isNotNullish),
		};
	});

	protected readonly filteredJobs = computed(() => {
		const { eventType, skills } = this.filters();
		let filtered = this.cvService.sortedEvents().data;

		if (eventType) {
			filtered = filtered.filter(job => job.type === eventType);
		}
		if (skills) {
			filtered = filtered.filter(job =>
				skills.every(s => job.skills.map(s => s.name).includes(s))
			);
		}
		return multiTypeSort(
			filtered,
			this.sortBy() ?? 'name',
			this.sortDirection() ?? 'asc'
		);
	});

	protected readonly filtersEqualsInitialOne = computed(
		() =>
			deepEqualObjects(this.filters(), initialFilters) ||
			isEmpty(this.filters())
	);

	protected updateFilters(filters: Partial<CvFilters>) {
		const currentFilters = this.filters();
		this.filters.set(
			removeNullishProps({
				...currentFilters,
				...filters,
			})
		);
		this.updateUrl();
	}

	protected resetFilters() {
		this.updateFilters(initialFilters);
	}

	protected updateSort(sortBy: EventSortableField | null) {
		this.sortBy.set(sortBy?.field);
		this.sortDirection.set(sortBy?.direction);
		this.updateUrl();
	}

	private updateUrl() {
		this.router
			.navigate(['/cv'], {
				queryParams: removeNullishProps({
					sortBy: this.sortBy(),
					sortDirection: this.sortDirection(),
					...this.filters(),
				}),
			})
			.catch(console.error);
	}
}
