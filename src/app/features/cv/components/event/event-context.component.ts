import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { EventDatesComponent } from '@shared/components';
import { EventLocationPipe } from '../../pipes';
import type { CvEvent } from '../../types';
import { EventTypeComponent } from './event-type.component';

@Component({
	selector: 'app-event-context',
	host: {
		class:
			'mt-3 hidden lg:flex text-primary-800 text-center justify-start items-center flex-col gap-2',
	},
	template: `
		<h4 class=" font-semibold">{{ (event() | eventLocation).name }}</h4>

		<app-event-type [event]="event()" />

		<app-event-dates class="!justify-center" showTimeDiff [event]="event()" />

		<ng-content />
	`,
	imports: [EventLocationPipe, EventTypeComponent, EventDatesComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventContextComponent {
	readonly event = input.required<CvEvent>();
}
