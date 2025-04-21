import { NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';
import {
	ButtonComponent,
	ErrorMessageComponent,
	EyeIcon,
} from '@shared/components';
import { Timeline } from 'primeng/timeline';
import { type CvEvent } from '../../types';
import { EventContextComponent } from '../event/event-context.component';
import { EventRowComponent } from '../event/event-row.component';

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
				<app-event-context [event]="event">
					<ng-container
						*ngTemplateOutlet="seeMoreButton; context: { $implicit: event }" />
				</app-event-context>
			</ng-template>

			<!-- MAIN CONTENT -->
			<ng-template #content let-event>
				<app-event-row [event]="event">
					<div class="lg:hidden">
						<ng-container
							*ngTemplateOutlet="
								seeMoreButton;
								context: { $implicit: event }
							" />
					</div>
				</app-event-row>
			</ng-template>
		</p-timeline>

		@if (!events().length) {
			<app-error-message
				errorMessage="Aucune expérience disponible ... 🤔 Merci de réessayer plus tard 🙏" />
		}`,
	imports: [
		Timeline,
		ButtonComponent,
		EyeIcon,
		NgTemplateOutlet,
		EventRowComponent,
		EventContextComponent,
		ErrorMessageComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvTimelineComponent {
	readonly events = input.required<CvEvent[]>();
	readonly setActiveEvent = output<CvEvent>();
}
