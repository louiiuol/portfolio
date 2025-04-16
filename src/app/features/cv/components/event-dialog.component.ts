import { isPlatformBrowser } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	input,
	output,
	PLATFORM_ID,
	signal,
} from '@angular/core';
import { ButtonComponent, ChevronIcon, CloseIcon } from '@shared/components';
import { Dialog } from 'primeng/dialog';
import { isJob, isSchool, type CvEvent } from '../types';
import { JobCard } from './job-card.component';

@Component({
	selector: 'app-event-dialog',
	template: `
		@if (isBrowser() && event(); as activeEvent) {
			<p-dialog class="sm:max-w-[90%]" modal [visible]="!!activeEvent">
				<ng-template #headless>
					<div class="flex flex-wrap sm:flex-nowrap gap-2 items-center">
						<button
							class="!hidden sm:!inline-flex"
							app-button
							appearance="fab"
							color="white"
							(click)="setActiveEvent.emit('previous')">
							<app-icon-chevron direction="left" />
						</button>
						@if (isJob(activeEvent)) {
							<app-job-card class="flex-1 shrink-0" [job]="activeEvent">
								<button
									class="ml-auto mr-1"
									app-button
									appearance="icon"
									close-button
									(click)="setActiveEvent.emit(null)">
									<app-icon-close />
								</button>
							</app-job-card>
						} @else if (isSchool(activeEvent)) {
							coming soon
						}
						<nav
							class="flex gap-4 w-full sm:w-auto justify-center items-center">
							<button
								class="!inline-flex sm:!hidden"
								app-button
								appearance="fab"
								color="white"
								(click)="setActiveEvent.emit('previous')">
								<app-icon-chevron class="text-primary-700" direction="left" />
							</button>
							<button
								app-button
								appearance="fab"
								color="white"
								(click)="setActiveEvent.emit('next')">
								<app-icon-chevron direction="right" />
							</button>
						</nav>
					</div>
				</ng-template>
			</p-dialog>
		}
	`,
	imports: [ChevronIcon, CloseIcon, JobCard, Dialog, ButtonComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDialog {
	readonly event = input.required<CvEvent | null>();
	readonly setActiveEvent = output<'previous' | 'next' | null>();

	protected readonly isBrowser = signal(false);

	protected readonly isJob = isJob;
	protected readonly isSchool = isSchool;

	constructor(@Inject(PLATFORM_ID) platformId: object) {
		this.isBrowser.set(isPlatformBrowser(platformId));
	}
}
