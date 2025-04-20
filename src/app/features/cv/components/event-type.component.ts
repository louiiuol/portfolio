import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ContractIcon, GraduationCapIcon } from '@shared/components';
import { EventTypePipe } from '../pipes';
import { isJob, type CvEvent } from '../types';

@Component({
	selector: 'app-event-type',
	host: {
		class:
			'text-sm italic font-medium border border-primary-200 rounded-lg px-2 py-1 bg-primary-50 text-primary-700 flex gap-2 items-center',
	},
	template: `
		@if (isJob(event())) {
			<app-icon-contract />
		} @else {
			<app-icon-graduation-cap />
		}
		{{ event() | eventType }}
	`,
	imports: [GraduationCapIcon, ContractIcon, EventTypePipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventTypeComponent {
	readonly event = input.required<CvEvent>();

	protected readonly isJob = isJob;
}
