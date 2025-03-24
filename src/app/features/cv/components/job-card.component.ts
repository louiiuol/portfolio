import { DatePipe } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from '@angular/core';

import type { Job } from '@feat/cv/types';
import { IconMaterialComponent } from '@shared/components';
import { CapitalizePipe, TimeDifferencePipe } from '@shared/pipes';

@Component({
	selector: 'app-job-card',
	host: {
		class: 'p-4 shadow rounded-2xl',
	},
	template: `
		<!-- Company Section -->
		<div class="flex h-full items-center justify-start min-w-24">
			@let jobCompany = job().company;
			@if (jobCompany.logo) {
				<img
					class="size-24"
					[alt]="'Logo de ' + jobCompany.name"
					[src]="jobCompany.logo.file.url" />
			}
			<div class="flex flex-col justify-between gap-2">
				<div>
					<h3 class="text-lg font-semibold text-accent-400">
						{{ jobCompany.name }}
					</h3>
					<p class="text-sm italic">
						{{ jobCompany.city }}
						@if (jobCompany.url) {
							<a class="text-blue-500" target="_blank" [href]="jobCompany.url">
								<app-icon-material name="link" size="small" />
							</a>
						}
					</p>
					<p class="text-xs text-gray-400">
						{{ job().contractType }} - {{ job().remotePolicy }}
					</p>
					<p class="text-sm">
						<span>{{ job().startDate | date: 'MMMM yyyy' | capitalize }}</span>
						@if (job().endDate) {
							-
							<span>{{ job().endDate | date: 'MMMM yyyy' | capitalize }}</span>
						}
						<span class="text-gray-400 italic text-xs">
							({{ job() | timeDiff }})
						</span>
					</p>
				</div>
			</div>
		</div>

		<!-- Description Section -->
		<div class="flex flex-col items-end justify-start text-end gap-4 flex-1">
			<!-- Experience Section -->
			<div class="flex flex-col items-end justify-start text-end">
				<h4 class="font-semibold text-xl text-primary-500 leading-loose">
					{{ job().title }}
				</h4>
				<div
					class="text-gray-800 text-sm max-w-prose text-balance leading-relaxed">
					@for (description of job().description; track $index) {
						@switch (description.type) {
							@case ('text') {
								<p class="empty:hidden">
									{{ description.content }}
								</p>
							}
							@case ('list') {
								<ul class="text-xs italic empty:hidden">
									@for (item of description.content; track $index) {
										<li>{{ item }}</li>
									}
								</ul>
							}
						}
					}
				</div>
			</div>

			<!-- Assets Section -->
			<div
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
			</div>

			<!-- Skills Section -->
			<div class="flex gap-2 flex-wrap justify-end items-center">
				@for (skill of job().skills; track $index) {
					<span class="bg-accent-300 text-white px-3 py-1 text-xs rounded-lg">
						{{ skill.name }}
					</span>
				}
			</div>
		</div>
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
	filter = input<'string'>();

	job = input.required<Job>();
	jobDuration = computed(
		() =>
			new Date(this.job().endDate ?? 0).getTime() -
			new Date(this.job().startDate).getTime()
	);
}
