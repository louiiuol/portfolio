import {
	ChangeDetectionStrategy,
	Component,
	effect,
	inject,
	input,
} from '@angular/core';

import { ContentfullModule } from '@feat/cv/modules/contentfull/contentfull.module';
import { LoaderComponent } from '@shared/components';
import { CvTimelineComponent, EventDialog } from '../components';
import { CvService } from '../services/cv.service';

@Component({
	selector: 'app-cv-page',
	host: { class: 'page' },
	template: `
		<div
			class="bg-white p-2 sm:p-4 rounded-lg shadow-lg min-h-full flex flex-col gap-4 max-w-[1024px] w-full mx-auto">
			<header class="flex gap-4 justify-between items-center">
				<h1 class="text-2xl font-semibold text-primary-700">
					Curriculum Vitae
				</h1>
				<!-- <button app-button appearance="icon-stroked">
					<app-icon-download class="size-[1rem] sm:size-[2rem] text-2xl" />
				</button> -->
			</header>

			<!-- Content -->
			<section
				class="flex flex-col items-center justify-start gap-4 w-full h-full overflow-y-auto flex-1 relative inset-shadow-sm  bg-gray-50 rounded-lg p-2 sm:p-4">
				@if (cvService.sortedEvents().loading) {
					<app-loader message="chargement des informations du CV" />
				} @else if (cvService.sortedEvents().error) {
					<p
						class="text-gray-700 italic max-w-prose text-pretty text-center mt-6 mx-auto">
						Impossible de récupérer les informations du CV. Merci de réessayer
						plus tard... 🙏
					</p>
				} @else {
					<app-cv-timeline
						[events]="cvService.sortedEvents().data"
						(setActiveEvent)="cvService.setActiveEvent($event)" />
				}
			</section>
		</div>
		<!-- Job Modal -->
		<app-event-dialog
			[event]="cvService.activeEvent()"
			(setActiveEvent)="switchActiveEvent($event)" />
	`,
	imports: [
		ContentfullModule,
		LoaderComponent,
		CvTimelineComponent,
		EventDialog,
	],
	providers: [CvService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvPage {
	// I/O
	readonly eventId = input<string>();

	protected readonly cvService = inject(CvService);

	// Sync active job with the URL query params
	private readonly syncJobId = effect(() =>
		this.cvService.setActiveEvent(this.eventId())
	);

	protected switchActiveEvent(target: 'previous' | 'next' | null): void {
		if (target === 'previous' || target === 'next') {
			this.cvService.slideEvent(target);
		} else {
			this.cvService.setActiveEvent(target);
		}
	}
}
