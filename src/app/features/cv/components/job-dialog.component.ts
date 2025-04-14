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
import type { Job } from '../types';
import { JobCard } from './job-card.component';

@Component({
	selector: 'app-job-dialog',
	template: `
		@if (isBrowser() && job(); as activeJob) {
			<p-dialog class="sm:max-w-[90%]" modal [visible]="!!activeJob">
				<ng-template #headless>
					<div class="flex flex-wrap sm:flex-nowrap gap-2 items-center">
						<button
							class="!hidden sm:!inline-flex"
							app-button
							appearance="fab"
							color="white"
							(click)="setActiveJob.emit('previous')">
							<app-icon-chevron direction="left" />
						</button>
						<app-job-card class="flex-1 shrink-0" [job]="activeJob">
							<button
								class="ml-auto mr-1"
								app-button
								appearance="icon"
								close-button
								(click)="setActiveJob.emit(null)">
								<app-icon-close />
							</button>
						</app-job-card>
						<nav
							class="flex gap-4 w-full sm:w-auto justify-center items-center">
							<button
								class="!inline-flex sm:!hidden"
								app-button
								appearance="fab"
								color="white"
								(click)="setActiveJob.emit('previous')">
								<app-icon-chevron class="text-primary-700" direction="left" />
							</button>
							<button
								app-button
								appearance="fab"
								color="white"
								(click)="setActiveJob.emit('next')">
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
export class JobDialog {
	readonly job = input.required<Job | null>();
	readonly setActiveJob = output<'previous' | 'next' | null>();

	protected readonly isBrowser = signal(false);

	constructor(@Inject(PLATFORM_ID) platformId: object) {
		this.isBrowser.set(isPlatformBrowser(platformId));
	}
}
