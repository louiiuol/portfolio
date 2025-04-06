import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { Job } from '@feat/cv/types';
import { IconMaterialComponent } from '@shared/components';
import { CapitalizePipe, TimeDifferencePipe } from '@shared/pipes';

@Component({
	selector: 'app-job-card',
	host: {
		class: 'py-4 px-6 shadow-xl rounded-2xl',
	},
	template: `
		<div class="flex flex-wrap-reverse justify-between items-start gap-4">
			<!-- Description Section -->
			<section class="inline-flex flex-col justify-start gap-4 flex-1">
				<!-- Experience Section -->
				<div class="flex flex-col items-end justify-start">
					<h4 class="font-semibold text-xl text-primary-500 leading-loose">
						{{ job().title }}
					</h4>
					<p>{{ job().description[0].content }}</p>
					<!-- <app-rich-text [content]="job().description" /> -->
				</div>

				<!-- Skills Section -->
				<div class="flex gap-2 flex-wrap justify-start items-center">
					@for (skill of job().skills; track $index) {
						<span class="bg-accent-300 text-white px-3 py-1 text-xs rounded-lg">
							{{ skill.name }}
						</span>
					}
				</div>
			</section>

			<!-- Company Section -->
			<section
				class="inline-flex flex-col items-center justify-start min-w-24 text-center md:text-end">
				@let jobCompany = job().company;
				@if (jobCompany.logo) {
					<img
						class="size-24"
						[alt]="'Logo de ' + jobCompany.name"
						[src]="jobCompany.logo.file.url" />
				}
				<div class="flex flex-col justify-between gap-2">
					<h3 class="text-lg font-semibold text-accent-400">
						{{ jobCompany.name }}
						@if (jobCompany.url) {
							<a class="text-blue-500" target="_blank" [href]="jobCompany.url">
								<app-icon-material name="link" size="small" />
							</a>
						}
					</h3>
					<p class="text-sm italic">
						{{ jobCompany.city }} - {{ job().remotePolicy }}
					</p>
					<p class="text-sm">
						<span>{{ job().startDate | date: 'MMMM yyyy' | capitalize }}</span>
						@if (job().endDate) {
							-
							<span>{{ job().endDate | date: 'MMMM yyyy' | capitalize }}</span>
						}
					</p>
					<p class="text-xs text-gray-400">
						{{ job().contractType }} -
						<span class="text-gray-400 italic text-xs">
							({{ job() | timeDiff }})
						</span>
					</p>
				</div>
			</section>
		</div>

		<!-- Assets Section -->
		<!-- <section
			class="flex flex-col items-end justify-start text-end py-3 empty:hidden">
			@for (asset of job().assets; track $index) {
				<div
					class="flex text-end gap-2 border border-accent-300 p-2 rounded-lg">
					<img
						class="w-24"
						[alt]="'illustration de ' + asset.title"
						[src]="asset.file.url" />

					<div>
						<h5 class="text-sm font-semibold text-primary-400 leading-tight">
							{{ asset.title }}
						</h5>
						<p class="text-xs text-primary-300">{{ asset.description }}</p>
					</div>
				</div>
			}
		</section> -->
	`,
	imports: [
		IconMaterialComponent,
		DatePipe,
		CapitalizePipe,
		TimeDifferencePipe,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobCard {
	readonly job = input.required<Job>();
}
