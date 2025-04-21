import { NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';
import {
	ButtonComponent,
	EventDatesComponent,
	EyeIcon,
	GraduationCapIcon,
} from '@shared/components';
import { Timeline } from 'primeng/timeline';
import { EventLocationPipe, TrainingSkillsPipe } from '../../pipes';
import { isJob, isTraining, type CvEvent } from '../../types';
import { EventTypeComponent } from '../event/event-type.component';
import { SkillsListComponent } from '../skill/skills-list.component';

@Component({
	selector: 'app-cv-timeline',
	template: ` <p-timeline class="mt-3 sm:pr-6" align="left" [value]="events()">
			<!-- See more button -->
			<ng-template #seeMoreButton let-event>
				<button
					class="mx-auto mt-1"
					app-button
					color="primary"
					full
					size="small"
					(click)="setActiveEvent.emit(event)">
					<app-icon-eye />
					Voir plus
				</button>
			</ng-template>

			<!-- CONTEXT -->
			<ng-template #opposite let-event>
				@let eventLocation = event | eventLocation;
				<section
					class="mt-3 hidden lg:flex text-primary-900 text-center justify-start items-center flex-col gap-2">
					<h4 class=" font-semibold">{{ eventLocation.name }}</h4>

					<app-event-type [event]="event" />

					<app-event-dates [event]="event" />

					<ng-container
						*ngTemplateOutlet="seeMoreButton; context: { $implicit: event }" />
				</section>
			</ng-template>

			<!-- MAIN CONTENT -->
			<ng-template #content let-event>
				@let eventLocation = event | eventLocation;
				<article
					class="flex flex-col justify-start gap-4 mx-2 sm:mt-3 p-3 bg-white rounded-lg shadow-md text-start max-w-[584px] mx-auto w-full">
					<!-- Common section -->
					<div
						class="block lg:hidden w-full text-primary-950 border-b border-offset-200 pb-2 border-primary-200">
						<div class="flex flex-wrap justify-between items-center gap-2">
							<h4 class="text-md font-semibold text-primary-800">
								{{ eventLocation.name }}
								<span class="text-xs text-primary-400 text-300 font-normal">
									({{ eventLocation.city }})
								</span>
							</h4>
							<app-event-type [event]="event" />
						</div>

						<app-event-dates
							class="text-primary-400"
							showTimeDiff
							[event]="event" />
					</div>

					<section class="flex flex-col gap-3">
						<!-- Job info -->
						@if (isJob(event)) {
							<h3 class="text-xl font-semibold text-primary-950 w-full">
								{{ event.title }}
							</h3>

							<p class="w-full max-w-prose text-pretty">
								{{ event.summary }}
							</p>

							<app-skills-list [skills]="event.skills" />
						}

						<!-- Training info -->
						@else if (isTraining(event)) {
							<h3 class="text-xl font-semibold text-primary-950 w-full">
								{{ event.name }}
							</h3>

							<p class="w-full max-w-prose text-pretty">
								{{ event.description }}
							</p>

							<!-- Diplôme(s) acquis -->
							<div
								class="flex gap-2 items-center justify-start text-primary-700 w-full">
								<app-icon-graduation-cap class="shrink-0" />

								<p class="text-sm">
									<strong>{{ event.diplomas.length }}</strong> Diplôme{{
										event.diplomas.length > 1 ? 's' : ''
									}}
									acquis lors de cette formation.
								</p>
							</div>

							<app-skills-list [skills]="event | trainingSkills" />
						}
					</section>

					<!-- See more button for mobile -->
					<div class="lg:hidden">
						<ng-container
							*ngTemplateOutlet="
								seeMoreButton;
								context: { $implicit: event }
							" />
					</div>
				</article>
			</ng-template>
		</p-timeline>

		@if (!events().length) {
			<div class="flex flex-col items-center p-2 gap-4 flex-1 w-full mt-3">
				<p class="text-lg text-pretty font-medium italic text-slate-600">
					Aucune expérience disponible ... 🤔 Merci de réessayer plus tard 🙏
				</p>
			</div>
		}`,
	imports: [
		Timeline,
		ButtonComponent,
		EyeIcon,
		EventDatesComponent,
		SkillsListComponent,
		NgTemplateOutlet,
		GraduationCapIcon,
		EventLocationPipe,
		TrainingSkillsPipe,
		EventTypeComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvTimelineComponent {
	readonly events = input.required<CvEvent[]>();
	readonly setActiveEvent = output<CvEvent>();

	protected readonly isJob = isJob;
	protected readonly isTraining = isTraining;
}
