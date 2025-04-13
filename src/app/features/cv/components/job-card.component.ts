import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { DatePipe } from '@angular/common';
import type { Job } from '@feat/cv/types';
import { MaterialIcon } from '@shared/components';
import { CapitalizePipe, TimeDifferencePipe } from '@shared/pipes';
import { ContractIcon } from '../../../shared/components/atoms/icon/icon-contract.component';
import { HouseLaptopIcon } from '../../../shared/components/atoms/icon/icon-house-laptop.component';
import { LocationPinIcon } from '../../../shared/components/atoms/icon/icon-location-pin.component';
import { RichTextComponent } from '../modules/contentfull/components/rich-text.component';
import { SkillPillComponent } from './skill-pill.component';

@Component({
	selector: 'app-job-card',
	host: {
		class:
			'py-4 px-3 sm:px-6 flex flex-col gap-6 max-w-[640px] bg-slate-50 rounded-lg shadow-md w-full',
	},
	template: `
		<header class="flex justify-between items-start gap-4">
			@let jobCompany = job().company;
			<h2
				class="font-semibold text-2xl text-primary-500 leading-snug flex gap-4 items-center justify-start">
				{{ job().title }}
			</h2>
			<ng-content select="[close-button]" />
		</header>

		<section
			class="flex flex-col gap-6 max-h-[65vh] overflow-y-auto -mx-3 px-2 sm:-mx-6 sm:px-4">
			<!-- Job tags -->
			<ul
				class="flex gap-6 flex-wrap justify-between items-center w-full text-primary-500 text-sm">
				<li class="flex gap-2 items-center justify-start">
					<app-icon-contract />
					<span>
						{{ job().contractType }}
					</span>
				</li>
				<li class="flex gap-2 items-center justify-start">
					<app-icon-house-laptop />
					<span class="text-sm font-semibold">
						{{ job().remotePolicy }}
					</span>
				</li>
				<li class="flex gap-2 items-center justify-start">
					<app-icon-material name="calendar_month" />
					<p>
						<span>{{ job().startDate | date: 'MMMM yyyy' | capitalize }}</span>
						@if (job().endDate) {
							-
							<span>{{ job().endDate | date: 'MMMM yyyy' | capitalize }}</span>
						}
						<span class="text-xs"> ({{ job() | timeDiff }}) </span>
					</p>
				</li>
			</ul>

			<!-- Company Section -->
			<div class="flex flex-col gap-2">
				<h3 class="font-semibold">Entreprise</h3>
				<article class="flex flex-col gap-2">
					<div class="flex gap-4 items-start justify-start">
						<img
							class="size-14"
							[alt]="'Logo de ' + jobCompany.name"
							[src]="jobCompany.logo.file.url" />

						<div class="flex flex-col gap-1">
							<h4 class="text-md font-semibold text-primary-500">
								{{ jobCompany.name }}
								@if (jobCompany.url) {
									<span class="text-xs"
										>(<a
											class="text-blue-500"
											target="_blank"
											[href]="jobCompany.url">
											Voir le site </a
										>)</span
									>
								}
							</h4>
							<ul
								class="text-primary-400 flex gap-4 flex-wrap justify-start items-center">
								<li class="flex gap-2 items-center justify-start">
									<app-icon-location-pin />
									<span class="text-xs font-semibold text-primary-400">
										{{ jobCompany.city }} - {{ jobCompany.country }}
									</span>
								</li>
							</ul>
						</div>
					</div>
					<p class="text-sm italic text-gray-600 max-w-prose">
						" {{ jobCompany.description }} "
					</p>
				</article>
			</div>

			<!-- Description Section -->

			<p
				class="bg-primary-50 shadow-inner text-primary-800 px-6 py-3 rounded-2xl">
				{{ job().summary }}
			</p>

			<div class="flex flex-col gap-2">
				<h3 class="font-semibold">Tâches accomplies</h3>
				<app-rich-text class="px-6" [content]="job().description" />
			</div>

			<!-- Skills Section: savoir être / savoir faire -->
			<div class="flex flex-col gap-2">
				<h3 class="font-semibold">Compétences acquises</h3>
				<div class="flex gap-2 flex-wrap justify-start items-center">
					@for (skill of job().skills; track $index) {
						<app-skill-pill [skill]="skill" />
					}
				</div>
			</div>
		</section>
	`,
	imports: [
		RichTextComponent,
		MaterialIcon,
		TimeDifferencePipe,
		ContractIcon,
		DatePipe,
		CapitalizePipe,
		HouseLaptopIcon,
		LocationPinIcon,
		SkillPillComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobCard {
	readonly job = input.required<Job>();
}
