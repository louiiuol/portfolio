import { DatePipe } from '@angular/common';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	input,
} from '@angular/core';
import { CapitalizePipe, TimeDifferencePipe } from '@shared/pipes';

@Component({
	selector: 'app-event-dates',
	host: { class: 'text-xs flex gap-2 justify-start mt-1 flex-wrap' },
	template: `
		<span>{{ event().startDate | date: dateFormat() | capitalize }}</span>
		-
		@if (event().endDate) {
			<span>{{ event().endDate | date: dateFormat() | capitalize }}</span>
		} @else {
			Aujourd'hui
		}
		@if (showTimeDiff()) {
			<span class="font-bold">({{ event() | timeDiff }})</span>
		}
	`,
	imports: [DatePipe, CapitalizePipe, TimeDifferencePipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDatesComponent {
	event = input.required<{ startDate: Date; endDate?: Date | null }>();
	dateFormat = input('MMM yyyy');
	showTimeDiff = input(false, { transform: booleanAttribute });
}
