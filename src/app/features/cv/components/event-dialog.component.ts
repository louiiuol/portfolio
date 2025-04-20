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
import { ButtonComponent, ChevronIcon } from '@shared/components';
import { Dialog } from 'primeng/dialog';
import { isJob, isTraining, type CvEvent } from '../types';
import { JobCard } from './job-card.component';
import { TrainingCard } from './training-card.component';

@Component({
	selector: 'app-event-dialog',
	template: `
		@if (isBrowser() && event(); as activeEvent) {
			<p-dialog class="md:max-w-[90%]" modal [visible]="!!activeEvent">
				<ng-template #headless>
					<div
						class="flex flex-wrap md:flex-nowrap sm:gap-2 items-end content-end  md:items-center h-full">
						<button
							class="!hidden md:!inline-flex"
							app-button
							appearance="fab"
							color="white"
							(click)="setActiveEvent.emit('previous')">
							<app-icon-chevron direction="left" />
						</button>
						@if (isJob(activeEvent)) {
							<app-job-card
								class="!rounded-none sm:!rounded-lg"
								[job]="activeEvent"
								(closed)="setActiveEvent.emit(null)" />
						} @else if (isTraining(activeEvent)) {
							<app-training-card
								class="!rounded-none sm:!rounded-lg"
								[training]="activeEvent"
								(closed)="setActiveEvent.emit(null)" />
						}
						<button
							class="!hidden md:!inline-flex"
							app-button
							appearance="fab"
							color="white"
							(click)="setActiveEvent.emit('next')">
							<app-icon-chevron direction="right" />
						</button>
						<nav class="flex w-full sm:hidden">
							<button
								class="flex-1 hover:!bg-primary-50"
								app-button
								appearance="fab"
								color="white"
								rounded="false"
								size="large"
								(click)="setActiveEvent.emit('previous')">
								<app-icon-chevron class="text-primary-700" direction="left" />
							</button>
							<button
								class="flex-1 hover:!bg-primary-50"
								app-button
								appearance="fab"
								color="white"
								rounded="false"
								size="large"
								(click)="setActiveEvent.emit('next')">
								<app-icon-chevron direction="right" />
							</button>
						</nav>
					</div>
				</ng-template>
			</p-dialog>
		}
	`,
	imports: [ChevronIcon, JobCard, Dialog, ButtonComponent, TrainingCard],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDialog {
	readonly event = input.required<CvEvent | null>();
	readonly setActiveEvent = output<'previous' | 'next' | null>();

	protected readonly isBrowser = signal(false);

	protected readonly isJob = isJob;
	protected readonly isTraining = isTraining;

	constructor(@Inject(PLATFORM_ID) platformId: object) {
		this.isBrowser.set(isPlatformBrowser(platformId));
	}
}
