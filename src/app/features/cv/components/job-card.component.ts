import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';

import type { Job } from '@feat/cv/types';
import {
	Card,
	EventDatesComponent,
	HouseLaptopIcon,
} from '@shared/components/';

import { RichTextComponent } from '@feat/contentfull/components/rich-text.component';
import { EventTypeComponent } from './event-type.component';
import { PlaceInfoComponent } from './place-info.component';
import { SkillsListComponent } from './skills-list.component';

@Component({
	selector: 'app-job-card',
	host: {
		class: 'dialog-card',
	},
	template: `
		<app-card closable (closed)="closed.emit()">
			<h2 heading>
				{{ job().title }}
			</h2>
			<!-- Job tags & dates -->
			<ul
				class="flex gap-6 flex-wrap justify-between items-center w-full text-primary-500 text-sm"
				subHeader>
				<li>
					<app-event-type [event]="job()" />
				</li>
				<li class="flex gap-2 items-center justify-start">
					<app-icon-house-laptop />
					<span class="text-sm font-semibold">
						{{ job().remotePolicy }}
					</span>
				</li>
				<li class="flex gap-2 items-center justify-start">
					<app-event-dates showIcon showTimeDiff [event]="job()" />
				</li>
			</ul>

			<!-- Company -->
			<div class="flex flex-col gap-2">
				<h3 class="font-semibold">Entreprise</h3>
				<app-place-info [place]="job().company" />
			</div>

			<!-- Description -->
			<p
				class="bg-primary-50 shadow-inner text-primary-800 px-6 py-3 rounded-2xl">
				{{ job().summary }}
			</p>

			<!-- Tasks -->
			<div class="flex flex-col gap-2">
				<h3 class="font-semibold">Tâches accomplies</h3>
				<app-rich-text class="px-6" [content]="job().description" />
			</div>

			<!-- Skills Section: savoir être / savoir faire -->
			<div class="flex flex-col gap-2 w-full" footer>
				<h3 class="font-semibold">Compétences acquises</h3>
				<app-skills-list showAll [skills]="job().skills" />
			</div>
		</app-card>
	`,
	imports: [
		RichTextComponent,
		HouseLaptopIcon,
		SkillsListComponent,
		Card,
		PlaceInfoComponent,
		EventDatesComponent,
		EventTypeComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobCard {
	readonly job = input.required<Job>();
	readonly closed = output<void>();
}
