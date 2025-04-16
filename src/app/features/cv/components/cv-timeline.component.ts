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
} from '@shared/components';
import { Timeline } from 'primeng/timeline';
import { isJob, isSchool, type CvEvent } from '../types';
import { SkillsListComponent } from './skills-list.component';

@Component({
	selector: 'app-cv-timeline',
	template: ` <p-timeline class="mt-3" align="left" [value]="events()">
			<ng-template #seeMoreButton let-event>
				<button
					class="mx-auto mt-1 lg:hidden"
					app-button
					color="primary"
					full
					size="small"
					(click)="setActiveEvent.emit(event)">
					<app-icon-eye />
					Voir plus
				</button>
			</ng-template>

			<ng-template #opposite let-event>
				@let locationName =
					isJob(event)
						? event.company.name
						: isSchool(event)
							? event.name
							: 'NA';
				@let eventType = isJob(event) ? event.contractType : 'Formation';
				<section
					class="mt-3 hidden lg:flex p-2 text-primary-900 text-center flex-col gap-1">
					<h4 class=" font-semibold">{{ locationName }}</h4>
					<app-event-dates [event]="event" />

					<p class="text-sm italic text-center">
						{{ eventType }}
					</p>

					<ng-container
						*ngTemplateOutlet="seeMoreButton; context: { $implicit: event }" />
				</section>
			</ng-template>

			<ng-template #content let-event>
				@let locationName =
					isJob(event)
						? event.company.name
						: isSchool(event)
							? event.name
							: 'NA';
				@let eventType = isJob(event) ? event.contractType : 'Formation';
				<article
					class="flex flex-col justify-start gap-2 sm:mt-3 p-3 bg-white rounded-lg shadow-md text-start"
					[class]="{
						'!bg-primary-500': isSchool(event),
					}">
					<div
						class="block lg:hidden w-full text-primary-950 border-b border-offset-200 pb-2 border-primary-200"
						[class]="{ '!text-white': isSchool(event) }">
						<div class="flex flex-wrap justify-between items-center gap-2">
							<h4 class="text-md font-semibold">
								{{ locationName }}
							</h4>
							<span class="text-xs text-start"> {{ eventType }} </span>
						</div>

						<app-event-dates [event]="event" />
					</div>

					@if (isJob(event)) {
						<h3
							class="text-xl font-semibold text-primary-500 w-full"
							[class]="{ '!text-white': isSchool(event) }">
							{{ event.title }}
						</h3>

						<p
							class="w-full leading-tight tracking-tight max-w-prose leading-9 text-pretty"
							[class]="{ '!text-white': isSchool(event) }">
							{{ event.summary }}
						</p>

						<app-skills-list [skills]="event.skills" />
					} @else if (isSchool(event)) {
						<h3 class="text-xl font-semibold text-primary-500 w-full">
							{{ event.name }}
						</h3>

						<p
							class="w-full leading-tight tracking-tight max-w-prose leading-9 text-pretty">
							{{ event.description }}
						</p>

						@for (diploma of event.diplomas; track $index) {
							<h3>{{ diploma.name }}</h3>
							<p class="text-xs">{{ diploma.description }}</p>
							<app-skills-list [skills]="diploma.skills" />
						}
					}
					<ng-container
						*ngTemplateOutlet="seeMoreButton; context: { $implicit: event }" />
				</article>
			</ng-template>
		</p-timeline>

		@if (!events().length) {
			<div class="flex flex-col items-center p-2 gap-4 flex-1 w-full mt-3">
				<p class="text-lg text-pretty font-medium italic text-slate-600">
					Aucune résultat disponible ... 🤔 Merci de réessayer plus tard 🙏
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
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvTimelineComponent {
	readonly events = input.required<CvEvent[]>();
	readonly setActiveEvent = output<CvEvent>();

	protected readonly isJob = isJob;
	protected readonly isSchool = isSchool;
}
