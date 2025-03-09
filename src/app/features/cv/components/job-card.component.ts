import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconMaterialComponent } from '@shared/components/atoms/icon/icon.component';
import type { Job } from '../types/job.type';

@Component({
	selector: 'app-job-card',
	host: {
		class:
			'flex flex-wrap justify-between items-center gap-8 p-4 shadow rounded-2xl w-full',
	},
	template: `
		@let jobCompany = job().company;

		<!-- Company Section -->
		<div class="flex h-full items-center justify-start min-w-24">
			@if (jobCompany.logo) {
				<img
					class="size-24"
					[alt]="'Logo de ' + jobCompany.name"
					[src]="jobCompany.logo.file.url" />
			}
			<div>
				<h3 class="text-lg font-semibold text-accent-400">
					{{ jobCompany.name }}
				</h3>
				<p class="text-sm italic">
					{{ jobCompany.city }} {{ jobCompany.country }}
					@if (jobCompany.url) {
						<a target="_blank" [href]="jobCompany.url">
							<app-icon-material name="link" size="small" />
						</a>
					}
				</p>
				<p class="text-xs">
					{{ job().contractType }} - {{ job().remotePolicy }}
				</p>
				<p>Dates incoming</p>
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
								<ul class="text-xs text-primary-300 pr-4">
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
	imports: [IconMaterialComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobCard {
	job = input.required<Job>();
}
