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
import { type CvEvent } from '../../types';
import { EventCardComponent } from './event-card.component';

@Component({
	selector: 'app-event-dialog',
	template: `
		@if (isBrowser() && event(); as activeEvent) {
			<p-dialog modal [visible]="!!activeEvent">
				<ng-template #headless>
					<div
						class="flex flex-col md:flex-row md:gap-2 items-end content-end  md:items-center h-full">
						<!-- Desktop previous button -->
						<button
							class="!hidden md:!inline-flex"
							app-button
							appearance="fab"
							color="white"
							size="large"
							(click)="setActiveEvent.emit('previous')">
							<app-icon-chevron class="text-primary-400" direction="left" />
						</button>

						<!-- Event card -->
						<app-event-card
							class="!rounded-none md:!rounded-lg"
							[event]="activeEvent"
							(closed)="setActiveEvent.emit(null)" />

						<!-- Desktop next button -->
						<button
							class="!hidden md:!inline-flex"
							app-button
							appearance="fab"
							color="white"
							size="large"
							(click)="setActiveEvent.emit('next')">
							<app-icon-chevron class="text-primary-400" direction="right" />
						</button>

						<!-- Mobile navigation -->
						<nav class="flex w-full md:hidden h-18">
							<button
								class="flex-1 hover:!bg-primary-50"
								app-button
								appearance="fab"
								color="white"
								rounded="false"
								(click)="setActiveEvent.emit('previous')">
								<app-icon-chevron class="text-primary-800" direction="left" />
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
								<app-icon-chevron class="text-primary-800" direction="right" />
							</button>
						</nav>
					</div>
				</ng-template>
			</p-dialog>
		}
	`,
	imports: [ChevronIcon, Dialog, ButtonComponent, EventCardComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDialog {
	readonly event = input.required<CvEvent | null>();
	readonly setActiveEvent = output<'previous' | 'next' | null>();

	// Component must be initialized in the browser only
	protected readonly isBrowser = signal(false);

	constructor(@Inject(PLATFORM_ID) platformId: object) {
		this.isBrowser.set(isPlatformBrowser(platformId));
	}
}
