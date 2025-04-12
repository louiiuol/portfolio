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
		class: 'py-4 px-6 flex flex-col gap-6 max-w-[640px]',
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

		<ul
			class="flex gap-6 flex-wrap justify-between items-center w-full text-primary-500 text-sm">
			<li class="flex gap-2 items-center justify-start">
				<app-icon-contract />
				<span>
					{{ job().contractType }}
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

		<p
			class="bg-primary-50 shadow-inner text-primary-800 px-6 py-3 rounded-2xl">
			{{ job().summary }}
		</p>

		<div class="flex flex-col gap-2">
			<h3 class="font-semibold">Entreprise</h3>
			<div class="flex flex-col gap-1">
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
							class="text-primary-400 flex gap-4 flex-wrap justify-start items-start">
							<li class="flex gap-2 items-center justify-start">
								<app-icon-location-pin />
								<span class="text-xs font-semibold text-primary-400">
									{{ jobCompany.city }} - {{ jobCompany.country }}
								</span>
							</li>
							<li class="flex gap-2 items-center justify-start">
								<app-icon-house-laptop />
								<span class="text-sm font-semibold">
									{{ job().remotePolicy }}
								</span>
							</li>
						</ul>
					</div>
				</div>
				<p class="text-sm italic text-gray-600 max-w-prose">
					" {{ jobCompany.description }} "
				</p>
			</div>
		</div>

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
