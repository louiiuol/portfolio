import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { Job } from '@feat/cv/types';
import { MaterialIcon } from '@shared/components';
import { TimeDifferencePipe } from '@shared/pipes';
import { RichTextComponent } from '../modules/contentfull/components/rich-text.component';

@Component({
	selector: 'app-job-card',
	host: {
		class: 'py-4 px-6 flex flex-col gap-6',
	},
	template: `
		<header class="flex justify-between items-start gap-4">
			@let jobCompany = job().company;
			<h2
				class="font-semibold text-2xl text-primary-500 leading-snug flex gap-4 items-center justify-start">
				<img
					class="size-12"
					[alt]="'Logo de ' + jobCompany.name"
					[src]="jobCompany.logo.file.url" />
				{{ job().title }}
			</h2>
			<ng-content select="[close-button]" />
		</header>

		<ul
			class="flex gap-4 flex-wrap justify-start items-center w-full text-primary-500">
			<li class="flex gap-2 items-center justify-start">
				<app-icon-material name="apartment" />
				<span class="font-semibold">
					{{ jobCompany.name }}
					@if (jobCompany.url) {
						<a class="text-blue-500" target="_blank" [href]="jobCompany.url">
							<app-icon-material name="link" size="small" />
						</a>
					}
				</span>
			</li>
			<li class="flex gap-2 items-center justify-start">
				<app-icon-material name="location_on" />
				<span class="text-sm font-semibold text-primary-400">
					{{ jobCompany.city }}
				</span>
			</li>
			<li class="flex gap-2 items-center justify-start">
				<app-icon-material name="label" />
				<span class="text-sm font-semibold text-primary-400">
					{{ job().contractType }}
				</span>
			</li>
			<li class="flex gap-2 items-center justify-start">
				<app-icon-material name="directions_bike" />
				<span class="text-sm font-semibold text-primary-400">
					{{ job().remotePolicy }}
				</span>
			</li>
			<li class="flex gap-2 items-center justify-start">
				<app-icon-material name="calendar_month" />
				<span class="text-sm font-semibold text-primary-400">
					{{ job() | timeDiff }}
				</span>
			</li>
		</ul>

		<app-rich-text [content]="job().description" />

		<!-- Skills Section -->
		<div class="flex gap-2 flex-wrap justify-start items-center">
			@for (skill of job().skills; track $index) {
				<span
					class="border-accent-300 border text-accent-300 px-3 py-1 text-xs rounded-lg">
					{{ skill.name }}
				</span>
			}
		</div>

		<div class="flex justify-between items-start gap-4">
			<!-- Company Section -->
			<!-- <section
				class="inline-flex flex-col items-center justify-start min-w-24 text-center md:text-end">
				@let jobCompany = job().company;
				@if (jobCompany.logo) {
					<img
						class="size-18 ml-auto"
						[alt]="'Logo de ' + jobCompany.name"
						[src]="jobCompany.logo.file.url" />
				}
				<div class="flex flex-col justify-between gap-2">

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
			</section> -->
		</div>

		<!-- Assets Section -->
		<section
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
		</section>
	`,
	imports: [RichTextComponent, MaterialIcon, TimeDifferencePipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobCard {
	readonly job = input.required<Job>();
}
