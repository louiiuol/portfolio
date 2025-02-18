import type { PipeTransform } from '@angular/core';
import { ChangeDetectionStrategy, Component, input, Pipe } from '@angular/core';
import { IconMaterialComponent } from '@shared/components/atoms/icon/icon.component';
import type { Job } from '../types/job.type';

@Pipe({
	name: 'companyLogo',
})
export class CompanyLogoPipe implements PipeTransform {
	transform(fileName: string) {
		return `images/jobs/companies-logo/${fileName}.jpeg`;
	}
}

@Component({
	selector: 'app-job-card',
	host: {
		class:
			'flex flex-wrap justify-between items-center gap-8 p-4 shadow rounded-2xl',
	},
	template: `
		@let jobCompany = job().company;

		<!-- Company Section -->
		<div class="flex h-full items-center justify-start min-w-24">
			@if (jobCompany.logo) {
				<img class="size-24" [src]="jobCompany.slug | companyLogo" />
			}
			<div>
				<h3 class="text-lg font-semibold text-accent-400">
					{{ jobCompany.name }}
				</h3>
				<p class="text-sm italic">
					{{ jobCompany.city }} {{ jobCompany.country }}
					@if (jobCompany.url) {
						<a
							rel="noopener noreferrer"
							target="_blank"
							[href]="jobCompany.url">
							<app-icon-material name="link" size="small"></app-icon-material>
						</a>
					}
				</p>
				<p class="text-xs">
					{{ job().contractType }} - {{ job().remotePolicy }}
				</p>
				<p>Dates</p>
			</div>
		</div>

		<!-- Description Section -->
		<div class="flex flex-col items-end justify-start text-end gap- 4">
			<!-- Experience Section -->
			<div class="flex flex-col items-end justify-start text-end">
				@for (experience of job().experiences; track experience.startDate) {
					<h4 class="font-semibold text-xl text-primary-500 leading-loose">
						{{ experience.jobTitle }}
					</h4>
					<p class="text-gray-800 text-sm max-w-prose text-balance">
						{{ experience.description }}
					</p>
				}
			</div>

			<!-- Assets Section -->
			<div class="flex flex-col items-end justify-start text-end py-3">
				@for (asset of job().assets; track asset.name) {
					<div>
						<h5>{{ asset.name }}</h5>
						<p>{{ asset.description }}</p>
						@switch (asset.type) {
							@case ('link') {
								<a
									rel="noopener noreferrer"
									target="_blank"
									[href]="asset.externalLink">
									voir le lien
								</a>
							}
							@case ('image') {
								<img class="w-48" [src]="asset.mediaPath" />
							}
						}
					</div>
				}
			</div>

			<!-- Skills Section -->
			<div class="flex gap-2 flex-wrap justify-end items-center">
				@for (skill of job().skills; track skill.name) {
					<span class="bg-accent-300 text-white px-3 py-1 text-xs rounded-lg">
						{{ skill }}
					</span>
				}
			</div>
		</div>
	`,
	imports: [IconMaterialComponent, CompanyLogoPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobCard {
	job = input.required<Job>();
}
