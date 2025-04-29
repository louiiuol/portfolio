import { DatePipe } from '@angular/common';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	input,
} from '@angular/core';
import { CapitalizePipe, TimeDifferencePipe } from '@shared/pipes';
import { CalendarIcon } from '../../atoms/icon';

@Component({
	selector: 'app-event-dates',
	host: {
		class: 'text-xs flex gap-2 justify-start items-center flex-wrap w-fit',
	},
	template: `
		@if (showIcon()) {
			<app-icon-calendar />
		}
		<span>{{ event().startDate | date: dateFormat() | capitalize }}</span>
		-
		@if (event().endDate) {
			<span>{{ event().endDate | date: dateFormat() | capitalize }}</span>
		} @else {
			<span>Aujourd'hui</span>
		}
		@if (showTimeDiff()) {
			<span class="font-semibold">
				({{ event() | timeDiff: { minOutput: 'month' } }})
			</span>
		}
	`,
	imports: [DatePipe, CapitalizePipe, TimeDifferencePipe, CalendarIcon],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDatesComponent {
	event = input.required<{ startDate: Date; endDate?: Date | null }>();
	dateFormat = input('MMM yyyy');
	showTimeDiff = input(false, { transform: booleanAttribute });
	showIcon = input(false, { transform: booleanAttribute });
}
