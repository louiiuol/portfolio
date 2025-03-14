import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	input,
	linkedSignal,
	model,
} from '@angular/core';
import { Router } from '@angular/router';
import { JobCard } from '@feat/cv/components/job-card.component';
import type { JobFilters } from '@feat/cv/components/job-filters.component';
import { JobFiltersComponent } from '@feat/cv/components/job-filters.component';
import type { SortableField } from '@feat/cv/components/job-sort.component';
import { JobSortComponent } from '@feat/cv/components/job-sort.component';
import { ContentfullModule } from '@feat/cv/modules/contentfull/contentfull.module';
import { CVService } from '@feat/cv/services/cv.service';
import type { ContractType, JobField } from '@feat/cv/types/job.type';

import {
	ButtonComponent,
	IconMaterialComponent,
	LoaderComponent,
} from '@shared/components';
import { removeNullishProps } from '@shared/fns/format/remove-nullish-props.fn';
import type { nullish } from '@shared/types/nullish.type';
import type { SortDirection } from '@shared/types/sort.type';

@Component({
	selector: 'app-cv-page',
	host: { class: 'page' },
	template: `
		<div
			class="bg-white p-4 rounded-lg shadow-lg min-h-full flex flex-col gap-4">
			<header class="flex justify-between items-start gap-4">
				<div class="flex flex-wrap items-start gap-8">
					<h1 class="text-2xl font-semibold text-primary-700">
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

			<nav class="w-full flex justify-start items-center gap-3">
				<app-job-filters
					[filters]="filters()"
					(filtersChanged)="updateFilters($event)" />
				<app-job-sort (sortChanged)="updateSort($event)" />
				<!-- <span>skills</span>
					<span>sort</span>
					<span>Job type (cdi, stage ..)</span> -->
			</nav>

			<section class="h-full flex flex-col gap-4 relative">
				@if (cvService.resourceState().isLoading) {
					<app-loader message="chargement des informations du CV" />
				} @else {
					@if (cvService.resourceState().error) {
						<p>
							Impossible de récupérer les informations du CV. Merci de réessayer
							plus tard... 🙏
							<!-- {{ cvService.resourceState().error | json }} -->
						</p>
					} @else {
						<section
							class="flex flex-col items-center justify-start gap-4 w-full h-full overflow-y-auto flex-1">
							@for (job of filteredJobs(); track $index) {
								<app-job-card [job]="job" />
							} @empty {
								<div class="flex flex-col gpa-2 items-center p-2 gap-4 flex-1">
									<p>
										Aucune expérience ne semble correspondre à ces filtres... 🤔
									</p>
									<button app-button (click)="resetFilters()">
										Réinitialiser les filtres
									</button>
								</div>
							}
						</section>
					}
				}
			</section>
		</div>
	`,
	imports: [
		IconMaterialComponent,
		ButtonComponent,
		JobCard,
		JobFiltersComponent,
		ContentfullModule,
		LoaderComponent,
		JobSortComponent,
	],
	providers: [CVService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CVPage {
	search = model<string | nullish>();
	sortBy = model<JobField | nullish>();
	sortDirection = model<SortDirection | nullish>();
	contractType = input<ContractType | nullish>();

	protected readonly cvService = inject(CVService);
	protected readonly router = inject(Router);

	protected readonly filters = linkedSignal(() => ({
		search: this.search(),
		contractType: this.contractType(),
	}));

	protected readonly filteredJobs = computed(() => {
		const { search, contractType } = this.filters();
		let filtered = this.cvService.jobs();

		if (search) {
			const searchTerm = search.toLocaleLowerCase();
			filtered = filtered.filter(
				job =>
					job.title.toLocaleLowerCase().includes(searchTerm) ||
					job.company.name.toLocaleLowerCase().includes(searchTerm)
			);
		}

		if (contractType && contractType !== '**') {
			filtered = filtered.filter(job => job.contractType === contractType);
		}

		const field = this.sortBy();
		const direction = this.sortDirection();
		if (field && direction) {
			filtered = filtered.sort((a, b) => {
				const current = (direction === 'asc' ? a : b)[field];
				const next = (direction === 'asc' ? b : a)[field];
				if (typeof current === 'string' && typeof next === 'string') {
					return current.localeCompare(next);
				}
				if (typeof current === 'number' && typeof next === 'number') {
					return current - next;
				}

				return 0;
			});
		}
		return filtered;
	});

	updateFilters(filters: Partial<JobFilters>) {
		const currentFilters = this.filters();
		this.filters.set({
			...currentFilters,
			...filters,
		});
		this.updateUrl();
	}

	resetFilters() {
		this.updateFilters({ search: '', contractType: null });
		this.updateUrl();
	}

	updateSort(sortBy: SortableField | null) {
		this.sortBy.set(sortBy?.field);
		this.sortDirection.set(sortBy?.direction);
		this.updateUrl();
	}

	updateUrl() {
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
