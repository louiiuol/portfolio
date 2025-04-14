import { DatePipe } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';
import { ButtonComponent, EyeIcon } from '@shared/components';
import { CapitalizePipe, TimeDifferencePipe } from '@shared/pipes';
import { Timeline } from 'primeng/timeline';
import type { Job } from '../types';
import { SkillPillComponent } from './skill-pill.component';

@Component({
	selector: 'app-jobs-timeline',
	template: ` <p-timeline class="mt-3" align="left" [value]="jobs()">
			<ng-template #opposite let-job>
				<section
					class="mt-3 hidden lg:flex p-2 text-primary-900 text-center flex-col gap-1">
					<h4 class=" font-semibold">{{ job.company.name }}</h4>
					<p class="text-xs flex gap-2 justify-start mt-1 flex-wrap">
						<span>{{ job.startDate | date: 'MMM yyyy' | capitalize }}</span>
						-
						@if (job.endDate) {
							<span>{{ job.endDate | date: 'MMM yyyy' | capitalize }}</span>
						} @else {
							Aujourd'hui
						}
					</p>

					<p class="text-sm italic text-center">
						{{ job.contractType }}
					</p>

					<button
						class="mx-auto mt-1"
						app-button
						size="small"
						(click)="setActiveJob.emit(job)">
						<app-icon-eye />
						Voir plus
					</button>
				</section>
			</ng-template>

			<ng-template #content let-job>
				<article
					class="flex flex-col justify-start gap-2 sm:mt-3 p-3 bg-white rounded-lg shadow-md text-start">
					<div
						class="block lg:hidden w-full text-primary-950 border-b border-offset-200 pb-2 border-primary-200">
						<div class="flex flex-wrap justify-between items-center gap-2">
							<h4 class="text-md font-semibold">
								{{ job.company.name }}
							</h4>
							<span class="text-xs text-start"> {{ job.contractType }} </span>
						</div>

						<p class="text-xs flex gap-2 justify-start mt-1 flex-wrap">
							<span>{{ job.startDate | date: 'MMMM yyyy' | capitalize }}</span>
							-
							@if (job.endDate) {
								<span>{{ job.endDate | date: 'MMMM yyyy' | capitalize }}</span>
							} @else {
								Aujourd'hui
							}
							<span class="font-bold">({{ job | timeDiff }})</span>
						</p>
					</div>

					<h3 class="text-xl font-semibold text-primary-500 w-full">
						{{ job.title }}
					</h3>

					<p
						class="w-full leading-tight tracking-tight max-w-prose leading-9 text-pretty">
						{{ job.summary }}
					</p>
					<div
						class="flex gap-2 flex-wrap justify-start items-center w-full mt-1">
						@for (skill of job.skills.slice(0, 3); track $index) {
							<app-skill-pill [skill]="skill" />
						}
						@let remainingSkills = job.skills.length - 3;
						@if (remainingSkills > 0) {
							<span class="text-xs text-gray-500">
								+ {{ remainingSkills }} autres
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
						<app-icon-eye />
						Voir plus
					</button>
				</article>
			</ng-template>
		</p-timeline>
		@if (!jobs().length) {
			<div class="flex flex-col items-center p-2 gap-4 flex-1 w-full mt-3">
				<p class="text-lg text-pretty font-medium italic text-slate-600">
					Aucune expérience disponibles... 🤔 Merci de réessayer plus tard 🙏
				</p>
			</div>
		}`,
	imports: [
		DatePipe,
		CapitalizePipe,
		TimeDifferencePipe,
		Timeline,
		ButtonComponent,
		EyeIcon,
		SkillPillComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobsTimelineComponent {
	readonly jobs = input.required<Job[]>();
	readonly setActiveJob = output<Job>();
}
