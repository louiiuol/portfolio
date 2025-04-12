import { Dialog } from '@angular/cdk/dialog';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	input,
	linkedSignal,
} from '@angular/core';
import { Router } from '@angular/router';

import { JobCard } from '@feat/cv/components';
import { ContentfullModule } from '@feat/cv/modules/contentfull/contentfull.module';
import { CVService } from '@feat/cv/services/cv.service';
import type { Job } from '@feat/cv/types';
import {
	ButtonComponent,
	CloseIcon,
	LoaderComponent,
} from '@shared/components';
import { multiTypeSort } from '@shared/functions';
import { DialogModule } from 'primeng/dialog';
import { JobsTimelineComponent } from '../components/job-timeline.component';

// const initialFilters = { search: null, contractType: null, skills: [] };

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

			<!-- <nav class="w-full flex justify-between items-center gap-4">
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
			</nav> -->

			<!-- Content -->
			<section
				class="flex flex-col items-center justify-start gap-4 w-full h-full overflow-y-auto flex-1 relative inset-shadow-sm  bg-gray-50 rounded-lg p-2 sm:p-4b">
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
						<app-jobs-timeline
							[jobs]="filteredJobs()"
							(setActiveJob)="setActiveJob($event)" />
					}
				}
			</section>
		</div>

		<!-- Dialog -->
		@if (activeJob(); as activeJob) {
			<p-dialog class="max-w-[90%]" modal [visible]="true">
				<ng-template #headless>
					<app-job-card [job]="activeJob">
						<button
							class="ml-auto mr-1"
							app-button
							appearance="icon"
							close-button
							(click)="setActiveJob(null)">
							<app-icon-close />
						</button>
					</app-job-card>
				</ng-template>
			</p-dialog>
		}
	`,
	imports: [
		ButtonComponent,
		ContentfullModule,
		LoaderComponent,
		DialogModule,
		JobCard,
		JobsTimelineComponent,
		CloseIcon,
	],
	providers: [CVService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CVPage {
	// readonly search = model<string | nullish>();
	// readonly sortBy = model<JobField | nullish>();
	// readonly skills = model<Skill['name'][]>();
	// readonly sortDirection = model<SortDirection | nullish>();
	// readonly contractType = input<ContractType | nullish>();
	readonly jobId = input<string>();

	protected readonly cvService = inject(CVService);
	protected readonly router = inject(Router);
	protected readonly dialog = inject(Dialog);

	// protected readonly filters = linkedSignal(() => {
	// 	const skills = this.skills();
	// 	return {
	// 		search: this.search(),
	// 		contractType: this.contractType(),
	// 		skills: removeNullishProps(
	// 			Array.isArray(skills) ? skills : [skills]
	// 		).filter(isNotNullish),
	// 	};
	// });

	protected readonly filteredJobs = computed(() => {
		// const { search, contractType, skills } = this.filters();
		const filtered = this.cvService.jobs();

		// if (search) {
		// 	const searchTerm = search.toLocaleLowerCase();
		// 	filtered = filtered.filter(job =>
		// 		[job.title, job.company.name]
		// 			.map(el => el.toLocaleLowerCase())
		// 			.some(term => term.includes(searchTerm))
		// 	);
		// }

		// if (contractType) {
		// 	filtered = filtered.filter(job => job.contractType === contractType);
		// }

		// if (skills) {
		// 	filtered = filtered.filter(job =>
		// 		skills.every(s => job.skills.map(s => s.name).includes(s))
		// 	);
		// }

		return multiTypeSort(filtered, 'startDate', 'desc');
	});

	// protected readonly filtersEqualsInitialOne = computed(
	// 	() =>
	// 		deepEqualObjects(this.filters(), initialFilters) ||
	// 		isEmpty(this.filters())
	// );

	// protected updateFilters(filters: Partial<JobFilters>) {
	// 	const currentFilters = this.filters();
	// 	this.filters.set(
	// 		removeNullishProps({
	// 			...currentFilters,
	// 			...filters,
	// 		})
	// 	);
	// 	this.updateUrl();
	// }

	// protected resetFilters() {
	// 	this.updateFilters(initialFilters);
	// }

	// protected updateSort(sortBy: JobSortableField | null) {
	// 	this.sortBy.set(sortBy?.field);
	// 	this.sortDirection.set(sortBy?.direction);
	// 	this.updateUrl();
	// }

	protected readonly activeJob = linkedSignal<Job | null>(
		() => this.cvService.jobs().find(job => job.id === this.jobId()) ?? null
	);

	setActiveJob(job: Job | null) {
		this.activeJob.set(job);

		this.router
			.navigate(['/cv'], {
				queryParams: {
					// ...removeNullishProps({
					// 	sortBy: this.sortBy(),
					// 	sortDirection: this.sortDirection(),
					// 	...this.filters(),
					// }),
					jobId: job?.id ?? null,
				},
			})
			.catch(console.error);
	}

	// private updateUrl() {
	// 	this.router
	// 		.navigate(['/cv'], {
	// 			queryParams: removeNullishProps({
	// 				sortBy: this.sortBy(),
	// 				sortDirection: this.sortDirection(),
	// 				...this.filters(),
	// 			}),
	// 		})
	// 		.catch(console.error);
	// }
}
