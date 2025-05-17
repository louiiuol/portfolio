import { isPlatformBrowser } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	PLATFORM_ID,
	signal,
} from '@angular/core';
import { ButtonComponent, ChevronIcon } from '@shared/components';
import type { nullish } from '@shared/types';
import { Dialog } from 'primeng/dialog';
import { CvService } from '../../services/cv.service';
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
							aria-label="Événement précédent"
							(click)="cvService.switchActiveEvent('previous')">
							<app-icon-chevron class="text-primary-400" direction="left" />
						</button>

						<!-- Event card -->
						<app-event-card
							class="!rounded-none md:!rounded-lg"
							[event]="activeEvent"
							(closed)="cvService.switchActiveEvent(null)" />

						<!-- Desktop next button -->
						<button
							class="!hidden md:!inline-flex"
							app-button
							appearance="fab"
							color="white"
							size="large"
							aria-label="Événement suivant"
							(click)="cvService.switchActiveEvent('next')">
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
								(click)="cvService.switchActiveEvent('previous')">
								<app-icon-chevron class="text-primary-800" direction="left" />
								Précédent
							</button>
							<button
								class="flex-1 hover:!bg-primary-50"
								app-button
								appearance="fab"
								color="white"
								rounded="false"
								(click)="cvService.switchActiveEvent('next')">
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
	readonly event = input.required<CvEvent | nullish>();

	// Component must be initialized in the browser only
	protected readonly isBrowser = signal(isPlatformBrowser(inject(PLATFORM_ID)));

	protected readonly cvService = inject(CvService);
}
