import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { EventDatesComponent, GraduationCapIcon } from '@shared/components';
import { isTraining, type CvEvent } from '../../types';
import { SkillsListComponent } from '../skill/skills-list.component';
import { EventTypeComponent } from './event-type.component';

@Component({
	selector: 'app-event-row',
	host: {
		class:
			'flex flex-col justify-start gap-4 mx-2 sm:mt-3 p-3 bg-white rounded-lg shadow-md text-start max-w-[584px] mx-auto w-full',
	},
	template: `
		<!-- Common section -->
		<header
			class="flex flex-col gap-2 lg:hidden w-full text-primary-800 border-b border-offset-200 pb-2 border-primary-200">
			<div class="flex flex-wrap justify-between items-center gap-2">
				<h4 class="text-md font-semibold text-primary-800">
					{{ event().location.name }}
					<span class="text-xs text-primary-400 text-300 font-normal">
						({{ event().location.city }})
					</span>
				</h4>
				<app-event-type [event]="event()" />
			</div>

			<app-event-dates
				class="text-primary-400"
				showTimeDiff
				[event]="event()" />
		</header>

		<section class="flex flex-col gap-3">
			<h3 class="text-xl font-semibold text-primary-800 w-full">
				{{ event().name }}
			</h3>

			<p class="w-full max-w-prose text-pretty text-primary-800">
				{{ event().description }}
			</p>

			<!-- Training info -->
			@let training = event();
			@if (isTraining(training)) {
				<!-- Diplôme(s) acquis -->
				<div
					class="flex gap-2 items-center justify-start text-primary-800 w-full">
					<app-icon-graduation-cap class="shrink-0" />

					<p class="text-sm">
						<strong>{{ training.diplomas.length }}</strong> Diplôme{{
							training.diplomas.length > 1 ? 's' : ''
						}}
						acquis lors de cette formation.
					</p>
				</div>
			}

			<app-skills-list [skills]="event().skills" />
		</section>

		<ng-content />
	`,
	imports: [
		EventDatesComponent,
		SkillsListComponent,
		GraduationCapIcon,
		EventTypeComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventRowComponent {
	readonly event = input.required<CvEvent>();

	protected readonly isTraining = isTraining;
}
