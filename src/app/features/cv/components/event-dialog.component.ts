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
	host: {
		'(touchstart)': 'onTouchStart($event)',
		'(touchend)': 'onTouchEnd($event)',
	},
	template: `
		@if (isBrowser() && event(); as activeEvent) {
			<p-dialog modal [visible]="!!activeEvent">
				<ng-template #headless>
					<div
						class="flex flex-wrap lg:flex-nowrap lg:gap-2 items-end content-end  lg:items-center h-full">
						<button
							class="!hidden lg:!inline-flex"
							app-button
							appearance="fab"
							color="white"
							(click)="setActiveEvent.emit('previous')">
							<app-icon-chevron class="text-primary-500" direction="left" />
						</button>
						@if (isJob(activeEvent)) {
							<app-job-card
								class="!rounded-none lg:!rounded-lg"
								[job]="activeEvent"
								(closed)="setActiveEvent.emit(null)" />
						} @else if (isTraining(activeEvent)) {
							<app-training-card
								class="!rounded-none lg:!rounded-lg"
								[training]="activeEvent"
								(closed)="setActiveEvent.emit(null)" />
						}
						<button
							class="!hidden lg:!inline-flex"
							app-button
							appearance="fab"
							color="white"
							(click)="setActiveEvent.emit('next')">
							<app-icon-chevron class="text-primary-500" direction="right" />
						</button>

						<!-- Mobile navigation -->
						<nav class="flex w-full lg:hidden h-12">
							<button
								class="flex-1 hover:!bg-primary-50"
								app-button
								appearance="fab"
								color="white"
								rounded="false"
								(click)="setActiveEvent.emit('previous')">
								<app-icon-chevron class="text-primary-700" direction="left" />
								Précédent
							</button>
							<button
								class="flex-1 hover:!bg-primary-50"
								app-button
								appearance="fab"
								color="white"
								rounded="false"
								(click)="setActiveEvent.emit('next')">
								Suivant
								<app-icon-chevron class="text-primary-500" direction="right" />
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

	private touchStartX = 0;

	onTouchStart(event: TouchEvent) {
		this.touchStartX = event.changedTouches[0].screenX;
	}

	onTouchEnd(event: TouchEvent) {
		const delta = event.changedTouches[0].screenX - this.touchStartX;
		this.setActiveEvent.emit(delta > 0 ? 'next' : 'previous');
	}
}
