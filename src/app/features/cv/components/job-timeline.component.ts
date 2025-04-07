import { DatePipe } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';
import { Timeline } from 'primeng/timeline';
import {
	ButtonComponent,
	IconMaterialComponent,
} from '../../../shared/components';
import { CapitalizePipe, TimeDifferencePipe } from '../../../shared/pipes';
import type { Job } from '../types';

@Component({
	selector: 'app-jobs-timeline',
	template: ` <p-timeline class="mt-3" align="left" [value]="jobs()">
			<ng-template #opposite let-job>
				<section
					class="mt-3 hidden lg:flex p-2 text-primary-900 text-center flex-col gap-1">
					<h4 class=" font-semibold">{{ job.company.name }}</h4>
					<p class="text-xs flex flex-wrap gap-2 items-center justify-end">
						<span>{{ job.startDate | date: 'MMM yyyy' | capitalize }}</span>
						@if (job.endDate) {
							-
							<span>{{ job.endDate | date: 'MMMM yyyy' | capitalize }}</span>
						}
					</p>

					<p class="text-xs italic text-center">
						{{ job.contractType }} - {{ job.remotePolicy }}
					</p>

					<button
						class="mx-auto mt-1"
						app-button
						size="small"
						(click)="setActiveJob.emit(job)">
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
							<span>{{ job.startDate | date: 'MMMM yyyy' | capitalize }}</span>
							@if (job.endDate) {
								-
								<span>{{ job.endDate | date: 'MMMM yyyy' | capitalize }}</span>
								<span class="font-bold">({{ job | timeDiff }})</span>
							}
						</p>
					</div>

					<h3 class="text-xl font-semibold text-primary-500 w-full">
						{{ job.title }}
					</h3>

					<p class="w-full leading-tight tracking-tight max-w-prose leading-9">
						{{ job.description[0].content }}
					</p>
					<div class="flex gap-2 flex-wrap justify-start items-start w-full">
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
						(click)="setActiveJob.emit(job)">
						<app-icon-material name="visibility" size="1rem" />
						Voir plus
					</button>
				</article>
			</ng-template>
		</p-timeline>
		@if (!jobs().length) {
			<div class="flex flex-col items-center p-2 gap-4 flex-1 w-full mt-3">
				<p class="text-lg text-pretty font-medium italic text-slate-600">
					Aucune expérience ne semble correspondre à ces filtres... 🤔
				</p>
				<button app-button (click)="resetFilters.emit()">
					Réinitialiser les filtres
				</button>
			</div>
		}`,
	imports: [
		IconMaterialComponent,
		DatePipe,
		CapitalizePipe,
		TimeDifferencePipe,
		Timeline,
		ButtonComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobsTimelineComponent {
	jobs = input.required<Job[]>();
	resetFilters = output();
	setActiveJob = output<Job>();
}
