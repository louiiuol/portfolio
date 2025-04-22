import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ContractIcon, GraduationCapIcon } from '@shared/components';
import { isJob, type CvEvent } from '../../types';

@Component({
	selector: 'app-event-type',
	host: {
		class:
			'text-xs font-semibold border border-primary-200 rounded-lg py-1 px-2 bg-primary-50 text-primary-800 flex gap-2 items-center',
	},
	template: `
		@if (isJob(event())) {
			<app-icon-contract />
		} @else {
			<app-icon-graduation-cap />
		}
		{{ event().type }}
	`,
	imports: [GraduationCapIcon, ContractIcon],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventTypeComponent {
	readonly event = input.required<CvEvent>();

	protected readonly isJob = isJob;
}
