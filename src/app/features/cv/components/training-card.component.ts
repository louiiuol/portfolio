import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';

import type { Training } from '@feat/cv/types';
import {
	Card,
	EventDatesComponent,
	GraduationCapIcon,
} from '@shared/components/';

import { TrainingSkillsPipe } from '../pipes/training-skills.pipe';
import { EventTypeComponent } from './event-type.component';
import { PlaceInfoComponent } from './place-info.component';
import { SkillsListComponent } from './skills-list.component';

@Component({
	selector: 'app-training-card',
	host: {
		class: 'dialog-card',
	},
	template: `
		<app-card closable (closed)="closed.emit()">
			<h2 heading>
				{{ training().name }}
			</h2>

			<div class="flex justify-between items-center flex-wrap" subHeader>
				<app-event-type [event]="training()" />

				<app-event-dates
					class="text-primary-700"
					showIcon
					showTimeDiff
					subHeader
					[event]="training()" />
			</div>

			<app-skills-list showAll [skills]="training() | trainingSkills" />

			<!-- School -->
			<div class="flex flex-col gap-2">
				<h3 class="font-semibold">École</h3>
				<app-place-info [place]="training().school" />
			</div>

			<!-- Description -->
			<p
				class="bg-primary-50 shadow-inner text-primary-800 px-6 py-3 rounded-2xl">
				{{ training().description }}
			</p>

			<!-- Diplomas -->
			<div class="flex flex-col gap-2">
				<h3 class="font-semibold mb-2">Diplômes acquis</h3>
				<ul class="flex flex-col gap-4">
					@for (diploma of training().diplomas; track $index) {
						<li class="flex gap-2 items-start justify-start text-primary-700">
							<app-icon-graduation-cap class="shrink-0 size-4" />
							<div class="flex flex-col gap-1 text-sm ">
								<h4 class="font-semibold">{{ diploma.name }}</h4>
								<p>
									{{ diploma.description }}
								</p>
							</div>
						</li>
					}
				</ul>
			</div>

			<!-- Skills Section: savoir être / savoir faire -->
			<!-- <div class="flex flex-col gap-2 w-full">
				<h3 class="font-semibold">Compétences acquises</h3>
			</div> -->
		</app-card>
	`,
	imports: [
		GraduationCapIcon,
		SkillsListComponent,
		Card,
		PlaceInfoComponent,
		EventDatesComponent,
		TrainingSkillsPipe,
		EventTypeComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingCard {
	readonly training = input.required<Training>();
	readonly closed = output<void>();
}
