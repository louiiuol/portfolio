import { Dialog } from '@angular/cdk/dialog';
import { DatePipe } from '@angular/common';
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
import type { ContractType, Job, JobField, Skill } from '@feat/cv/types';
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
import { CapitalizePipe, TimeDifferencePipe } from '@shared/pipes';
import { isNotNullish, type nullish, type SortDirection } from '@shared/types';
import { DialogModule } from 'primeng/dialog';
import { Timeline } from 'primeng/timeline';
import { Tooltip } from 'primeng/tooltip';

const initialFilters = { search: null, contractType: null, skills: [] };

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
				<button app-button appearance="icon-stroked">
					<app-icon-material
						class="size-[1rem] sm:size-[2rem]"
						name="download" />
				</button>
				<!--
				<p class="text-sm italic text-gray-500 max-w-prose text-balance">
					Retrouvez l'ensemble de mes expériences et compétences accumulées au
					cours de ces dernières années.. ⏳
				</p> -->
			</header>

			<nav class="w-full flex justify-between items-center gap-4">
				<app-job-filters
					[filters]="filters()"
					(filtersChanged)="updateFilters($event)">
					@if (!filtersEqualsInitialOne()) {
						<button
							class="sm:!block !hidden"
							app-button
							appearance="stroked"
							color="red"
							pTooltip="Réinitialiser les filtres"
							suffix
							tooltipPosition="bottom"
							(click)="resetFilters()">
							Réinitialiser
						</button>
					}
				</app-job-filters>

				<app-job-sort class="ml-auto" (sortChanged)="updateSort($event)" />
			</nav>

			<!-- Content -->
			<section
				class="flex flex-col items-start justify-start gap-4 w-full h-full overflow-y-auto flex-1 relative inset-shadow-sm  bg-gray-50 rounded-lg p-2 sm:p-4b">
				@if (cvService.resourceState.isLoading()) {
					<app-loader message="chargement des informations du CV" />
				} @else {
					@if (cvService.resourceState.error()) {
						<p
							class="text-gray-700 italic max-w-prose text-pretty text-center mt-6 mx-auto">
							Impossible de récupérer les informations du CV. Merci de réessayer
							plus tard... 🙏
							<!-- {{ cvService.resourceState().error | json }} -->
						</p>
					} @else {
						<p-timeline class="mt-3" align="left" [value]="filteredJobs()">
							<ng-template #opposite let-job>
								<section
									class="mt-3 hidden lg:flex p-2 text-primary-900 text-center flex-col gap-1">
									<h4 class=" font-semibold">{{ job.company.name }}</h4>
									<p
										class="text-xs flex flex-wrap gap-2 items-center justify-end">
										<span>{{
											job.startDate | date: 'MMM yyyy' | capitalize
										}}</span>
										@if (job.endDate) {
											-
											<span>{{
												job.endDate | date: 'MMMM yyyy' | capitalize
											}}</span>
										}
									</p>

									<p class="text-xs italic text-center">
										{{ job.contractType }} - {{ job.remotePolicy }}
									</p>

									<button
										class="mx-auto mt-1"
										app-button
										size="small"
										(click)="setActiveJob(job)">
										<app-icon-material name="visibility" size="1.25rem" />
										Voir plus
									</button>
								</section>
							</ng-template>

							<ng-template #content let-job>
								<article
									class="flex flex-col justify-start gap-2 mt-3 p-3 bg-white rounded-lg shadow-md text-start">
									<div
										class="block lg:hidden w-full text-primary-950 border-b border-offset-200 pb-2 border-primary-200">
										<h4 class="text-md font-semibold">
											{{ job.company.name }}
										</h4>
										<p class="text-xs flex gap-2 justify-start mt-1 flex-wrap">
											<span>{{
												job.startDate | date: 'MMMM yyyy' | capitalize
											}}</span>
											@if (job.endDate) {
												-
												<span>{{
													job.endDate | date: 'MMMM yyyy' | capitalize
												}}</span>
												<span class="font-bold">({{ job | timeDiff }})</span>
											}
										</p>
									</div>

									<h3 class="text-xl font-semibold text-primary-500 w-full">
										{{ job.title }}
									</h3>

									<p
										class="w-full leading-tight tracking-tight max-w-prose leading-9">
										{{ job.description[0].content }}
									</p>
									<div
										class="flex gap-2 flex-wrap justify-start items-start w-full">
										@for (skill of job.skills; track $index) {
											<span
												class="text-accent-400 border border-accent-400 px-3 py-1 text-xs rounded-lg">
												{{ skill.name }}
											</span>
										}
									</div>
									<button
										class="mx-auto mt-1 lg:hidden"
										app-button
										color="primary"
										full
										size="small"
										(click)="setActiveJob(job)">
										<app-icon-material name="visibility" size="1rem" />
										Voir plus
									</button>
								</article>
							</ng-template>
						</p-timeline>
						@if (!filteredJobs().length) {
							<div
								class="flex flex-col items-center p-2 gap-4 flex-1 w-full mt-3">
								<p class="text-lg text-pretty font-medium">
									Aucune expérience ne semble correspondre à ces filtres... 🤔
								</p>
								<button app-button (click)="resetFilters()">
									Réinitialiser les filtres
								</button>
							</div>
						}
					}
				}
			</section>
		</div>
		@if (activeJob(); as activeJob) {
			<p-dialog modal [visible]="true">
				<ng-template #headless>
					<button
						class="ml-auto mr-1 mt-1"
						app-button
						appearance="icon"
						(click)="setActiveJob(null)">
						<app-icon-material name="close" size="large" />
					</button>
					<app-job-card [job]="activeJob" />
				</ng-template>
			</p-dialog>
		}
	`,
	imports: [
		IconMaterialComponent,
		ButtonComponent,
		JobFiltersComponent,
		ContentfullModule,
		LoaderComponent,
		JobSortComponent,
		Tooltip,
		Timeline,
		DatePipe,
		TimeDifferencePipe,
		CapitalizePipe,
		DialogModule,
		JobCard,
	],
	providers: [CVService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CVPage {
	readonly search = model<string | nullish>();
	readonly sortBy = model<JobField | nullish>();
	readonly skills = model<Skill['name'][]>();
	readonly sortDirection = model<SortDirection | nullish>();
	readonly contractType = input<ContractType | nullish>();
	readonly jobId = input<string>();

	protected readonly cvService = inject(CVService);
	protected readonly router = inject(Router);
	protected readonly dialog = inject(Dialog);

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

	protected readonly activeJob = linkedSignal<Job | null>(
		() => this.cvService.jobs().find(job => job.id === this.jobId()) ?? null
	);

	setActiveJob(job: Job | null) {
		this.activeJob.set(job);

		this.router
			.navigate(['/cv'], {
				queryParams: {
					...removeNullishProps({
						sortBy: this.sortBy(),
						sortDirection: this.sortDirection(),
						...this.filters(),
					}),
					jobId: job?.id ?? null,
				},
			})
			.catch(console.error);
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
