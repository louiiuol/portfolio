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

import {
	JobCard,
	JobFiltersComponent,
	JobSortComponent,
	type JobSortableField,
} from '@feat/cv/components';
import type { JobFilters } from '@feat/cv/components/job-filters.component';
import { ContentfullModule } from '@feat/cv/modules/contentfull/contentfull.module';
import { CVService } from '@feat/cv/services/cv.service';
import type { ContractType, JobField, Skill } from '@feat/cv/types';
import {
	ButtonComponent,
	IconMaterialComponent,
	LoaderComponent,
} from '@shared/components';
import {
	deepEqualObjects,
	isEmpty,
	multiTypeSort,
	removeNullishProps,
} from '@shared/functions';
import { isNotNullish, type SortDirection, type nullish } from '@shared/types';

const initialFilters = { search: null, contractType: null, skills: [] };

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

				@if (!filtersEqualsInitialOne()) {
					<button app-button appearance="icon" (click)="resetFilters()">
						<app-icon-material class="text-accent-400" name="restart_alt" />
					</button>
				}

				<app-job-sort class="ml-auto" (sortChanged)="updateSort($event)" />
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
							class="flex items-start gap-4 w-full h-full overflow-y-auto flex-1">
							@for (job of filteredJobs(); track $index) {
								<app-job-card [job]="job" />
							} @empty {
								<div class="flex flex-col gpa-2 items-center p-2 gap-4 flex-1">
									<p class="text-sm">
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
	skills = model<Skill['name'][]>();
	sortDirection = model<SortDirection | nullish>();
	contractType = input<ContractType | nullish>();

	protected readonly cvService = inject(CVService);
	protected readonly router = inject(Router);

	protected readonly filters = linkedSignal(() => {
		const skills = this.skills();
		return {
			search: this.search(),
			contractType: this.contractType(),
			skills: removeNullishProps(
				Array.isArray(skills) ? skills : [skills]
			).filter(isNotNullish),
		};
	});

	protected readonly filteredJobs = computed(() => {
		const { search, contractType, skills } = this.filters();
		let filtered = this.cvService.jobs();

		if (search) {
			const searchTerm = search.toLocaleLowerCase();
			filtered = filtered.filter(job =>
				[job.title, job.company.name]
					.map(el => el.toLocaleLowerCase())
					.some(term => term.includes(searchTerm))
			);
		}

		if (contractType) {
			filtered = filtered.filter(job => job.contractType === contractType);
		}

		if (skills) {
			filtered = filtered.filter(job =>
				skills.every(s => job.skills.map(s => s.name).includes(s))
			);
		}

		return multiTypeSort(
			filtered,
			this.sortBy() ?? 'title',
			this.sortDirection() ?? 'asc'
		);
	});

	protected readonly filtersEqualsInitialOne = computed(
		() =>
			deepEqualObjects(this.filters(), initialFilters) ||
			isEmpty(this.filters())
	);

	protected updateFilters(filters: Partial<JobFilters>) {
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

	protected updateSort(sortBy: JobSortableField | null) {
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
