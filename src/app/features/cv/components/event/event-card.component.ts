import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';
import {
	Card,
	EventDatesComponent,
	GraduationCapIcon,
} from '@shared/components';
import { RichTextComponent } from '../../../contentfull/components/rich-text.component';
import {
	EventDescriptionPipe,
	EventNamePipe,
	EventSkillsPipe,
} from '../../pipes';
import { isJob, type CvEvent } from '../../types';
import { PlaceInfoComponent } from '../place/place-info.component';
import { SkillsListComponent } from '../skill/skills-list.component';
import { EventTypeComponent } from './event-type.component';

@Component({
	selector: 'app-event-card',
	host: { class: 'dialog-card' },
	template: `
		<app-card closable (closed)="closed.emit()">
			@let displayedEvent = event();

			<h2 heading>
				{{ displayedEvent | eventName }}
			</h2>
			<!-- Job tags & dates -->
			<section
				class="flex gap-6 flex-wrap justify-between items-center w-full text-primary-500 text-sm"
				subHeader>
				<app-event-type [event]="displayedEvent" />
				<app-event-dates showIcon showTimeDiff [event]="displayedEvent" />
			</section>

			<!-- Description -->
			<p
				class="bg-primary-50 shadow-inner text-primary-800 px-6 py-3 rounded-2xl">
				{{ displayedEvent | eventDescription }}
			</p>

			<section class="flex flex-col gap-2">
				@if (isJob(displayedEvent)) {
					<!-- Company -->
					<h3 class="font-semibold">Entreprise</h3>
					<app-place-info
						[place]="displayedEvent.company"
						[remotePolicy]="displayedEvent.remotePolicy" />
				} @else {
					<!-- School -->
					<h3 class="font-semibold">École</h3>
					<app-place-info [place]="displayedEvent.school" />
				}
			</section>

			<!-- Skills -->
			<section class="flex flex-col gap-2">
				<h3 class="font-semibold">Compétences acquises</h3>
				<app-skills-list showAll [skills]="displayedEvent | eventSkills" />
			</section>

			<section class="flex flex-col gap-2">
				@if (isJob(displayedEvent)) {
					<!-- Job Tasks -->
					<h3 class="font-semibold">Tâches accomplies</h3>
					<app-rich-text
						class="px-6 text-primary-700"
						[content]="displayedEvent.description" />
				} @else {
					<!-- Training Diplomas -->
					<h3 class="font-semibold mb-2">Diplômes acquis</h3>
					<ul class="flex flex-col gap-4">
						@for (diploma of displayedEvent.diplomas; track $index) {
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
				}
			</section>
		</app-card>
	`,
	imports: [
		RichTextComponent,
		SkillsListComponent,
		Card,
		PlaceInfoComponent,
		EventDatesComponent,
		EventTypeComponent,
		GraduationCapIcon,
		EventNamePipe,
		EventDescriptionPipe,
		EventSkillsPipe,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCardComponent {
	readonly event = input.required<CvEvent>();
	readonly closed = output<void>();

	protected readonly isJob = isJob;
}
